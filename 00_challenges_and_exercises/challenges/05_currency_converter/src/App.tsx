import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [base, setBase] = useState("USD");
  const [quote, setQuote] = useState("EUR");
  const [result, setResult] = useState(0);

  useEffect(() => {
    let timerID: number | undefined;

    async function fetchQuotes() {
      const query = `https://api.frankfurter.app/latest?amount=${amount}&from=${base}&to=${quote}`;
      const res = await fetch(query);
      const data = await res.json();
      setResult(parseFloat(data.rates[quote]));
      // TODO: handle errors
    }

    const debounceFetchQuote = () => {
      clearTimeout(timerID);
      timerID = setTimeout(() => {
        if (amount && amount > 0 && quote !== base) {
          setResult(0);
          fetchQuotes();
        }
      }, 500);
    };

    debounceFetchQuote();

    return () => {
      clearTimeout(timerID);
    };
  }, [amount, quote, base]);

  return (
    <div>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <select value={base} onChange={(e) => setBase(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={quote} onChange={(e) => setQuote(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {result && quote !== base ? (
          <span>
            {result} {quote}
          </span>
        ) : null}
      </p>
    </div>
  );
}
