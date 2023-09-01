interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
  highScore: number;
  onRestartClick(): void;
}

function FinishScreen({
  points,
  maxPossiblePoints,
  highScore,
  onRestartClick,
}: FinishScreenProps) {
  const percentage = (points / maxPossiblePoints) * 100;
  const emoji =
    percentage === 100
      ? "🥇"
      : percentage > 80
      ? "🥈"
      : percentage > 50
      ? "🥉"
      : "💐";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> /{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">High Score: {highScore} points</p>
      <button className="btn btn-ui" onClick={onRestartClick}>
        Restart the Quiz
      </button>
    </>
  );
}

export default FinishScreen;
