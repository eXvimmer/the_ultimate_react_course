interface SelectPercentageProps {
  value: number;
  who: string;
  onPercentageChange(who: string, num: number): void;
}

function SelectPercentage({
  value,
  who,
  onPercentageChange,
}: SelectPercentageProps) {
  return (
    <div>
      <label htmlFor={`selectPercentage-${who}`}>
        How did {who} like the service?
      </label>
      <select
        id={`selectPercentage-${who}`}
        name={who}
        value={value}
        onChange={(e) => onPercentageChange(who, parseInt(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely Amazing (20%)</option>
      </select>
    </div>
  );
}

export default SelectPercentage;
