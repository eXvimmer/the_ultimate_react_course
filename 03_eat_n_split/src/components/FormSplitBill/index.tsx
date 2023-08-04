import { useState } from "react";
import Button from "../../Button";
import { FriendType } from "../Friend";

interface FormSplitBillProps {
  friend: FriendType;
  onSplitBill(value: number): void;
}

function FormSplitBill({ friend, onSplitBill }: FormSplitBillProps) {
  const [bill, setBill] = useState<number | "">(0);
  const [userExpense, setUserExpense] = useState<number | "">(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendsExpense =
    bill !== "" && bill > 0 ? bill - (userExpense !== "" ? userExpense : 0) : 0;

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBill(Number.isNaN(value) ? "" : value);
  };

  const handleUserExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUserExpense(
      Number.isNaN(value) ? "" : value > +bill ? userExpense : value
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!bill || !userExpense) {
      return;
    }
    onSplitBill(whoIsPaying === "user" ? friendsExpense : -userExpense);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>
      <label htmlFor="bill-value">💰 Bill Value</label>
      <input
        type="number"
        id="bill-value"
        value={bill}
        min={0}
        onChange={handleBillChange}
      />
      <label htmlFor="user-expense">🎅 Your expense</label>
      <input
        type="number"
        id="user-expense"
        value={userExpense}
        onChange={handleUserExpenseChange}
      />
      <label htmlFor="friends-expense">👭 {friend.name}'s expense</label>
      <input
        type="number"
        id="friends-expense"
        disabled
        value={friendsExpense}
      />

      <label htmlFor="who">🤑 Who is paying the bill?</label>
      <select
        id="who"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default FormSplitBill;
