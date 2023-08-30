import { ChangeEvent, Reducer, useReducer } from "react";

enum ActionType {
  INCREMENT,
  DECREMENT,
  SET_COUNT,
  SET_STEP,
  RESET,
}

type Action =
  | { type: ActionType.INCREMENT }
  | { type: ActionType.DECREMENT }
  | { type: ActionType.SET_COUNT; payload: number }
  | { type: ActionType.RESET }
  | { type: ActionType.SET_STEP; payload: number };

type DateCounterState = {
  count: number;
  step: number;
};

const initialState: DateCounterState = { count: 0, step: 1 };

const reducer: Reducer<DateCounterState, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { ...state, count: state.count + state.step };
    case ActionType.DECREMENT:
      return { ...state, count: state.count - state.step };
    case ActionType.SET_COUNT:
      return { ...state, count: action.payload };
    case ActionType.SET_STEP:
      return { ...state, step: action.payload };
    case ActionType.RESET:
      return { count: 0, step: 1 };
    default:
      throw new Error("unknown action type");
  }
};

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: ActionType.DECREMENT });
  };

  const inc = function () {
    dispatch({ type: ActionType.INCREMENT });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionType.SET_COUNT, payload: Number(e.target.value) });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionType.SET_STEP, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: ActionType.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
