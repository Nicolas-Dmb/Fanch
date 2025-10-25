
import React, { forwardRef } from "react";

interface FallingLetterProps {
  char: string;
  className?: string;
}

const FallingLetter = forwardRef<HTMLSpanElement, FallingLetterProps>(
  ({ char, className = "" }, ref) => {
    return (
      <span
        ref={ref}
        className={
          "inline-block origin-bottom will-change-transform " + className
        }
      >
        {char}
      </span>
    );
  }
);

export default FallingLetter;

