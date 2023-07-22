import { Item as ItemType } from "../../data";

interface ItemProps {
  item: ItemType;
}

function Item({
  item: { packed, quantity, description },
}: ItemProps): React.ReactElement {
  return (
    <li>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
}

export default Item;
