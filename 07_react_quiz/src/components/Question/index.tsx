import { iQuestion } from "../../types";
import Options from "../Options";

interface QuestionProps {
  question: iQuestion;
  answer: number;
  onAnswer(index: number): void;
}

function Question({ question, onAnswer, answer }: QuestionProps) {
  const { question: title } = question;
  return (
    <div>
      <h4>{title}</h4>
      <Options question={question} onAnswer={onAnswer} answer={answer} />
    </div>
  );
}

export default Question;
