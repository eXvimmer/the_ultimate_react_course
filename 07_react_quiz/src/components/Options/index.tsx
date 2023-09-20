import { useQuiz } from "../../contexts/QuizContext";

function Options() {
  const { index, answer, questions, handleAnswer } = useQuiz();
  const beenAnswered = !isNaN(answer);
  const { options, correctOption } = questions[index];

  return (
    <div className="options">
      {options.map((opt, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            beenAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          disabled={beenAnswered}
          key={opt}
          onClick={() => handleAnswer?.(index)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
