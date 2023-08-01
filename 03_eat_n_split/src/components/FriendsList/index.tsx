import Friend, { FriendType } from "../Friend";

function FriendsList({ friends }: { friends: FriendType[] }) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend friend={f} key={f.id} />
      ))}
    </ul>
  );
}

export default FriendsList;
