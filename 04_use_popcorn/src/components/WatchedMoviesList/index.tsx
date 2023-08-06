import { iWatchData } from "../../types";
import WatchedMovie from "../WatchedMovie";

interface WatchedListProps {
  watched: iWatchData[];
}

function WatchedMoviesList({ watched }: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
