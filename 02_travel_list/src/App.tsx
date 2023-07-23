import { useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { Item } from "./data";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (item: Item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (id: Item["id"]) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList onDeleteItem={handleDeleteItem} items={items} />
      <Stats />
    </div>
  );
}

export default App;
