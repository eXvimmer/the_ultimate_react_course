import { ReactNode, useState } from "react";
import ToggleButton from "../ToggleButton";

interface ListBoxProps {
  children: ReactNode;
}

function ListBox({ children }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && children}
    </div>
  );
}

export default ListBox;
