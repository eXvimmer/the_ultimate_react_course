import { useDispatch } from "react-redux";
import { iMenuItem } from "../../types";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getQuantityById } from "../cart/cartSlice";
import { MouseEventHandler } from "react";
import { useRootSelector } from "../../hooks/useRootSelector";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }: { pizza: iMenuItem }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const currentQuantity = useRootSelector(getQuantityById(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
