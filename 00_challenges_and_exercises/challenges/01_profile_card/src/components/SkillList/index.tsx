import Skill, { SkillProps } from "../Skill";

interface SkillListProps {
  skills: SkillProps[];
}

function SkillList({ skills }: SkillListProps) {
  return (
    <div className="skill-list">
      {skills.map((skill) => {
        return <Skill key={skill.skill} {...skill} />;
      })}
    </div>
  );
}

export default SkillList;
