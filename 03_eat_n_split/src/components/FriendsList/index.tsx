import Friend, { FriendType } from "../Friend";

interface FriendsListProps {
  friends: FriendType[];
  onSelectFriend(friend: FriendType): void;
  selectedId?: number | string;
}

function FriendsList({
  friends,
  onSelectFriend,
  selectedId,
}: FriendsListProps) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          onSelectFriend={onSelectFriend}
          selectedId={selectedId}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
