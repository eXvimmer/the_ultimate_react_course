import { useState } from "react";
import Button from "../../Button";
import { FriendType } from "../Friend";

interface FormAddFriendProps {
  onAddFriend(friend: FriendType): void;
}

function FormAddFriend({ onAddFriend }: FormAddFriendProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleAddFriend: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name || !image) {
      return;
    }
    const id = crypto.randomUUID();
    onAddFriend({
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    });
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label htmlFor="name">👭Friend name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="image">🌇Image URL</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

export default FormAddFriend;
