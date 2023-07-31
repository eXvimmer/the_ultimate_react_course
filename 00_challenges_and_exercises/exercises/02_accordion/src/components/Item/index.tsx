export interface Question {
  title: string;
  text: string;
}

interface ItemProps extends Question {
  num: number;
  isOpen: boolean;
  onOpen(num: number | null): void;
}

function Item({ title, text, num, isOpen, onOpen }: ItemProps) {
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => {
        onOpen(isOpen ? null : num);
      }}
    >
      <p className="number">{(num + 1).toString().padStart(2, "0")}</p>
      <h2 className="text">{title}</h2>
      <span className="icon">{isOpen ? "-" : "+"}</span>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

export default Item;
