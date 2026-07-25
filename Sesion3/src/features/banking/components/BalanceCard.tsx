// Componente que muestra el saldo disponible
// Props: balance (numero) - el saldo actual del usuario

interface BalanceCardProps {
  balance: number;
}

function BalanceCard({ balance }: BalanceCardProps) {
  const formattedBalance = balance.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <div className="flex flex-col gap-6">
        <p className="text-sm font-medium text-slate-500">
          Saldo disponible: {formattedBalance}
        </p>
      </div>
    </section>
  );
}

export default BalanceCard;
