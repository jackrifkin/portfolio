import { useState } from "react";
import "./UIComponents.css";
import { HOVER_COLOR } from "../../App";

type MuteButtonProps = {
  toggleMute: () => void;
  height: number;
  isMuted: boolean;
};

const MuteButton = ({
  toggleMute: toggleMuted,
  height,
  isMuted,
}: MuteButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      style={{ cursor: "pointer", height: height }}
      onClick={toggleMuted}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isMuted ? (
        <svg
          height={height}
          width={height}
          viewBox="0 0 191 191"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.6716 77.3284L84.1716 40.8284C86.6914 38.3086 91 40.0932 91 43.6569L91 147.42C91 150.973 86.7139 152.762 84.1876 150.264L47.6688 114.156C46.92 113.415 45.9094 113 44.8564 113H26C23.7909 113 22 111.209 22 109V96V82.5C22 80.2909 23.7909 78.5 26 78.5H44.8431C45.904 78.5 46.9214 78.0786 47.6716 77.3284Z"
            fill={hovered ? HOVER_COLOR : "white"}
            stroke={hovered ? HOVER_COLOR : "white"}
          />
          <circle
            cx="95.5"
            cy="95.5"
            r="92"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
          />
          <path
            d="M107 73L152 118"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M107 118L152 73"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          height={height}
          width={height}
          viewBox="0 0 191 191"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.6716 77.3284L84.1716 40.8284C86.6914 38.3086 91 40.0932 91 43.6569L91 147.42C91 150.973 86.7139 152.762 84.1876 150.264L47.6688 114.156C46.92 113.415 45.9094 113 44.8564 113H26C23.7909 113 22 111.209 22 109V96V82.5C22 80.2909 23.7909 78.5 26 78.5H44.8431C45.904 78.5 46.9214 78.0786 47.6716 77.3284Z"
            fill={hovered ? HOVER_COLOR : "white"}
            stroke={hovered ? HOVER_COLOR : "white"}
          />
          <path
            d="M133 142C165 119 166.5 70 133 50"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M121 129C144.447 112.25 145.546 76.5652 121 62"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M111 112C122.724 104 123.273 86.9565 111 80"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle
            cx="95.5"
            cy="95.5"
            r="92"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
          />
        </svg>
      )}
    </div>
  );
  // <img
  //   {...props}
  //   className="mute-button"
  //   height={height}
  //   onClick={toggleMuted}
  //   alt={isMuted ? "muted" : "unmuted"}
  //   src={isMuted ? "muted.svg" : "unmuted.svg"}
  // />
};

export default MuteButton;
