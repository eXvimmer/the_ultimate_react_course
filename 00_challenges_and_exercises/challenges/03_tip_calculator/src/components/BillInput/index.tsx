interface BillInputProps {
  value: number;
  onBillChange(num: number): void;
}

function BillInput({ value, onBillChange }: BillInputProps) {
  return (
    <div>
      <label htmlFor="billInput">How much was the bill?</label>
      <input
        min={0}
        id="billInput"
        type="number"
        value={value}
        onChange={(e) => onBillChange(Math.abs(parseFloat(e.target.value)))}
      />
    </div>
  );
}

export default BillInput;
