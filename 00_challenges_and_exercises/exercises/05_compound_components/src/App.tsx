import Counter from "./Counter";

function App() {
  return (
    <div>
      <div>
        <Counter>
          <Counter.Label>The Counter</Counter.Label>
          <Counter.Decrease icon="➖" />
          <Counter.Count />
          <Counter.Increase icon="➕" />
        </Counter>
      </div>
      <div>
        <Counter>
          <Counter.Decrease icon="-" />
          <Counter.Count />
          <Counter.Increase icon="+" />
          {/*
            <Counter.Label>The Counter</Counter.Label>
          */}
        </Counter>
      </div>
    </div>
  );
}

export default App;
