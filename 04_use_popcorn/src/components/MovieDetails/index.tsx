interface MovieDetails {
  id: string;
  onMovieUnSelect(): void;
}

function MovieDetails({ id, onMovieUnSelect }: MovieDetails) {
  return (
    <div className="details">
      {id}
      <button className="btn-back" onClick={onMovieUnSelect}>
        &larr;
      </button>
    </div>
  );
}

export default MovieDetails;
