import { useState } from "react";
import Star from "../Star";

interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  defaultRating?: number;
  onSetRating?(rating: number): void;
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
};

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: 1,
    margin: "0.3rem",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const handleRating = (rating: number) => {
    setRating(rating);
    onSetRating?.(rating);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span key={crypto.randomUUID()}>
            <Star
              onRate={() => handleRating(i + 1)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverStart={() => setTempRating(i + 1)}
              onHoverEnd={() => setTempRating(0)}
              color={color}
              size={size}
            />
          </span>
        ))}
        <p style={textStyle}>
          {" "}
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
    </div>
  );
}

export default StarRating;
