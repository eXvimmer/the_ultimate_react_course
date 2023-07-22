import { Item as ItemType } from "../../data";
import Item from "../Item";

interface PackingListProps {
  items: ItemType[];
}

const PackingList: React.FC<PackingListProps> = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default PackingList;
