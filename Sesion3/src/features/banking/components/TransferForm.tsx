import { useState } from "react";

interface TransferFormProps {
  onTransfer: (amount: number) => void;
  maxAmount: number;
}

function TransferForm({ onTransfer, maxAmount }: TransferFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    if (!amount || numericAmount <= 0) {
      setError("Ingresa un monto valido");
      return;
    }

    if (numericAmount > maxAmount) {
      setError("Saldo insuficiente");
      return;
    }

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
