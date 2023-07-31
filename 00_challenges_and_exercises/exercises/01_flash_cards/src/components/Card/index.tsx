export interface Question {
  id: number;
  question: string;
  answer: string;
}

interface CardProps extends Question {
  selected: boolean;
  onClick: React.Dispatch<React.SetStateAction<number | null>>;
}

function Card({ id, question, answer, selected, onClick }: CardProps) {
  return (
    <div
      className={`${selected ? "selected" : ""}`}
      onClick={() => onClick(selected ? null : id)}
    >
      <p>{selected ? answer : question}</p>
    </div>
  );
}

export default Card;
