import Button from "../../Button";

export interface FriendType {
  id: string | number;
  name: string;
  image: string;
  balance: number;
}

interface FriendProps {
  friend: FriendType;
  onSelectFriend(friend: FriendType): void;
  selectedId?: number | string;
}

function Friend({ friend, onSelectFriend, selectedId }: FriendProps) {
  const { image, balance, name } = friend;
  const isSelected = selectedId === friend.id;

  return (
    <li className={`${isSelected ? "selected" : ""}`}>
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
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;
