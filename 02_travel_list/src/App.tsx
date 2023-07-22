import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import initialItems from "./data";

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList items={initialItems} />
      <Stats />
    </div>
  );
}

export default App;
