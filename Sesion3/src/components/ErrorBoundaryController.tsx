class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hayError: false, mensaje: "" };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hayError: true, mensaje: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Error capturado:", error.message, info);
  }

  render() {
    if (this.state.hayError) {
      return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-lg font-semibold text-amber-900">Algo salio mal</p>
          <p className="mt-2 text-sm text-amber-800">{this.state.mensaje}</p>
          <button
            type="button"
            onClick={this.props.onReset}
            className="mt-4 rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
