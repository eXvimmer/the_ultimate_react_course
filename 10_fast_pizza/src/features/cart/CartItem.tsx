import { iCartItem } from "../../types";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }: { item: iCartItem }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
