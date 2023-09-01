import { Reducer, useEffect, useReducer, useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { iQuestion } from "./types";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

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
  FINISH,
  RESTART,
}

type Action =
  | { type: ActionType.DATA_LOADING }
  | { type: ActionType.DATA_RECEIVED; payload: iQuestion[] }
  | { type: ActionType.DATA_FAILED }
  | { type: ActionType.START }
  | { type: ActionType.NEW_ANSWER; payload: number }
  | { type: ActionType.NEXT_QUESTION }
  | { type: ActionType.FINISH }
  | { type: ActionType.RESTART };

interface AppState {
  questions: iQuestion[];
  status: Status;
  index: number;
  answer: number;
  points: number;
  highScore: number;
}

const initialState: AppState = {
  questions: [],
  status: Status.LOADING,
  index: 0,
  answer: NaN, // NaN instead of null, means no answer
  points: 0,
  highScore: parseInt(localStorage.getItem("quiz_high_score") || "0"),
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
    default:
      throw new Error("unknown action type for App");
  }
};

function App() {
  const [{ status, questions, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const questionsCount = questions?.length;
  const maxPossiblePoints = useRef(0);

  useEffect(() => {
    maxPossiblePoints.current = questions.reduce(
      (prev, cur) => cur.points + prev,
      0
    );
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("quiz_high_score", highScore.toString());
  }, [highScore]);

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

  const handleFinishClick = () => {
    dispatch({ type: ActionType.FINISH });
  };

  const handleRestartClick = () => {
    dispatch({ type: ActionType.RESTART });
  };

  return (
    <div className="app">
      <Header />
      <Main>
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
            <Progress
              index={index}
              answer={answer}
              questionsCount={questionsCount}
              points={points}
              maxPossiblePoints={maxPossiblePoints.current}
            />
            <Question
              question={questions[index]}
              answer={answer}
              onAnswer={handleAnswer}
            />
            <NextButton
              onNextClick={handleNextClick}
              onFinishClick={handleFinishClick}
              answer={answer}
              index={index}
              questionsCount={questionsCount}
            />
          </>
        ) : status === Status.FINISHED ? (
          <FinishScreen
            points={points}
            highScore={highScore}
            maxPossiblePoints={maxPossiblePoints.current}
            onRestartClick={handleRestartClick}
          />
        ) : null}
      </Main>
    </div>
  );
}

export default App;
