export interface SkillProps {
  skill: string;
  emoji: string;
  color: string;
}

function Skill({ skill, color, emoji }: SkillProps) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      {skill} {emoji}
    </div>
  );
}

export default Skill;
