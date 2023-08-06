import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { tempMovieData } from "./data";
import { useState } from "react";

export default function App() {
  const [movies] = useState(tempMovieData);

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} />
    </>
  );
}
