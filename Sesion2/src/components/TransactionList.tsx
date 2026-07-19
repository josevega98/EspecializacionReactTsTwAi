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
    <div className="transaction-list">
      <h3>Movimientos Recientes</h3>

      {transactions.length === 0 ? (
        <p className="no-transactions">No hay movimientos</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`transaction ${transaction.type}`}
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
    </div>
  );
}

export default TransactionList;
export type { Transaction };
