interface ButtonProps {
  onClick(): void;
  children: React.ReactNode;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <div className="button" onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
