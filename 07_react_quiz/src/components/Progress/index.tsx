import { useQuiz } from "../../contexts/QuizContext";

function Progress() {
  const { index, answer, points, questions, maxPossiblePoints } = useQuiz();

  const questionsCount = questions.length;
  return (
    <header className="progress">
      <progress max={questionsCount} value={index + Number(!isNaN(answer))} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsCount}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
