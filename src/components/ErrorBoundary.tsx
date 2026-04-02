import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background text-foreground">
          <h1 className="text-2xl font-display font-bold">
            Algo deu errado. Tente recarregar a página.
          </h1>
          <Button onClick={() => window.location.reload()} variant="default">
            Recarregar
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
