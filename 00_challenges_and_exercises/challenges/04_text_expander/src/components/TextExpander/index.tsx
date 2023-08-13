import { useState } from "react";

interface TextExpanderProps {
  children: string;
  collapsedNumWords?: number;
  expandedButtonText?: string;
  collapsedButtonText?: string;
  buttonColor?: string;
  expanded?: boolean;
  className?: string;
}

function TextExpander({
  children,
  collapsedNumWords = 10,
  expandedButtonText = "Show More",
  collapsedButtonText = "Show Less",
  buttonColor = "#1f09cd",
  expanded: shouldExpand = false,
  className = "",
}: TextExpanderProps) {
  const [expanded, setExpanded] = useState(shouldExpand);

  return (
    <div className={className}>
      <span>
        {expanded
          ? children
          : children.split(" ").slice(0, collapsedNumWords).join(" ") + "..."}
      </span>
      <button
        style={{
          color: buttonColor,
          background: "none",
          border: "none",
          font: "inherit",
          cursor: "pointer",
          marginLeft: "6px",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? collapsedButtonText : expandedButtonText}
      </button>
    </div>
  );
}

export default TextExpander;
