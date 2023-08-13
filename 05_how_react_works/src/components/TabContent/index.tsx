import { useState } from "react";
import { Content } from "../types";

function TabContent({ item }: { item: Content }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  function handleTripleInc() {
    setLikes(likes + 3);
  }

  function handleReset() {
    setShowDetails(true);
    setLikes(0);
  }

  function handleResetLater() {
    setTimeout(handleReset, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️ </span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleResetLater}>Reset in 2s</button>
      </div>
    </div>
  );
}

export default TabContent;
