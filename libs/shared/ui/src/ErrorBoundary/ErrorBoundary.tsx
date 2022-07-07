import { Component } from 'react';

import { Typography } from '@mui/material';

import type { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  ErrorPage?: ReactNode;
  onError?: (error: Error, errorInfo?: ErrorInfo) => void;
};

type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props?.ErrorPage ?? (
          // eslint-disable-next-line jsx-a11y/accessible-emoji
          <Typography component="span" role="img" aria-label="Oops">
            😓
          </Typography>
        )
      );
    }

    return this.props.children;
  }
}
