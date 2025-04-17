import { useState } from "react";
import "../UIComponents/UIComponents.css";

const Arrow = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <svg
      onClick={() => {
        onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      width="32"
      height="21.45"
      viewBox="0 0 188 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`arrow ${open ? "open" : ""}`}
    >
      <path
        d="M2.98959 56.9896C-0.329864 60.309 -0.329864 65.691 2.98959 69.0104L57.0833 123.104C60.4027 126.424 65.7846 126.424 69.1041 123.104C72.4235 119.785 72.4235 114.403 69.1041 111.083L21.0208 63L69.1041 14.9167C72.4235 11.5973 72.4235 6.21538 69.1041 2.89592C65.7846 -0.423533 60.4027 -0.423533 57.0833 2.89592L2.98959 56.9896ZM179 71.5C183.694 71.5 187.5 67.6944 187.5 63C187.5 58.3056 183.694 54.5 179 54.5V71.5ZM9 63V71.5H179V63V54.5H9V63Z"
        fill={hovered ? "#ee2cf5" : "white"}
      />
    </svg>
  );
};

export default Arrow;
