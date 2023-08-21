import { iWatchedMovie } from "../../types";
import WatchedMovie from "../WatchedMovie";

interface WatchedListProps {
  watched: iWatchedMovie[];
  onRemoveWatched(id: string): void;
}

function WatchedMoviesList({ watched, onRemoveWatched }: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
