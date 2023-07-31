import Card, { Question } from "../Card";
import { useState } from "react";

interface FlashCardsProps {
  questions: Question[];
}

function FlashCards({ questions }: FlashCardsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flashcards">
      {questions.map((q) => (
        <Card
          {...q}
          key={q.id}
          selected={q.id === selectedId}
          onClick={setSelectedId}
        />
      ))}
    </div>
  );
}

export default FlashCards;
