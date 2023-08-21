import * as React from "react";

export class ErrorBoundary<
  Props extends {
    fallback: React.ReactNode;
    children: React.ReactNode;
  }
> extends React.Component<Props> {
  state = { hasError: false };

  constructor(props: Props) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
