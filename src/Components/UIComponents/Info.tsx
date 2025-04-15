import { useState } from "react";
import "./UIComponents.css";
import InfoIcon from "../SVGs/infoIcon";

const Info = () => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div className="info-container">
      <div className={`content-container ${opened ? "open" : ""}`}>
        <InfoIcon
          opened={opened}
          toggleOpened={() => setOpened((o) => !o)}
          height={24}
        />
        <p className="montserrat">
          <a
            target="_blank"
            href="https://licensing.jamendo.com/en/tracks/x8dM27CXqyZ/earth-heaven"
          >
            Earth Heaven by Deep-X
          </a>
          <br />
          Music licensed by Jamendo Licensing:{" "}
          <a target="_blank" href="https://licensing.jamendo.com">
            licensing.jamendo.com
          </a>
          <br />
          <br />© 2025 Jack Rifkin. Licensed under CC BY-NC-SA 4.0.
        </p>
      </div>
    </div>
  );
};

export default Info;
