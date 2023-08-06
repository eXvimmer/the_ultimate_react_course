import { useState } from "react";
import { iMovie } from "../../types";
import MovieList from "../MovieList";
import ToggleButton from "../ToggleButton";

interface ListBoxProps {
  movies: iMovie[];
}

function ListBox({ movies }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && <MovieList movies={movies} />}
    </div>
  );
}

export default ListBox;
