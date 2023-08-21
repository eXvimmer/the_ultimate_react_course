import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { iFetchedMovie, iWatchedMovie } from "../../types";

interface MovieDetails {
  id: string;
  onMovieUnSelect(): void;
  onAddWatched(mvoie: iWatchedMovie): void;
  watched: iWatchedMovie[];
}

const address = `https://www.omdbapi.com/?apikey=ae139676`;

function MovieDetails({
  id,
  onMovieUnSelect,
  onAddWatched,
  watched,
}: MovieDetails) {
  const [movie, setMovie] = useState<iFetchedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const watchedIDs = watched.map((w) => w.imdbID);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(address + `&i=${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data: iFetchedMovie = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovie(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return <ErrorMessage message={error} />;
  } else if (!movie) {
    return;
  }

  const {
    Title,
    Poster,
    Runtime,
    Released,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director,
  } = movie;

  return (
    <div className="details">
      {
        <>
          <header>
            <button className="btn-back" onClick={onMovieUnSelect}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of ${Title}`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!watchedIDs.includes(id) ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        onAddWatched({
                          ...movie,
                          userRating: userRating.toString(),
                        });
                        onMovieUnSelect();
                      }}
                    >
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You've already rated this item!</p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      }
    </div>
  );
}

export default MovieDetails;
