import { iMovie } from "../../types";
import Logo from "../Logo";
import NumResults from "../NumResults";
import Search from "../Search";

interface NavBarProps {
  movies: iMovie[];
}

function NavBar({ movies }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
}

export default NavBar;
