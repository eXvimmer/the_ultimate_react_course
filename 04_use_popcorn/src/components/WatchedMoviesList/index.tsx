import { iWatchedMovie } from "../../types";
import WatchedMovie from "../WatchedMovie";

interface WatchedListProps {
  watched: iWatchedMovie[];
  onRemoveWatched(id: string): void;
  onMovieSelect(id: string): void;
}

function WatchedMoviesList({
  watched,
  onRemoveWatched,
  onMovieSelect,
}: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatched={onRemoveWatched}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
