interface AvatarProps {
  img: string;
}

function Avatar({ img }: AvatarProps) {
  return <img src={img} alt="avatart" className="avatar" />;
}

export default Avatar;
