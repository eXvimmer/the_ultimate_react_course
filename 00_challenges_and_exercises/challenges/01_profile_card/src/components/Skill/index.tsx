export enum Level {
  beginner,
  intermediate,
  advanced,
}

export interface SkillProps {
  skill: string;
  color: string;
  level: Level;
}

function Skill({ skill, color, level }: SkillProps) {
  let emoji = "";
  switch (level) {
    case Level.beginner:
      emoji = "😅";
      break;
    case Level.intermediate:
      emoji = "💪";
      break;
    case Level.advanced:
      emoji = "🚀";
      break;
    default:
      throw new Error("invalid skill level");
  }

  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>{emoji}</span>
    </div>
  );
}

export default Skill;
