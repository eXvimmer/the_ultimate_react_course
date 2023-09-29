import { useRootSelector } from "../../hooks/useRootSelector";

function Username() {
  const { username } = useRootSelector((state) => state.user);

  if (!username) {
    return null;
  }

  return (
    <div className="hidden text-sm font-semibold capitalize md:block">
      {username}
    </div>
  );
}

export default Username;
