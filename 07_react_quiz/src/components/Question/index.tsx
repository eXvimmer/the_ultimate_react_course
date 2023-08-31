import { iQuestion } from "../../types";
import Options from "../Options";

interface QuestionProps {
  question: iQuestion;
}

function Question({ question }: QuestionProps) {
  const { question: title } = question;
  return (
    <div>
      <h4>{title}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
