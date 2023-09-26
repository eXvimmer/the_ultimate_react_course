import { useRootSelector } from "./hooks/useTypedSelector";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balance = useRootSelector((store) => store.account.balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
