import { Item as ItemType } from "../../data";
import Item from "../Item";

interface PackingListProps {
  items: ItemType[];
  onDeleteItem(id: ItemType["id"]): void;
}

const PackingList: React.FC<PackingListProps> = ({ items, onDeleteItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
};

export default PackingList;
