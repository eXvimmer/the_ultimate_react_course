import { Reducer, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { iQuestion } from "./types";
import NextButton from "./components/NextButton";

enum Status {
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

enum ActionType {
  DATA_LOADING,
  DATA_RECEIVED,
  DATA_FAILED,
  START,
  NEW_ANSWER,
  NEXT_QUESTION,
}

type Action =
  | { type: ActionType.DATA_LOADING }
  | { type: ActionType.DATA_RECEIVED; payload: iQuestion[] }
  | { type: ActionType.DATA_FAILED }
  | { type: ActionType.START }
  | { type: ActionType.NEW_ANSWER; payload: number }
  | { type: ActionType.NEXT_QUESTION };

interface AppState {
  questions: iQuestion[];
  status: Status;
  index: number;
  answer: number;
  points: number;
}

const initialState: AppState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answer: NaN, // NaN instead of null, means no answer
  points: 0,
};

const reducer: Reducer<AppState, Action> = (s, a) => {
  switch (a.type) {
    case ActionType.DATA_LOADING:
      return { ...s, questions: [], status: Status.LOADING };
    case ActionType.DATA_RECEIVED:
      return { ...s, questions: a.payload, status: Status.READY };
    case ActionType.DATA_FAILED:
      return { ...s, questions: [], status: Status.ERROR };
    case ActionType.START:
      return { ...s, status: Status.ACTIVE };
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
      // TODO: handle out of range indexes
      return { ...s, index: s.index + 1, answer: NaN };
    default:
      throw new Error("unknown action type for App");
  }
};

function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const questionsCount = questions?.length;

  useEffect(() => {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ActionType.DATA_RECEIVED,
          payload: data,
        });
      })
      .catch((/* err */) => {
        // console.error(err);
        dispatch({ type: ActionType.DATA_FAILED });
      });
  }, []);

  const handleGameStart = () => {
    dispatch({ type: ActionType.START });
  };

  const handleAnswer = (index: number) => {
    dispatch({ type: ActionType.NEW_ANSWER, payload: index });
  };

  const handleNextClick = () => {
    dispatch({ type: ActionType.NEXT_QUESTION });
  };

  return (
    <div className="app">
      <Header />
      <Main>
        {/* TODO: handle other statuses  */}
        {status === Status.LOADING ? (
          <Loader />
        ) : status === Status.ERROR ? (
          <ErrorComponent />
        ) : status === Status.READY ? (
          <StartScreen
            questionsCount={questionsCount}
            onGameStart={handleGameStart}
          />
        ) : status === Status.ACTIVE ? (
          <>
            <Question
              question={questions[index]}
              answer={answer}
              onAnswer={handleAnswer}
            />
            <NextButton onNextClick={handleNextClick} answer={answer} />
          </>
        ) : null}
      </Main>
    </div>
  );
}

export default App;
