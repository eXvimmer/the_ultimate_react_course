interface NextButtonProps {
  answer: number;
  index: number;
  questionsCount: number;
  onNextClick(): void;
  onFinishClick(): void;
}

function NextButton({
  answer,
  index,
  questionsCount,
  onNextClick,
  onFinishClick,
}: NextButtonProps) {
  if (isNaN(answer)) return null;

  if (index < questionsCount - 1) {
    return (
      <button className="btn btn-ui" onClick={onNextClick}>
        Next
      </button>
    );
  } else {
    return (
      <button className="btn btn-ui" onClick={onFinishClick}>
        Finish
      </button>
    );
  }
}

export default NextButton;
