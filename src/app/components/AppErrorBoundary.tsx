import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Falha ao renderizar a aplicação:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
          <h1 className="text-xl font-bold text-foreground">Não foi possível carregar esta tela</h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Ocorreu um erro inesperado. Recarregue a aplicação para tentar novamente.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-md bg-[#5b2c83] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Recarregar aplicação
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}