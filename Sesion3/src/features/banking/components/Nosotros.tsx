import { Link } from "react-router-dom";

function Nosotros() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">Nosotros</h2>
      <p className="mt-3 text-slate-600">
        Este componente existe para mostrar una ruta publica dentro de una SPA.
        React Router cambia de vista sin recargar toda la aplicacion.
      </p>
      <p className="mt-3 text-slate-600">
        En clase puedes usarlo para explicar la diferencia entre una ruta libre
        y una ruta protegida como la seccion de banca.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default Nosotros;
