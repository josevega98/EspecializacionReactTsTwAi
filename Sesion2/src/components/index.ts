// Exportamos todos los componentes desde un solo archivo (barrel export)
// Esto facilita las importaciones en otros archivos

export { default as Header } from "./Header";
export { default as BalanceCard } from "./BalanceCard";
export { default as TransferForm } from "./TransferForm";
export { default as TransactionList } from "./TransactionList";
export type { Transaction } from "./TransactionList";
