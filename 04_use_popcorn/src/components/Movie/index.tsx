import { iMovie } from "../../types";

interface MovieProps {
  movie: iMovie;
  onMovieSelect(id: string): void;
}

function Movie({
  movie: { imdbID, Poster, Title, Year },
  onMovieSelect,
}: MovieProps) {
  return (
    <li onClick={() => onMovieSelect(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
