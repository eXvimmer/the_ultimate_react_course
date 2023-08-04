import { useState } from "react";
import Button from "../../Button";
import { FriendType } from "../Friend";

interface FormSplitBillProps {
  friend: FriendType;
}

function FormSplitBill({ friend }: FormSplitBillProps) {
  const [bill, setBill] = useState(0);
  const [userExpense, setUserExpense] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendsExpense = bill > 0 ? bill - userExpense : 0;

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label htmlFor="bill-value">💰 Bill Value</label>
      <input
        type="number"
        id="bill-value"
        value={bill}
        min={0}
        onChange={(e) => {
          setBill(parseFloat(e.target.value));
        }}
      />
      <label htmlFor="user-expense">🎅 Your expense</label>
      <input
        type="number"
        id="user-expense"
        value={userExpense}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          setUserExpense(v > bill ? userExpense : v);
        }}
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
