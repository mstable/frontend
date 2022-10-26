import { Component } from 'react';

import { ErrorCard } from '../Errors';

import type { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  ErrorComponent?: ReactNode;
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
      return this.props?.ErrorComponent ?? <ErrorCard />;
    }

    return this.props.children;
  }
}
