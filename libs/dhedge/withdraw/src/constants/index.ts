import { arbitrum, mainnet } from 'wagmi/chains';

import type { Address } from 'wagmi';

export * from './tokens';
export * from './contracts';

export const deprecatedL1Vaults: Address[] = [
  '0x992ed71cad18d16608a14f52a1fb5b6a44bf821c',
  '0x907feb27f8cc5b003db7e62dfc2f9b01ce3fadd6',
  '0x391603b1c3b03a0133ad82e91692790e58f73570',
  '0x3a4851597f36f459b58e65c55c8f3a8710313fc7',
  '0x63ae7457b8be660daaf308a07db6bccb733b92df',
  '0x739f41c699276c9b6182aecb9d5f4eca226da8dd',
  '0x0f4c00139602ab502bc7c1c0e71d6cb72a9fb0e7',
  '0xd076b9865feb49a43aa38c06b0432df6b6cbca9e',
  '0x0f0f7f24ce3a52b9508b9fbce1a6bdb2ebb0d7ed',
  '0x0ac1dba8252240589266194f9c27a42229e84b19',
  '0xef38d0a69f3d9f08ace8f7282ef613a63bd335b0',
  '0x2c095f9a475b47d4a60a4102b224441796dbf1c1',
  '0x1e73b23f0af6b13d5a925ce0e8583e20bebc7d8c',
  '0x55010610d9b4a8559bd7b2c5ae34c329e4b45872',
  '0xc44b4a52f46d76fbe7dac089bd569ae38727d3da',
  '0xdc1b88aae802c83c3fa234c27063d864ac9b51d2',
  '0xc19fb5d68a9383a737d5c31daa13ea9bf5a0c2e1',
  '0xb7ac66a870189f259e5450c63f5e688398e0988e',
  '0xa48dbeabe541ec17d3f6f30ff0de96d5113dce03',
  '0x555d9af5c0c3c8ed5c44e343d2f8292679ab9645',
  '0x00d993f573fd8a60368376b637e4c5698e4907db',
  '0x46c1677ea454827abdce338310451ce2cfcc6676',
  '0x159b4e1f90afca5351661202ebbd82540c0da3cc',
  '0x9c716f8b535cbb92eaf12ddccf7e72cbb02d2639',
  '0x72cf5406fad1dbc807559c62e277644543d70e66',
  '0xaf44f17a175ab0874232a54375338947689bad2e',
  '0xb16cc63c3c908a73f937e935032d556a40a08134',
  '0x9b5518a3b55a4e922064873aa2e9ad1270c8ea77',
  '0x906549750d6c362f220d6fed8de16f0a71448132',
  '0x80ac7407a6fd9a4f693499797f99f553a72adb2e',
  '0x1fdc5fd5b27b3091eeb9fb7d54b970f3229f440b',
  '0x340e05bfbd985bb6d6ee490bf41fb7bfc54a2468',
];

export const redeemFromL1Length = 164;
export const redeemGasLimit = 1000000;
export const l1Chain = mainnet;
export const l2Chain = arbitrum;
