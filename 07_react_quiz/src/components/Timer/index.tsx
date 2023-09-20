import { useEffect } from "react";
import { useQuiz } from "../../contexts/QuizContext";

function Timer() {
  const { remainingSeconds, handleTimerTick: onTimerTick } = useQuiz();
  const mins = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      onTimerTick?.();
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
    // TODO: memoize your components to get rid of unnecessary re-renders when
    // the timer is active
  }, [onTimerTick]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
