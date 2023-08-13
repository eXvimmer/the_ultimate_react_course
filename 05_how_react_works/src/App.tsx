import Tabbed from "./components/Tabbed";
import { content } from "./data";

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}
