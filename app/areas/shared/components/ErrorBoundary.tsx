"use client"
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
            this.props.fallback ?? (
            <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 border border-red-200 text-red-800 rounded-lg shadow-md">
                <FontAwesomeIcon icon={faExclamationTriangle} size='3x' />
                <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                <p className="text-sm text-red-700 text-center">
                An unexpected error occurred.
                </p>
            </div>
            )
        );
    }


    return this.props.children;
  }
}

// Functional wrapper
const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
