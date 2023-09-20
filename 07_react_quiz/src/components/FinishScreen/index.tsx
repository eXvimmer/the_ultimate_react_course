import { useQuiz } from "../../contexts/QuizContext";

function FinishScreen() {
  const { points, highScore, maxPossiblePoints, handleRestartClick } =
    useQuiz();
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
      <button className="btn btn-ui" onClick={handleRestartClick}>
        Restart the Quiz
      </button>
    </>
  );
}

export default FinishScreen;
