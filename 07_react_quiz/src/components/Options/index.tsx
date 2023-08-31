import { iQuestion } from "../../types";

interface OptionsProps {
  question: iQuestion;
  onAnswer(index: number): void;
  answer: number;
}

function Options({
  question: { options, correctOption },
  onAnswer,
  answer,
}: OptionsProps) {
  const beenAnswered = !isNaN(answer);

  return (
    <div className="options">
      {options.map((opt, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            beenAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          disabled={beenAnswered}
          key={opt}
          onClick={() => onAnswer(index)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
