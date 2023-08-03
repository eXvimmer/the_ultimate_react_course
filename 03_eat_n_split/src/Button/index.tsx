interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
