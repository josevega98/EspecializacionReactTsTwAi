// Componente de formulario para transferir dinero
// Props: onTransfer (función) - callback cuando se realiza una transferencia
// Props: maxAmount (número) - monto máximo disponible para transferir

import { useState } from "react";

interface TransferFormProps {
  onTransfer: (amount: number) => void;
  maxAmount: number;
}

function TransferForm({ onTransfer, maxAmount }: TransferFormProps) {
  // Estado local para el monto a transferir
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Manejar el cambio en el input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permitir números y punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError("");
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    // Validaciones
    if (!amount || numericAmount <= 0) {
      setError("Ingresa un monto válido");
      return;
    }

    if (numericAmount > maxAmount) {
      setError("Saldo insuficiente");
      return;
    }

    // Ejecutar la transferencia
    onTransfer(numericAmount);
    setAmount("");
    setError("");
  };

  return (
    <form className="transfer-form" onSubmit={handleSubmit}>
      <h3>Transferir Dinero</h3>

      <div className="input-group">
        <label htmlFor="amount">Monto a transferir</label>
        <div className="input-wrapper">
          <span className="currency-symbol">$</span>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            autoComplete="off"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <button type="submit" className="transfer-button">
        Transferir
      </button>
    </form>
  );
}

export default TransferForm;
