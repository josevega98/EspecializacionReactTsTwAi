import { useState } from "react";

function DarkComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const cards = ["Tarjeta 1", "Tarjeta 2", "Tarjeta 3", "Tarjeta 4"];

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white ">
        <div className="mx-auto max-w-5xl p-8">
          <h1 className="mb-4 text-3xl font-bold">
            Dark Mode con Tailwind CSS
          </h1>

          <p className="mb-6">
            Presiona el botón para cambiar entre modo claro y oscuro.
          </p>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((title) => (
              <div
                key={title}
                className="rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Este componente cambia automáticamente sus colores usando las
                  clases <code>dark:</code>.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DarkComponent;
