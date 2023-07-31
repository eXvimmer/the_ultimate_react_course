import { useState } from "react";
import Item, { Question } from "../Item";

interface AccordionProps {
  data: Question[];
}

function Accordion({ data: questions }: AccordionProps) {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  const handleOpen = (num: number | null) => {
    setCurOpen(num);
  };

  return (
    <div className="accordion content-box">
      {questions.map((q, i) => {
        return (
          <Item
            {...q}
            num={i}
            key={q.title}
            isOpen={curOpen === i}
            onOpen={handleOpen}
          />
        );
      })}
    </div>
  );
}

export default Accordion;
