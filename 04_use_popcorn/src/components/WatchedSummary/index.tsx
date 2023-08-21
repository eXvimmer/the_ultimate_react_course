import { iWatchedMovie } from "../../types";
import { average } from "../../utils";

interface SummaryProps {
  watched: iWatchedMovie[];
}

function WatchedSummary({ watched }: SummaryProps) {
  const avgImdbRating = average(
    watched.map((movie) =>
      movie.imdbRating ? parseFloat(movie.imdbRating) : 0
    )
  );
  const avgUserRating = average(
    watched.map((movie) =>
      movie.userRating ? parseFloat(movie.userRating) : 0
    )
  );

  // NOTE: average runtime is kinda weird
  const avgRuntime = average(
    watched.map((movie) => (movie.Runtime ? parseFloat(movie.Runtime) : 0))
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
