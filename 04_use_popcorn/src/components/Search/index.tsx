import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";

interface SearchProps {
  query: string;
  onSetQuery(arg: string): void;
}

function Search({ query, onSetQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl?.current?.focus();
  }, []);

  useKey("Enter", () => {
    if (document.activeElement === inputEl?.current) return;
    inputEl?.current?.focus();
    onSetQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
