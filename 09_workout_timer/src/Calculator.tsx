import { memo, useState } from "react";
// @ts-expect-error: It works
import clickSound from "./assets/ClickSound.m4a";

const sound = new Audio(clickSound);

interface CalculatorProps {
  workouts: {
    name: string;
    numExercises: number;
  }[];
  allowSound: boolean;
}

const Calculator = memo(function Calculator({
  workouts,
  allowSound,
}: CalculatorProps) {
  const [number, setNumber] = useState(workouts?.[0].numExercises ?? 0);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(
    (number * sets * speed) / 60 + (sets - 1) * durationBreak,
  );

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const handleTimeIncrement = () => {
    setDuration(Math.floor(duration) + 1);
  };

  const handleTimeDecrement = () => {
    setDuration(duration > 1 ? Math.ceil(duration) - 1 : 0);
  };

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select
            value={number}
            onChange={(e) => {
              setNumber(+e.target.value);
              setDuration(
                (number * sets * speed) / 60 + (sets - 1) * durationBreak,
              );
              if (allowSound) {
                sound.play();
              }
            }}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => {
              setSets(+e.target.value);
              setDuration(
                (number * sets * speed) / 60 + (sets - 1) * durationBreak,
              );
              if (allowSound) {
                sound.play();
              }
            }}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => {
              setSpeed(+e.target.value);
              setDuration(
                (number * sets * speed) / 60 + (sets - 1) * durationBreak,
              );
              if (allowSound) {
                sound.play();
              }
            }}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => {
              setDurationBreak(+e.target.value);
              setDuration(
                (number * sets * speed) / 60 + (sets - 1) * durationBreak,
              );
              if (allowSound) {
                sound.play();
              }
            }}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleTimeDecrement}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleTimeIncrement}>+</button>
      </section>
    </>
  );
});

export default Calculator;
