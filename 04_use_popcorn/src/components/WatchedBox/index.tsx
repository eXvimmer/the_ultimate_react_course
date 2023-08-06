import { useState } from "react";
import { tempWatchedData } from "../../data";
import WatchedSummary from "../WatchedSummary";
import WatchedMoviesList from "../WatchedMoviesList";
import ToggleButton from "../ToggleButton";

function WatchedBox() {
  const [watched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}

export default WatchedBox;
