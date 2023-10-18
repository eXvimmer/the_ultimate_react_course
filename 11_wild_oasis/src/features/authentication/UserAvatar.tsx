import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();
  let fullName = "";
  let avatar = "";
  if (user && user.user_metadata && "full_name" in user.user_metadata) {
    fullName = user?.user_metadata.full_name;
  }
  if (user && user.user_metadata && "avatar" in user.user_metadata) {
    avatar = user?.user_metadata.avatar;
  }
  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`avatar ${fullName ? `of ${fullName}` : ""}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
