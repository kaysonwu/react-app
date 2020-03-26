import React, { Component } from 'react';

interface ErrorBoundaryProps {
  fallback: () => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * @see https://reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
