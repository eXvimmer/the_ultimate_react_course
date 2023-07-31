import { useState } from "react";

export interface Question {
  title: string;
  text: string;
}

interface ItemProps extends Question {
  number: number;
}

function Item({ title, text, number }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <p className="number">{number.toString().padStart(2, "0")}</p>
      <h2 className="text">{title}</h2>
      <span className="icon">{isOpen ? "-" : "+"}</span>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

export default Item;
