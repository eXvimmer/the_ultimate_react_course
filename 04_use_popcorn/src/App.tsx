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

const address = `https://www.omdbapi.com/?i=tt3896198&apikey=ae139676`;

function Loader() {
  return <p className="loader">Loading...</p>;
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const query = "interstellar";

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(address + `&s=${query}`);
        const data = await res.json();
        setMovies(data.Search);
      } catch {
        console.log("Oops!");
        // TODO: show error component
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
