import { useState } from "react";

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const nDaysLater = new Date(
    new Date().getTime() + count * 24 * 60 * 60 * 1000
  );

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={step}
        onChange={(e) => {
          setStep(parseInt(e.target.value));
        }}
      />
      <span> {step}</span>
      <div>
        <button onClick={() => setCount(count - step)}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => {
            setCount(parseInt(e.target.value));
          }}
        />
        <button onClick={() => setCount(count + step)}>+</button>
      </div>
      <p>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} day${Math.abs(count) === 1 ? "" : "s"} from today is `
          : `${Math.abs(count)} day${
              Math.abs(count) === 1 ? "" : "s"
            } ago was `}
        {nDaysLater.toDateString()}
      </p>
      {(count !== 0 || step !== 1) && (
        <button
          onClick={() => {
            setCount(0);
            setStep(1);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default Counter;
