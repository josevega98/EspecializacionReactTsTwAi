import { Component, type ErrorInfo, type ReactNode, useState } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  onReset: () => void;
};

type ErrorBoundaryState = {
  hayError: boolean;
  mensaje: string;
};

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

function Componente() {
  const [explota, setExplota] = useState(false);

  if (explota) {
    throw new Error("El componente Perfil fallo al renderizar");
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <p className="text-sm font-medium text-emerald-800">
        Componente funcionando bien
      </p>
      <button
        type="button"
        onClick={() => setExplota(true)}
        className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white"
      >
        Romper este componente
      </button>
    </div>
  );
}

export default function ErrorBoundaryDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        Error Boundary
      </span>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        Que un error no tumbe toda la app
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        Rompe el componente de abajo. En vez de dejar la pantalla en blanco, el
        Error Boundary atrapa el fallo y muestra un plan B.
      </p>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <ErrorBoundary
          key={resetKey}
          onReset={() => setResetKey((prev) => prev + 1)}
        >
          <Componente />
        </ErrorBoundary>
      </div>
    </section>
  );
}
