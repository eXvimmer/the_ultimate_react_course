export interface FriendType {
  id: number;
  name: string;
  image: string;
  balance: number;
}

function Friend({ friend: { image, balance, name } }: { friend: FriendType }) {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 ? (
        <p className="red">
          You owe {name} ${Math.abs(balance)}
        </p>
      ) : balance > 0 ? (
        <p className="green">
          {name} ows you ${balance}
        </p>
      ) : (
        <p>You and {name} are even</p>
      )}
      <button className="button">Select</button>
    </li>
  );
}

export default Friend;
