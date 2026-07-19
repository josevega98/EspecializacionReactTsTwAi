import { useState } from "react";
import {
  Header,
  BalanceCard,
  TransferForm,
  TransactionList,
  type Transaction,
} from "./components";
import "./App.css";

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

function App() {
  const [balance, setBalance] = useState<number>(25000);

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const handleTransfer = (amount: number) => {
    setBalance((prevBalance) => prevBalance - amount);

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "expense",
      description: "Transferencia enviada",
      amount: amount,
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
      {/* Header con nombre del usuario */}
      <Header userName="Carlos" />

      {/* Contenedor principal */}
      <main className="main-content">
        {/* Tarjeta de saldo */}
        <BalanceCard balance={balance} />

        {/* Formulario de transferencia */}
        <TransferForm onTransfer={handleTransfer} maxAmount={balance} />

        {/* Lista de transacciones */}
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}

export default App;
