import { createFlagsContainer } from '@frontend/shared-utils';

import type { ContractType } from '@frontend/lts-constants';

export type Flag = ContractType;

export const {
  FlagsProvider,
  useFlags,
  useSetFlag,
  useClearFlag,
  useToggleFlag,
  useSetAllFlags,
} = createFlagsContainer<ContractType>({
  legacypool: false,
  metavault: false,
  pool: false,
  save: false,
  vault: false,
});
