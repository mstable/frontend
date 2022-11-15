/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { Bytes, ethereum } from '@graphprotocol/graph-ts';

import { metavault } from '../generated/metavault/metavault';
import { Deposit, Withdraw } from '../generated/metavault/metavault';
import {
  DailyVaultBalance,
  DailyVaultStat,
  Transaction,
  Vault,
  VaultBalance,
} from '../generated/schema';

function calculateApy(
  prevVault: DailyVaultStat | null,
  assetPerShare: BigDecimal,
  timestamp: BigInt,
): BigDecimal {
  if (prevVault === null) {
    return BigDecimal.fromString('0');
  }
  return assetPerShare
    .minus(prevVault.assetPerShare)
    .div(prevVault.assetPerShare)
    .times(BigDecimal.fromString('31536000'))
    .div(timestamp.minus(prevVault.timestamp).toBigDecimal());
}

function updateOrCreateVault(address: Address, timestamp: BigInt): Vault {
  let vaultContract = metavault.bind(address);
  let vault = Vault.load(address.toHex());
  let days = timestamp.div(BigInt.fromString('86400'));
  if (vault === null) {
    vault = new Vault(address.toHex());
  }
  vault.address = address;
  vault.timestamp = timestamp;
  vault.asset = vaultContract.asset();
  vault.totalAssets = vaultContract.totalAssets();
  vault.totalSupply = vaultContract.totalSupply();
  vault.assetPerShare = vaultContract
    .convertToAssets(BigInt.fromString('1000000000000000000'))
    .divDecimal(BigInt.fromString('1000000000000000000').toBigDecimal());
  let prevVaultStat = DailyVaultStat.load(
    vault.id + '-' + days.minus(BigInt.fromString('7')).toString(),
  );
  vault.apy = calculateApy(prevVaultStat, vault.assetPerShare, timestamp);
  vault.save();
  return vault;
}

function updateOrCreateDailyStat(
  address: Address,
  timestamp: BigInt,
  forceUpdate: boolean = false,
): DailyVaultStat {
  let vaultContract = metavault.bind(address);
  let vault = Vault.load(address.toHex());
  let days = timestamp.div(BigInt.fromString('86400'));
  let dailyVaultStatId = address.toHex() + '-' + days.toString();
  let dailyVaultStat = DailyVaultStat.load(dailyVaultStatId);
  if (forceUpdate || dailyVaultStat === null) {
    dailyVaultStat = new DailyVaultStat(dailyVaultStatId);
    let prevVaultStat = DailyVaultStat.load(
      address.toHex() + '-' + days.minus(BigInt.fromString('7')).toString(),
    );
    dailyVaultStat.vault = address.toHex();
    dailyVaultStat.timestamp = timestamp;

    let totalAssets = vaultContract.try_totalAssets();

    if (totalAssets.reverted) {
      dailyVaultStat.totalAssets = BigInt.zero();
    } else {
      dailyVaultStat.totalAssets = totalAssets.value;
    }

    let totalSupply = vaultContract.try_totalSupply();

    if (totalSupply.reverted) {
      dailyVaultStat.totalSupply = BigInt.zero();
    } else {
      dailyVaultStat.totalSupply = totalSupply.value;
    }

    let assetPerShare = vaultContract.try_convertToAssets(
      BigInt.fromString('1000000000000000000'),
    );
    if (assetPerShare.reverted) {
      dailyVaultStat.assetPerShare = BigDecimal.fromString('1');
    } else {
      dailyVaultStat.assetPerShare = assetPerShare.value.divDecimal(
        BigInt.fromString('1000000000000000000').toBigDecimal(),
      );
    }

    dailyVaultStat.apy = calculateApy(
      prevVaultStat,
      dailyVaultStat.assetPerShare,
      timestamp,
    );
    dailyVaultStat.save();

    if (vault) {
      vault.assetPerShare = dailyVaultStat.assetPerShare;
      vault.apy = dailyVaultStat.apy;
      vault.totalAssets = dailyVaultStat.totalAssets;
      vault.totalSupply = dailyVaultStat.totalSupply;
      vault.timestamp = dailyVaultStat.timestamp;
      vault.save();
    }
  }
  return dailyVaultStat;
}

function updateOrCreateVaultBalance(
  address: Address,
  owner: Address,
  timestamp: BigInt,
  assetsDeposited: BigInt,
): VaultBalance {
  let vaultContract = metavault.bind(address);
  let vaultBalanceId = address.toHex() + '-' + owner.toHex();
  let vaultBalance = VaultBalance.load(vaultBalanceId);
  if (vaultBalance === null) {
    vaultBalance = new VaultBalance(vaultBalanceId);
    vaultBalance.assetDeposited = BigInt.fromString('0');
  }
  vaultBalance.owner = owner;
  vaultBalance.vault = address.toHex();
  vaultBalance.timestamp = timestamp;
  vaultBalance.shareBalance = vaultContract.balanceOf(owner);
  vaultBalance.assetBalance = vaultContract.convertToAssets(
    vaultBalance.shareBalance,
  );
  vaultBalance.assetDeposited =
    vaultBalance.assetDeposited.plus(assetsDeposited);
  if (vaultBalance.assetDeposited.lt(BigInt.fromString('0'))) {
    vaultBalance.assetDeposited = BigInt.fromString('0');
  }
  vaultBalance.save();
  // Update daily vault balance
  let days = timestamp.div(BigInt.fromString('86400')).toString();
  let dailyVaultBalanceId = vaultBalanceId + '-' + days;
  let dailyVaultBalance = DailyVaultBalance.load(dailyVaultBalanceId);
  if (dailyVaultBalance === null) {
    dailyVaultBalance = new DailyVaultBalance(dailyVaultBalanceId);
  }
  dailyVaultBalance.vaultBalance = vaultBalanceId;
  dailyVaultBalance.timestamp = timestamp;
  dailyVaultBalance.shareBalance = vaultBalance.shareBalance;
  dailyVaultBalance.assetBalance = vaultBalance.assetBalance;
  dailyVaultBalance.assetDeposited = vaultBalance.assetDeposited;
  dailyVaultBalance.save();
  return vaultBalance;
}

function createTransaction(
  vaultAddress: Address,
  hash: Bytes,
  timestamp: BigInt,
  type: string,
  to: Bytes,
  from: Bytes,
  shareAmount: BigInt,
  assetAmount: BigInt,
  gasLimit: BigInt,
  gasPrice: BigInt,
): Transaction {
  let transaction = new Transaction(hash.toHex());
  transaction.vault = vaultAddress.toHex();
  transaction.timestamp = timestamp;
  transaction.type = type;
  transaction.shareAmount = shareAmount;
  transaction.assetAmount = assetAmount;
  transaction.hash = hash;
  transaction.to = to;
  transaction.from = from;
  transaction.gasLimit = gasLimit;
  transaction.gasPrice = gasPrice;
  transaction.save();
  return transaction;
}

export function handleDeposit(event: Deposit): void {
  updateOrCreateVault(event.address, event.block.timestamp);
  updateOrCreateVaultBalance(
    event.address,
    event.params.receiver,
    event.block.timestamp,
    event.params.assets,
  );
  createTransaction(
    event.address,
    event.transaction.hash,
    event.block.timestamp,
    'DEPOSIT',
    event.params.receiver,
    event.params.sender,
    event.params.shares,
    event.params.assets,
    event.transaction.gasLimit,
    event.transaction.gasPrice,
  );
  updateOrCreateDailyStat(event.address, event.block.timestamp, true);
}

export function handleWithdraw(event: Withdraw): void {
  updateOrCreateVault(event.address, event.block.timestamp);
  updateOrCreateVaultBalance(
    event.address,
    event.params.owner,
    event.block.timestamp,
    event.params.assets.times(BigInt.fromString('-1')),
  );
  createTransaction(
    event.address,
    event.transaction.hash,
    event.block.timestamp,
    'WITHDRAW',
    event.params.receiver,
    event.params.owner,
    event.params.shares,
    event.params.assets,
    event.transaction.gasLimit,
    event.transaction.gasPrice,
  );
  updateOrCreateDailyStat(event.address, event.block.timestamp, true);
}

export function handleBlock(block: ethereum.Block): void {
  // {{#metavaults}}
  updateOrCreateDailyStat(Address.fromString('{{address}}'), block.timestamp);
  // {{/metavaults}}
}
