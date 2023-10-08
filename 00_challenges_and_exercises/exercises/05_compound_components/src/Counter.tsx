import { ReactNode, createContext, useContext, useState } from "react";

interface iCounter {
  count: number;
  increase: () => void;
  decrease: () => void;
}

// 1. Create the context
const CounterContext = createContext<iCounter>({} as iCounter);

// 2. Create the parent component
function Counter({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      {children}
    </CounterContext.Provider>
  );
}

// 3. Create child components related to the parent component
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

function Label({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

function Increase({ icon }: { icon: string | ReactNode }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }: { icon: string | ReactNode }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

// 4. Make children components the properties of the parent
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
