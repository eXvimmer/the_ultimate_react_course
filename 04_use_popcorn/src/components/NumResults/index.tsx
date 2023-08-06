import { iMovie } from "../../types";

interface NumResultsProps {
  movies: iMovie[];
}

function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
