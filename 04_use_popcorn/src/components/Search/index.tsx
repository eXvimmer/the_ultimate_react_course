import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  onSetQuery(arg: string): void;
}

function Search({ query, onSetQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl?.current?.focus();
  }, []);

  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (document.activeElement === inputEl?.current) return;

      if (e.code === "Enter") {
        inputEl?.current?.focus();
        onSetQuery("");
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onSetQuery]);

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
