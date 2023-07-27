import { useState } from "react";
import { Item as ItemType } from "../../data";
import Item from "../Item";

interface PackingListProps {
  items: ItemType[];
  onDeleteItem(id: ItemType["id"]): void;
  onToggleItem(id: ItemType["id"]): void;
}

const PackingList: React.FC<PackingListProps> = ({
  items,
  onDeleteItem,
  onToggleItem,
}) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems: ItemType[];

  if (sortBy === "description") {
    // NOTE we use slice() because the sort method is a mutating method
    sortedItems = items.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  } else if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  } else {
    sortedItems = items; // NOTE "input" is default
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
};

export default PackingList;
