interface ProgressProps {
  index: number;
  answer: number;
  points: number;
  maxPossiblePoints: number;
  questionsCount: number;
}

function Progress({
  index,
  answer,
  questionsCount,
  points,
  maxPossiblePoints,
}: ProgressProps) {
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
