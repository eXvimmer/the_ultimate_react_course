import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const title = `toggle ${isDarkMode ? "light" : "dark"} mode`;
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun title={title} />
      ) : (
        <HiOutlineMoon title={title} />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
