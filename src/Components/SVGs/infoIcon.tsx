import { useState } from "react";
import { HOVER_COLOR } from "../../App";

const InfoIcon = ({
  opened,
  toggleOpened,
  height,
}: {
  opened: boolean;
  toggleOpened: () => void;
  height: number;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      style={{ cursor: "pointer", zIndex: 100, pointerEvents: "auto" }}
      onClick={toggleOpened}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {opened ? (
        <svg
          width={height}
          height={height}
          viewBox="0 0 166 166"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="83"
            cy="83"
            r="79.5"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
          />
          <path
            d="M46 46L121 121"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M46 121L121 46"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="15"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width={height}
          height={height}
          viewBox="0 0 166 166"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="83"
            cy="83"
            r="79.5"
            stroke={hovered ? HOVER_COLOR : "white"}
            strokeWidth="7"
          />
          <path
            d="M82.9085 55.096C80.2632 55.096 78.1298 54.2853 76.5085 52.664C74.8872 50.9573 74.0765 48.7813 74.0765 46.136C74.0765 43.4907 74.8872 41.3573 76.5085 39.736C78.1298 38.1147 80.2632 37.304 82.9085 37.304C85.4685 37.304 87.6018 38.1147 89.3085 39.736C91.0152 41.3573 91.8685 43.4907 91.8685 46.136C91.8685 48.7813 91.0152 50.9573 89.3085 52.664C87.6018 54.2853 85.4685 55.096 82.9085 55.096ZM65.7565 69.688V66.104H90.3325V120.248C90.3325 123.149 90.4605 124.899 90.7165 125.496C90.9725 126.008 91.7832 126.349 93.1485 126.52L100.189 127.416V131H65.7565V127.416L72.7965 126.52C74.1618 126.349 74.9725 126.008 75.2285 125.496C75.4845 124.899 75.6125 123.149 75.6125 120.248V76.856C75.6125 73.9547 75.4845 72.248 75.2285 71.736C74.9725 71.1387 74.1618 70.7547 72.7965 70.584L65.7565 69.688Z"
            fill={hovered ? HOVER_COLOR : "white"}
          />
        </svg>
      )}
    </div>
  );
};

export default InfoIcon;
