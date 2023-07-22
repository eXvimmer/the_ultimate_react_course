export interface Item {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const initialItems: Item[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
];

export default initialItems;
