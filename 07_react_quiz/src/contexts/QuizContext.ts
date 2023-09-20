import { Dispatch, createContext, useContext } from "react";
import { Action, AppState, initialState } from "../reducers/quizReducer";

interface iQuizContext extends AppState {
  maxPossiblePoints: number;
  handleGameStart?(): void;
  handleAnswer?(index: number): void;
  handleNextClick?(): void;
  handleFinishClick?(): void;
  handleRestartClick?(): void;
  handleTimerTick?(): void;
  dispatch?: Dispatch<Action>;
}

export const QuizContext = createContext<iQuizContext>({
  ...initialState,
  maxPossiblePoints: 0,
});

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz context should be used inside a QuizProvider");
  }
  return context;
}
