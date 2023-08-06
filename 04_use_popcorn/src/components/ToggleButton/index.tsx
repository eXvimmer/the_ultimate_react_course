interface ButtonProps {
  isOpen: boolean;
  onToggle?(): void;
}

function ToggleButton({ isOpen, onToggle }: ButtonProps) {
  return (
    <button className="btn-toggle" onClick={onToggle}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

export default ToggleButton;
