import { useState } from "react";
import Arrow from "../SVGs/arrow";
import "./UIComponents.css";

const NAV_ITEMS = ["Home", "Projects", "Experience", "Links"];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="nav-container">
      <h1 className="nav-title special-gothic">Jack Rifkin</h1>
      <div className={`navlist-container  ${open ? "open" : ""}`}>
        <Arrow onClick={() => setOpen((o) => !o)} />
        <ul className="navlist">
          {NAV_ITEMS.map((item, index) => (
            <li className="nav-item montserrat" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
