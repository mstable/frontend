import { createFlagsContainer } from '@frontend/shared-utils';

export type Flag = 'exactApproval';

export const {
  FlagsProvider: SettingsProvider,
  useFlags: useSettings,
  useToggleFlag: useToggleSettings,
} = createFlagsContainer<Flag>({ exactApproval: false });
