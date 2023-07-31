import Item, { Question } from "../Item";

interface AccordionProps {
  data: Question[];
}

function Accordion({ data: questions }: AccordionProps) {
  return (
    <div className="accordion content-box">
      {questions.map((q, i) => {
        return <Item number={i + 1} {...q} key={q.title} />;
      })}
    </div>
  );
}

export default Accordion;
