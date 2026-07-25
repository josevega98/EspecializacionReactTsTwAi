import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BalanceCard from "./BalanceCard";
import Header from "./Header";
import Nosotros from "./Nosotros";
import ProtectedRoute from "./ProtectedRoute";
import TransactionList, { type Transaction } from "./TransactionList";
import TransferForm from "./TransferForm";
import "../../../App.css";

const initialTransactions: Transaction[] = [
  {
    id: 1,
    type: "income",
    description: "Depósito nómina",
    amount: 15000,
    date: "15 Jul",
  },
  {
    id: 2,
    type: "expense",
    description: "Netflix",
    amount: 199,
    date: "14 Jul",
  },
  {
    id: 3,
    type: "expense",
    description: "Uber",
    amount: 85.5,
    date: "13 Jul",
  },
];

type HomePageProps = {
  isAuthenticated: boolean;
  onLogin: () => void;
};

function HomePage({ isAuthenticated, onLogin }: HomePageProps) {
  const navigate = useNavigate();

  const handleAccessBank = () => {
    if (!isAuthenticated) {
      onLogin();
    }

    navigate("/banca");
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-3xl font-bold text-slate-900">Banco React</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Esta es una SPA simple con React Router. Desde aqui puedes navegar sin
        recargar la pagina y probar una ruta protegida.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAccessBank}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Ir a la banca protegida
        </button>
        <Link
          to="/nosotros"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Ver Nosotros
        </Link>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Estado de acceso: {isAuthenticated ? "autenticado" : "invitado"}
      </p>
    </section>
  );
}

type BankingPageProps = {
  onLogout: () => void;
};

function BankingPage({ onLogout }: BankingPageProps) {
  const [balance, setBalance] = useState<number>(25000);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const handleTransfer = (amount: number) => {
    setBalance((prevBalance) => prevBalance - amount);

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "expense",
      description: "Transferencia enviada",
      amount,
      date: new Date().toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
      }),
    };

    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
  };

  return (
    <div className="banking-app">
      <div className="mb-4 flex justify-between gap-3">
        <p className="text-sm text-slate-500">
          Ruta protegida visible solo si hay sesion activa.
        </p>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Cerrar sesion
        </button>
      </div>

      <Header userName="Carlos" />

      <main className="main-content">
        <BalanceCard balance={balance} />
        <TransferForm onTransfer={handleTransfer} maxAmount={balance} />
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}

export default function BankingApp() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <div
      className={
        isDarkMode
          ? "dark min-h-screen bg-slate-900"
          : "min-h-screen bg-slate-100"
      }
    >
      <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <nav className="flex flex-wrap gap-3 text-sm font-medium text-slate-700">
            <Link to="/">Inicio</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/banca">Banca</Link>
          </nav>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsAuthenticated((prevState) => !prevState)}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {isAuthenticated ? "Cerrar sesion" : "Iniciar sesion"}
            </button>
            <button
              type="button"
              onClick={() => setIsDarkMode((prevState) => !prevState)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-slate-200 dark:text-slate-900"
            >
              {isDarkMode ? "Modo claro" : "Modo oscuro"}
            </button>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isAuthenticated={isAuthenticated}
                onLogin={() => setIsAuthenticated(true)}
              />
            }
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route
            path="/banca"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BankingPage onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
