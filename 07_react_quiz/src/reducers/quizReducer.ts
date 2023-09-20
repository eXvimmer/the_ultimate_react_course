import { Reducer } from "react";
import { iQuestion } from "../types";

export enum Status {
  // loading (fetching) data
  LOADING = "LOADING",
  // there was an error while loading (fetching)
  ERROR = "ERROR",
  // fetched the data successfully
  READY = "READY",
  // start the game or is playing the game
  ACTIVE = "ACTIVE",
  // time out or game over
  FINISHED = "FINISHED",
}

export enum ActionType {
  DATA_LOADING,
  DATA_RECEIVED,
  DATA_FAILED,
  START,
  NEW_ANSWER,
  NEXT_QUESTION,
  FINISH,
  RESTART,
  TICK,
}

export type Action =
  | { type: ActionType.DATA_LOADING }
  | { type: ActionType.DATA_RECEIVED; payload: iQuestion[] }
  | { type: ActionType.DATA_FAILED }
  | { type: ActionType.START }
  | { type: ActionType.NEW_ANSWER; payload: number }
  | { type: ActionType.NEXT_QUESTION }
  | { type: ActionType.FINISH }
  | { type: ActionType.RESTART }
  | { type: ActionType.TICK };

export interface AppState {
  questions: iQuestion[];
  status: Status;
  index: number;
  answer: number;
  points: number;
  highScore: number;
  remainingSeconds: number;
}

export const initialState: AppState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answer: NaN, // NaN instead of null, means no answer
  points: 0,
  highScore: parseInt(localStorage.getItem("quiz_high_score") || "0"),
  // calculate the time at the start of the game based on the number questions
  remainingSeconds: NaN,
};

const secondsPerQuestion = 30;

export const reducer: Reducer<AppState, Action> = (s, a) => {
  switch (a.type) {
    case ActionType.DATA_LOADING:
      return { ...s, questions: [], status: Status.LOADING };
    case ActionType.DATA_RECEIVED:
      return { ...s, questions: a.payload, status: Status.READY };
    case ActionType.DATA_FAILED:
      return { ...s, questions: [], status: Status.ERROR };
    case ActionType.START:
      return {
        ...s,
        status: Status.ACTIVE,
        remainingSeconds: s.questions.length * secondsPerQuestion,
      };
    case ActionType.NEW_ANSWER: {
      const question = s.questions[s.index];
      return {
        ...s,
        answer: a.payload,
        points:
          a.payload /* AKA: the answer */ === question.correctOption
            ? s.points + question.points
            : s.points,
      };
    }
    case ActionType.NEXT_QUESTION:
      return { ...s, index: s.index + 1, answer: NaN };
    case ActionType.FINISH:
      return {
        ...s,
        status: Status.FINISHED,
        highScore: s.points > s.highScore ? s.points : s.highScore,
      };
    case ActionType.RESTART:
      return {
        ...initialState,
        questions: s.questions,
        status: Status.READY,
        highScore: s.highScore,
      };
    case ActionType.TICK:
      return {
        ...s,
        remainingSeconds: s.remainingSeconds > 0 ? s.remainingSeconds - 1 : 0,
        status: s.remainingSeconds === 0 ? Status.FINISHED : s.status,
      };
    default:
      throw new Error("unknown action type for App");
  }
};
