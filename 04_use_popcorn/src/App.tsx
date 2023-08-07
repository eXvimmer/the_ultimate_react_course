import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { tempMovieData } from "./data";
import { useState } from "react";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";

export default function App() {
  const [movies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
