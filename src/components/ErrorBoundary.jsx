import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
            <span className="text-red-400 text-xl">!</span>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Something went wrong</h3>
          <p className="text-[#8b929e] text-sm text-center max-w-sm mb-4">
            An error occurred while loading this section. Please try refreshing.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] text-sm font-bold rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
