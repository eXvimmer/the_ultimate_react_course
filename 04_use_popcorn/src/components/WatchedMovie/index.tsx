import { iWatchedMovie } from "../../types";

interface WatchedMovieProps {
  movie: iWatchedMovie;
  onRemoveWatched(id: string): void;
  onMovieSelect(id: string): void;
}

function WatchedMovie({
  movie,
  onRemoveWatched,
  onMovieSelect,
}: WatchedMovieProps) {
  return (
    <li key={movie.imdbID} onClick={() => onMovieSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onRemoveWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
