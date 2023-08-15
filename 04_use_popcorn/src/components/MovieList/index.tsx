import { iMovie } from "../../types";
import Movie from "../Movie";

interface MovieListProps {
  movies: iMovie[];
  onMovieSelect(id: string): void;
}

function MovieList({ movies, onMovieSelect }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onMovieSelect={onMovieSelect} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MovieList;
