import type { AlertColor } from '@mui/material';
import type { ReactNode } from 'react';

export type Notification = {
  id: string;
  severity: AlertColor;
  title: string;
  message?: string;
  content?: ReactNode;
  createdOn: number;
  read: boolean;
  visible: boolean;
  hideDuration: number | null;
};
