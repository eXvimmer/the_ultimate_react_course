interface IntroProps {
  name: string;
  bio: string;
}

function Intro({ name, bio }: IntroProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{bio}</p>
    </div>
  );
}

export default Intro;
