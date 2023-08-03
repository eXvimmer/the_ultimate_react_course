function FormSplitBill() {
  // TODO: get friend's name from the props
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label htmlFor="bill-value">💰 Bill Value</label>
      <input type="number" id="bill-value" />
      <label htmlFor="your-expense">🎅 Your expense</label>
      <input type="number" id="your-expense" />
      <label htmlFor="friends-expense">👭 X's expense</label>
      <input type="number" id="friends-expense" disabled />

      <label htmlFor="who">🤑 Who is paying the bill?</label>
      <select id="who">
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}

export default FormSplitBill;
