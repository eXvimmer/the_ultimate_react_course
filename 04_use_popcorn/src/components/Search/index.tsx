interface SearchProps {
  query: string;
  onSetQuery(arg: string): void;
}

function Search({ query, onSetQuery }: SearchProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

export default Search;
