import { useRootSelector } from "../../hooks/useRootSelector";
import { iCartItem } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getQuantityById } from "./cartSlice";

function CartItem({
  item: { pizzaId, name, quantity, totalPrice },
}: {
  item: iCartItem;
}) {
  const currentQuantity = useRootSelector(getQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
