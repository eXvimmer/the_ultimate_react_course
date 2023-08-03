import { FriendType } from "../Friend";

interface FormSplitBillProps {
  friend: FriendType;
}

function FormSplitBill({ friend }: FormSplitBillProps) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label htmlFor="bill-value">💰 Bill Value</label>
      <input type="number" id="bill-value" />
      <label htmlFor="your-expense">🎅 Your expense</label>
      <input type="number" id="your-expense" />
      <label htmlFor="friends-expense">👭 {friend.name}'s expense</label>
      <input type="number" id="friends-expense" disabled />

      <label htmlFor="who">🤑 Who is paying the bill?</label>
      <select id="who">
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
    </form>
  );
}

export default FormSplitBill;
