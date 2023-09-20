import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./contexts/QuizContext";
import { ActionType, Status } from "./reducers/quizReducer";

function App() {
  const { status, dispatch } = useQuiz();

  useEffect(() => {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch?.({
          type: ActionType.DATA_RECEIVED,
          payload: data,
        });
      })
      .catch((/* err */) => {
        // console.error(err);
        dispatch?.({ type: ActionType.DATA_FAILED });
      });
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === Status.LOADING ? (
          <Loader />
        ) : status === Status.ERROR ? (
          <ErrorComponent />
        ) : status === Status.READY ? (
          <StartScreen />
        ) : status === Status.ACTIVE ? (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        ) : status === Status.FINISHED ? (
          <FinishScreen />
        ) : null}
      </Main>
    </div>
  );
}

export default App;
