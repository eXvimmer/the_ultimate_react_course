import { ReactNode, useEffect, useReducer, useRef } from "react";
import { QuizContext } from "./QuizContext";
import { ActionType, initialState, reducer } from "../reducers/quizReducer";

export default function QuizProvider({ children }: { children: ReactNode }) {
  const [
    { status, questions, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleGameStart = () => {
    dispatch({ type: ActionType.START });
  };

  const handleAnswer = (index: number) => {
    dispatch({ type: ActionType.NEW_ANSWER, payload: index });
  };

  const handleNextClick = () => {
    dispatch({ type: ActionType.NEXT_QUESTION });
  };

  const handleFinishClick = () => {
    dispatch({ type: ActionType.FINISH });
  };

  const handleRestartClick = () => {
    dispatch({ type: ActionType.RESTART });
  };

  const handleTimerTick = () => {
    dispatch({ type: ActionType.TICK });
  };

  const maxPossiblePoints = useRef(0);

  useEffect(() => {
    maxPossiblePoints.current = questions.reduce(
      (prev, cur) => cur.points + prev,
      0,
    );
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("quiz_high_score", highScore.toString());
  }, [highScore]);

  return (
    <QuizContext.Provider
      value={{
        maxPossiblePoints: maxPossiblePoints.current,
        status,
        questions,
        index,
        answer,
        points,
        highScore,
        remainingSeconds,
        handleGameStart,
        handleAnswer,
        handleNextClick,
        handleFinishClick,
        handleRestartClick,
        handleTimerTick,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
