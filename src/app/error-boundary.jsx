import { Component } from 'react';
import { DefaultErrorFallback } from './fallbacks';

function areResetKeysEqual(previousResetKeys, nextResetKeys) {
  if (previousResetKeys === nextResetKeys) return true;
  if (!Array.isArray(previousResetKeys) || !Array.isArray(nextResetKeys)) {
    return false;
  }
  if (previousResetKeys.length !== nextResetKeys.length) return false;
  return previousResetKeys.every((previousKey, keyIndex) =>
    Object.is(previousKey, nextResetKeys[keyIndex]),
  );
}

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  componentDidUpdate(previousProps) {
    const hasError = this.state.error !== null;
    if (!hasError) return;

    const resetKeysChanged = !areResetKeysEqual(
      previousProps.resetKeys,
      this.props.resetKeys,
    );
    if (resetKeysChanged) {
      this.setState({ error: null });
    }
  }

  handleReset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    const { error } = this.state;
    if (error) {
      const FallbackComponent = this.props.fallback ?? DefaultErrorFallback;
      return <FallbackComponent error={error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}
