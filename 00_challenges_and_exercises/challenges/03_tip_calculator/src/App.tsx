import { useState } from "react";
import BillInput from "./components/BillInput";
import SelectPercentage from "./components/SelectPrecentage";
import Output from "./components/Output";
import Reset from "./components/Reset";

function App() {
  const [billValue, setBillValue] = useState(0);
  const [youPercentage, setYouPercentage] = useState(0);
  const [otherPercentage, setOtherPercentage] = useState(0);

  const handleBillChange = (num: number) => {
    setBillValue(num);
  };

  const handleReset = () => {
    setBillValue(0);
    setYouPercentage(0);
    setOtherPercentage(0);
  };

  return (
    <div>
      <BillInput value={billValue} onBillChange={handleBillChange} />
      <SelectPercentage
        value={youPercentage}
        who="you"
        onPercentageChange={setYouPercentage}
      />
      <SelectPercentage
        value={otherPercentage}
        who="your friend"
        onPercentageChange={setOtherPercentage}
      />
      {billValue > 0 && (
        <>
          <Output
            bill={billValue}
            tip={(((youPercentage + otherPercentage) / 2) * billValue) / 100}
          />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

export default App;
