import { createContext, useContext, useState } from "react";

type TemaContextValue = {
  oscuro: boolean;
  toggle: () => void;
};

const TemaContext = createContext<TemaContextValue | null>(null);

type TemaProviderProps = {
  children: React.ReactNode;
};

function TemaProvider({ children }: TemaProviderProps) {
  const [oscuro, setOscuro] = useState(false);
  const toggle = () => setOscuro((prev) => !prev);

  return (
    <TemaContext.Provider value={{ oscuro, toggle }}>
      {children}
    </TemaContext.Provider>
  );
}

function useTema() {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error("useTema debe usarse dentro de TemaProvider");
  }

  return context;
}

function BotonTema() {
  const { oscuro, toggle } = useTema();

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        oscuro
          ? "rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
          : "rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
      }
    >
      {oscuro ? "Modo oscuro" : "Modo claro"}
    </button>
  );
}

function Nivel2() {
  return (
    <div className="rounded-2xl border border-sky-200 bg-white/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
        Nivel 2
      </p>
      <p className="mt-1 text-sm text-slate-500">No pasa props.</p>
      <div className="mt-4">
        <BotonTema />
      </div>
    </div>
  );
}

function Nivel1() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
        Nivel 1
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Tampoco recibe ni reenvia props.
      </p>
      <div className="mt-4">
        <Nivel2 />
      </div>
    </div>
  );
}

function Pantalla() {
  const { oscuro } = useTema();

  return (
    <section
      className={
        oscuro
          ? "rounded-3xl bg-slate-900 p-8 text-white shadow-sm"
          : "rounded-3xl bg-slate-50 p-8 text-slate-900 shadow-sm ring-1 ring-slate-200"
      }
    >
      <span
        className={
          oscuro
            ? "text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"
            : "text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
        }
      >
        Context API
      </span>
      <h2 className="mt-2 text-2xl font-bold">Un dato que baja solo</h2>
      <p
        className={
          oscuro
            ? "mt-3 max-w-2xl text-slate-300"
            : "mt-3 max-w-2xl text-slate-600"
        }
      >
        El boton esta varios niveles abajo, pero lee el tema directo del
        provider. Ninguna capa intermedia tiene que pasar props.
      </p>

      <div
        className={
          oscuro
            ? "mt-6 rounded-2xl border border-slate-700 bg-slate-800/60 p-4"
            : "mt-6 rounded-2xl border border-slate-200 bg-white p-4"
        }
      >
        <p
          className={
            oscuro
              ? "text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
              : "text-xs font-semibold uppercase tracking-[0.18em] text-slate-600"
          }
        >
          App
        </p>
        <p
          className={
            oscuro
              ? "mt-1 text-sm text-slate-400"
              : "mt-1 text-sm text-slate-500"
          }
        >
          Aqui se coloca el provider.
        </p>

        <div className="mt-4">
          <Nivel1 />
        </div>
      </div>
    </section>
  );
}

export default function ContextThemeDemo() {
  return (
    <TemaProvider>
      <Pantalla />
    </TemaProvider>
  );
}
