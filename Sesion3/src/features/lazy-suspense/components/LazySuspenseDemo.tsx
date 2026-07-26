import { lazy, Suspense, useState } from "react";

function Perfil() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
        DC
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-900">Diego Cardenas</p>
        <p className="text-sm text-slate-600">
          Componente cargado bajo demanda.
        </p>
      </div>
    </div>
  );
}

const PerfilLazy = lazy(
  () =>
    new Promise<{ default: typeof Perfil }>((resolve) => {
      setTimeout(() => resolve({ default: Perfil }), 5000);
    }),
);

function Cargando() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
      Cargando perfil...
    </div>
  );
}

export default function LazySuspenseDemo() {
  const [mostrar, setMostrar] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const cargar = () => {
    setMostrar(true);
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        lazy + Suspense
      </span>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        Cargar solo cuando hace falta
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        El perfil no existe hasta que lo pides. Al hacer clic, Suspense muestra
        un fallback mientras se descarga y luego lo reemplaza por el componente
        ya listo.
      </p>

      <button
        type="button"
        onClick={cargar}
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        {mostrar ? "Volver a cargar" : "Cargar perfil"}
      </button>

      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        {mostrar ? (
          <Suspense key={reloadKey} fallback={<Cargando />}>
            <PerfilLazy />
          </Suspense>
        ) : (
          <p className="text-sm text-slate-500">
            Aun no se ha descargado nada.
          </p>
        )}
      </div>
    </section>
  );
}
