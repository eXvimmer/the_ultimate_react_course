import { useState } from "react";

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);
  const nDaysLater = new Date(
    new Date().getTime() + count * 24 * 60 * 60 * 1000
  );
  return (
    <div>
      <button onClick={() => setStep(step - 1)}>-</button>
      <span>Step: {step}</span>
      <button onClick={() => setStep(step + 1)}>+</button>
      <div>
        <button onClick={() => setCount(count - step)}>-</button>
        <span>Count: {count}</span>
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
    </div>
  );
}

export default Counter;
