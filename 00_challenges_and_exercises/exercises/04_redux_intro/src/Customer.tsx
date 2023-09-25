import { useRootSelector } from "./hooks/useTypedSelector";

function Customer() {
  // NOTE: using useRootSelector instead of useSelector helps typescript to get
  // types
  const fullName = useRootSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {fullName || "stranger"}</h2>;
}

export default Customer;
