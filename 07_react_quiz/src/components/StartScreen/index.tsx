interface StartScreenProps {
  questionsCount: number;
  onGameStart(): void;
}

function StartScreen({ questionsCount, onGameStart }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {questionsCount} question{questionsCount === 1 ? "" : "s"} to test your
        React knowledge
      </h3>
      <button className="btn btn-ui" onClick={onGameStart}>
        Let's Get Started
      </button>
    </div>
  );
}

export default StartScreen;
