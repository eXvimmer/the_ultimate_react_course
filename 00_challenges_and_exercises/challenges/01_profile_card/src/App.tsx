import Avatar from "./components/Avatar";
import img from "./cat.jpg";
import Intro from "./components/Intro";
import SkillList from "./components/SkillList";

const skills = [
  { skill: "HTML + CSS", emoji: "💪", color: "#E0F116" },
  { skill: "JavaScript", emoji: "💪", color: "#70E61C" },
  { skill: "TypeScript", emoji: "💪", color: "#0895EE" },
  { skill: "Go", emoji: "🚀", color: "#73AAF7" },
  { skill: "C++", emoji: "😉", color: "#17C9AC" },
  { skill: "Python", emoji: "😎", color: "#EB1EE1" },
  { skill: "React", emoji: "💪", color: "#E81070" },
  { skill: "SDL", emoji: "💣", color: "#BE31FA" },
  { skill: "OpenGL", emoji: "🚀", color: "#17C9AC" },
];

const bio = `I'm a web/indie game developer. I like creating beautiful softwares using bare minimum technologies and contributing to open source community by creating free software or writing articles about new technologies. Currentlly, I'm working in Google, and I try to finish my third indie game while I'm at home. You can visit my personal website at hayati.dev`;

function App() {
  return (
    <div className="card">
      <Avatar img={img} />
      <div className="data">
        <Intro name="Mustafa Hayati" bio={bio} />
        <SkillList skills={skills} />
      </div>
    </div>
  );
}

export default App;
