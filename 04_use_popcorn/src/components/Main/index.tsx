import { iMovie } from "../../types";
import ListBox from "../ListBox";
import WatchedBox from "../WatchedBox";

interface MainProps {
  movies: iMovie[];
}

function Main({ movies }: MainProps) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}

export default Main;
