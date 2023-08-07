import { ReactNode, useState } from "react";
import ToggleButton from "../ToggleButton";

interface BoxProps {
  children: ReactNode;
}

function Box({ children }: BoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && children}
    </div>
  );
}

export default Box;
