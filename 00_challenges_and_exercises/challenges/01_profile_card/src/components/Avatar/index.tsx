interface AvatarProps {
  img: string;
  alt: string;
}

function Avatar({ img, alt }: AvatarProps) {
  return <img src={img} alt={alt} className="avatar" />;
}

export default Avatar;
