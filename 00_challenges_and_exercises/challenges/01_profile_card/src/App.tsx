import Avatar from "./components/Avatar";
import img from "./cat.jpg";
import Intro from "./components/Intro";
import SkillList from "./components/SkillList";
import { Level } from "./components/Skill";

const skills = [
  { level: Level.advanced, skill: "TypeScript", color: "#0895EE" },
  { level: Level.advanced, skill: "JavaScript", color: "#70E61C" },
  { level: Level.advanced, skill: "React", color: "#E81070" },
  { level: Level.advanced, skill: "ExpressJS", color: "#70E61C" },
  { level: Level.intermediate, skill: "C++", color: "#17C9AC" },
  { level: Level.advanced, skill: "HTML + CSS", color: "#E0F116" },
  { level: Level.intermediate, skill: "Go", color: "#73AAF7" },
  { level: Level.intermediate, skill: "NodeJS", color: "#E0F116" },
  {
    level: Level.intermediate,
    skill: "SQL/NoSQL",
    emoji: "😉",
    color: "#BE31FA",
  },
  { level: Level.intermediate, skill: "Python", emoji: "😎", color: "#EB1EE1" },
  { level: Level.beginner, skill: "SDL", emoji: "💣", color: "#BE31FA" },
  { level: Level.beginner, skill: "OpenGL", emoji: "🚀", color: "#17C9AC" },
];

const name = "Mustafa Hayati";
const bio = `I am a web and indie game developer who enjoys creating beautiful software using the bare minimum technologies. Additionally, I contribute to the open-source community by creating free software and writing articles about new technologies. Currently, I am employed at Google and working on my third indie game in my spare time. You can visit my personal website at hayati.dev.`;

function App() {
  return (
    <div className="card">
      <Avatar img={img} alt={name} />
      <div className="data">
        <Intro name={name} bio={bio} />
        <SkillList skills={skills} />
      </div>
    </div>
  );
}

export default App;
