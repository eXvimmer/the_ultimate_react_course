import { Link } from "react-router-dom";
import { useRootSelector } from "../../hooks/useRootSelector";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const quantity = useRootSelector(getTotalCartQuantity);
  const totalPrice = useRootSelector(getTotalCartPrice);

  if (!quantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {quantity} pizza{quantity === 1 ? "" : "s"}
        </span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
