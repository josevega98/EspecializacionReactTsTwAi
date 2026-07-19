// Componente que muestra el saldo disponible
// Props: balance (número) - el saldo actual del usuario

interface BalanceCardProps {
  balance: number;
}

function BalanceCard({ balance }: BalanceCardProps) {
  // Formatear el saldo como moneda
  const formattedBalance = balance.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return (
    <div className="balance-card">
      <p className="balance-label">Saldo Disponible</p>
      <h2 className="balance-amount">{formattedBalance}</h2>
      <p className="account-number">**** **** **** 4532</p>
    </div>
  );
}

export default BalanceCard;
