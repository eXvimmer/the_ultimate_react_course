import { memo } from "react";

interface ToggleSoundsProps {
  allowSound: boolean;
  setAllowSound: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSounds = memo(function ToggleSounds({
  allowSound,
  setAllowSound,
}: ToggleSoundsProps) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});

export default ToggleSounds;
