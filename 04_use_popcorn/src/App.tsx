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
import StarRating from "./components/StarRating";

const address = `https://www.omdbapi.com/?i=tt3896198&apikey=ae139676`;

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched] = useState(tempWatchedData);
  const query = "interstellar";

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(address + `&s=${query}`);
      const data = await res.json();
      setMovies(data.Search);
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
        <Box>
          <MovieList movies={movies} />
          <StarRating maxRating={5} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
