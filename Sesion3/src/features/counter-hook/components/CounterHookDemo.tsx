import { useState } from "react";

function useContador(valorInicial = 0) {
  const [cuenta, setCuenta] = useState(valorInicial);

  const sumar = () => setCuenta((prev) => prev + 1);
  const restar = () => setCuenta((prev) => prev - 1);
  const reiniciar = () => setCuenta(valorInicial);

  return { cuenta, sumar, restar, reiniciar };
}

type TarjetaProps = {
  titulo: string;
  inicio: number;
};

function Tarjeta({ titulo, inicio }: TarjetaProps) {
  const { cuenta, sumar, restar, reiniciar } = useContador(inicio);

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{titulo}</p>
      <p className="mt-3 text-4xl font-bold text-slate-900">{cuenta}</p>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={restar}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          -1
        </button>
        <button
          type="button"
          onClick={sumar}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          +1
        </button>
      </div>

      <button
        type="button"
        onClick={reiniciar}
        className="mt-4 text-sm font-medium text-slate-600 underline-offset-4 hover:underline"
      >
        Reiniciar
      </button>
    </article>
  );
}

export default function CounterHookDemo() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        useContador
      </span>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        Un hook, dos contadores
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        Las dos tarjetas usan el mismo <code>useContador</code>, pero cada una
        guarda su propio numero. El hook comparte la receta, no los datos.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Tarjeta titulo="Contador A" inicio={0} />
        <Tarjeta titulo="Contador B" inicio={10} />
      </div>
    </section>
  );
}
