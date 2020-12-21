import { Component, ReactElement } from "react";
import ErrorMessage from "./ErrorMessage";

type ErrorBoundaryProps = {
  children: ReactElement;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render(): ReactElement {
    if (this.state.hasError) {
      return <ErrorMessage>Oops, something went wrong.</ErrorMessage>;
    }
    return this.props.children;
  }
}
