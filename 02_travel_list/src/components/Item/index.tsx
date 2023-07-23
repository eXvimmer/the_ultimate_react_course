import { Item as ItemType } from "../../data";

interface ItemProps {
  item: ItemType;
  onDeleteItem(id: ItemType["id"]): void;
}

function Item({
  item: { packed, quantity, description, id },
  onDeleteItem,
}: ItemProps): React.ReactElement {
  return (
    <li>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

export default Item;
