interface ResetProps {
  onReset(): void;
}

function Reset({ onReset }: ResetProps) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default Reset;
