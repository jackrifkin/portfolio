import { useContext, useState } from "react";
import Arrow from "../SVGs/arrow";
import "./UIComponents.css";
import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import { CameraLocation } from "../../types";
import { LocationContext } from "../../Contexts/LocationContext";

const NAV_ITEMS: CameraLocation[] = ["home", "projects", "experience", "links"];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const currentLocation = useContext(LocationContext);

  const handleClick = (item: CameraLocation) => {
    setOpen(false);
    // don't allow camera transition if user is trying to navigate to the location
    // they are currently in (unless its "home")
    if (item !== currentLocation || currentLocation === "home") {
      dispatchCameraEvent("focus-camera", item);
    }
  };

  return (
    <div className="nav-container">
      <h1
        onClick={() => handleClick("home")}
        className="nav-title special-gothic"
      >
        Jack Rifkin
      </h1>
      <div className={`navlist-container  ${open ? "open" : ""}`}>
        <Arrow open={open} onClick={() => setOpen((o) => !o)} />
        <ul className="navlist">
          {NAV_ITEMS.map((item, index) => (
            <li
              onClick={() => handleClick(item)}
              className="nav-item montserrat"
              key={index}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
