import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-6 text-white">
          <div className="max-w-xl w-full bg-navy-dark border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="font-serif text-2xl font-bold text-amber-300">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-neutral-300">
              An unexpected error occurred while loading this page:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-black/40 text-red-300 text-xs font-mono overflow-auto max-h-48 border border-red-500/20">
              {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack && (
                <div className="mt-2 text-neutral-400">
                  {this.state.errorInfo.componentStack}
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-gold !py-2.5 !px-6 text-xs font-semibold"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="btn-outline !py-2.5 !px-6 text-xs font-semibold"
              >
                Clear Cache & Restart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

