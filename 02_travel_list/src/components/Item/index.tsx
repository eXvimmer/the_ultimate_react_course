import { Item as ItemType } from "../../data";

interface ItemProps {
  item: ItemType;
  onDeleteItem(id: ItemType["id"]): void;
  onToggleItem(id: ItemType["id"]): void;
}

function Item({
  item: { packed, quantity, description, id },
  onDeleteItem,
  onToggleItem,
}: ItemProps): React.ReactElement {
  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

export default Item;
