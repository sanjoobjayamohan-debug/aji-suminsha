import React from 'react';

interface CirkkleLogoProps {
  className?: string;
  height?: number | string;
  fill?: string;
}

export const CirkkleLogo: React.FC<CirkkleLogoProps> = ({
  className = "h-6 w-auto",
  height,
  fill = "currentColor",
}) => {
  return (
    <svg
      viewBox="0 0 540 160"
      className={className}
      style={height ? { height } : undefined}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="cirkkle"
    >
      <text
        x="10"
        y="122"
        fontFamily="'Plus Jakarta Sans', 'Montserrat', 'Outfit', sans-serif"
        fontWeight="800"
        fontSize="130"
        letterSpacing="-3px"
        fill={fill}
      >
        cirkkle
      </text>
    </svg>
  );
};

export default CirkkleLogo;
