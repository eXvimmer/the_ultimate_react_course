import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  type: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
