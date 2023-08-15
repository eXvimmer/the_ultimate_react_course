import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { tempMovieData, tempWatchedData } from "./data";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";

const address = `https://www.omdbapi.com/?i=tt3896198&apikey=ae139676`;

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    let timeoutId: number | undefined;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const encodedQuery = encodeURIComponent(query);
        const res = await fetch(address + `&s=${encodedQuery}`);
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
        setError("");
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetchMovies = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (query) {
          fetchMovies();
        }
      }, 1000); // Debounce time: 1 second
    };

    debounceFetchMovies();

    return () => {
      // Clear the timeout if the component unmounts or the `query` changes
      // before the debounce time elapses
      clearTimeout(timeoutId);
    };
  }, [query]);

  function handleMovieSelect(id: string) {
    setSelectedId(id);
  }

  function handleMovieUnSelect() {
    setSelectedId("");
  }

  return (
    <>
      <NavBar>
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList onMovieSelect={handleMovieSelect} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onMovieUnSelect={handleMovieUnSelect}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
