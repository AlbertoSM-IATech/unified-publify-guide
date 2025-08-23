import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      eventId: `error-${Date.now()}`,
    });

    // Llamar callback personalizado si existe
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log estructurado para debugging
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.group('🚨 Error Boundary Report');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.table(errorReport);
    console.groupEnd();
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset si los props clave han cambiado
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys![index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    // Reset si cualquier prop ha cambiado
    if (hasError && resetOnPropsChange && prevProps !== this.props) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        eventId: null,
      });
    }, 100);
  };

  handleRetry = () => {
    this.resetErrorBoundary();
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  render() {
    if (this.state.hasError) {
      // Usar fallback personalizado si se proporciona
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback por defecto
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">¡Algo salió mal!</CardTitle>
              <CardDescription className="text-base">
                Ha ocurrido un error inesperado en la aplicación.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Detalles del error:
                </p>
                <p className="text-sm font-mono text-foreground break-words">
                  {this.state.error?.message || 'Error desconocido'}
                </p>
                {this.state.eventId && (
                  <p className="text-xs text-muted-foreground mt-2">
                    ID: {this.state.eventId}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.resetErrorBoundary}
                  variant="default"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reintentar
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ir al inicio
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground">
                    Información técnica (desarrollo)
                  </summary>
                  <div className="mt-2 p-3 bg-muted rounded text-xs font-mono whitespace-pre-wrap overflow-auto max-h-48">
                    {this.state.error?.stack}
                    {'\n\nComponent Stack:'}
                    {this.state.errorInfo.componentStack}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar con componentes funcionales
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

// Componente wrapper simplificado
interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({ 
  children, 
  fallback, 
  onError 
}) => (
  <ErrorBoundary fallback={fallback} onError={onError}>
    {children}
  </ErrorBoundary>
);