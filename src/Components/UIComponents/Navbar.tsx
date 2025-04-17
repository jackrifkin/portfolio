import { useState } from "react";
import Arrow from "../SVGs/arrow";
import "./UIComponents.css";
import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import { CameraLocations } from "../../types";

const NAV_ITEMS = ["Home", "Projects", "Experience", "Links"];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (item: string) => {
    setOpen((o) => !o);
    dispatchCameraEvent("focus-camera", item.toLowerCase() as CameraLocations);
  };

  return (
    <div className="nav-container">
      <h1 className="nav-title special-gothic">Jack Rifkin</h1>
      <div className={`navlist-container  ${open ? "open" : ""}`}>
        <Arrow open={open} onClick={() => setOpen((o) => !o)} />
        <ul className="navlist">
          {NAV_ITEMS.map((item, index) => (
            <li
              onClick={() => handleClick(item)}
              className="nav-item montserrat"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
