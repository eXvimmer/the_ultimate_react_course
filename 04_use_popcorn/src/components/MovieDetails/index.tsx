import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

interface MovieDetails {
  id: string;
  onMovieUnSelect(): void;
}

interface iFetchedMovie {
  Title: string;
  // Year: string;
  Poster: string;
  Runtime: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  imdbRating: string;
}

const address = `https://www.omdbapi.com/?apikey=ae139676`;

function MovieDetails({ id, onMovieUnSelect }: MovieDetails) {
  const [
    {
      Title,
      Poster,
      Runtime,
      Released,
      Genre,
      imdbRating,
      Plot,
      Actors,
      Director,
    },
    setMovie,
  ] = useState<iFetchedMovie>({
    Title: "",
    // Year: "",
    Poster: "",
    Runtime: "",
    Plot: "",
    Released: "",
    Actors: "",
    Director: "",
    Genre: "",
    imdbRating: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(address + `&i=${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await res.json();
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

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
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
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
