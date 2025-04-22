
import { ErrorState } from "@/components/common/ErrorState";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class TransactionsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Transactions error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorState 
          title="Error en transacciones"
          message="Ha ocurrido un error al cargar las transacciones. Por favor, intenta recargar la página."
        />
      );
    }

    return this.props.children;
  }
}
