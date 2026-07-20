// Componente que muestra el historial de movimientos
// Props: transactions (array) - lista de transacciones recientes

interface Transaction {
  id: number;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

function TransactionList({ transactions }: TransactionListProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <h3 className="text-xl font-bold text-slate-900">
        Movimientos recientes
      </h3>

      {transactions.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No hay movimientos recientes
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex items-center justify-between rounded-lg bg-slate-100 p-4 shadow-sm"
            >
              <div className="transaction-info">
                <span className="transaction-description">
                  {transaction.description}
                </span>
                <span className="transaction-date">{transaction.date}</span>
              </div>
              <span className="transaction-amount">
                {transaction.type === "expense" ? "-" : "+"}$
                {transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TransactionList;
export type { Transaction };
