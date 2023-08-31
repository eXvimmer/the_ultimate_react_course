import { Reducer, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

enum Status {
  LOADING = "LOADING",
  ERROR = "ERROR",
  READY = "READY",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

enum ActionType {
  DATA_LOADING,
  DATA_RECEIVED,
  DATA_FAILED,
}

type Action =
  | { type: ActionType.DATA_LOADING }
  | { type: ActionType.DATA_RECEIVED; payload: Question[] }
  | { type: ActionType.DATA_FAILED };

interface AppState {
  questions: Question[];
  status: Status;
}

const initialState: AppState = {
  questions: [],
  status: Status.LOADING,
};

const reducer: Reducer<AppState, Action> = (s, a) => {
  switch (a.type) {
    case ActionType.DATA_LOADING:
      return { ...s, questions: [], status: Status.LOADING };
    case ActionType.DATA_RECEIVED:
      return { ...s, questions: a.payload, status: Status.READY };
    case ActionType.DATA_FAILED:
      return { ...s, questions: [], status: Status.ERROR };
    default:
      throw new Error("unknown action type for App");
  }
};

function App() {
  const [, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ActionType.DATA_LOADING });
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

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
