import { useQuiz } from "../../contexts/QuizContext";

function NextButton() {
  const { answer, index, questions, handleNextClick, handleFinishClick } =
    useQuiz();

  if (isNaN(answer)) return null;

  const questionsCount = questions.length;

  if (index < questionsCount - 1) {
    return (
      <button className="btn btn-ui" onClick={handleNextClick}>
        Next
      </button>
    );
  } else {
    return (
      <button className="btn btn-ui" onClick={handleFinishClick}>
        Finish
      </button>
    );
  }
}

export default NextButton;
