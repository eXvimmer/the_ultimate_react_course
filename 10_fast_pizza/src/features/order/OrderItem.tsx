import { iCartItem } from "../../types";
import { formatCurrency } from "../../utils/helpers";

function OrderItem({
  item /* , isLoadingIngredients, ingredients */,
}: {
  item: iCartItem;
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
