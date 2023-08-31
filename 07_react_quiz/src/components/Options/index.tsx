import { iQuestion } from "../../types";

interface OptionsProps {
  question: iQuestion;
}

function Options({ question: { options } }: OptionsProps) {
  return (
    <div className="options">
      {options.map((opt) => (
        <button className="btn btn-option" key={opt}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
