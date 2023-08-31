interface NextButtonProps {
  onNextClick(): void;
  answer: number;
}

function NextButton({ onNextClick, answer }: NextButtonProps) {
  if (isNaN(answer)) return null;

  return (
    <button className="btn btn-ui" onClick={onNextClick}>
      Next
    </button>
  );
}

export default NextButton;
