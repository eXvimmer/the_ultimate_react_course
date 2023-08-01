interface OutputProps {
  bill: number;
  tip: number;
}

function Output({ bill, tip }: OutputProps) {
  const total = bill + tip;
  return (
    <div>
      You pay ${total} (${bill} + ${tip} tip)
    </div>
  );
}

export default Output;
