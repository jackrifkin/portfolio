import { useState } from "react";
import { Experience, formatDateRange } from "../../types";
import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import { experiences } from "./Content/experience";
import "./UIComponents.css";

const EXPERIENCE_ELEMENTS_PER_PAGE = 5;
const MAX_PAGES = Math.ceil(experiences.length / EXPERIENCE_ELEMENTS_PER_PAGE);

export const ExperienceOverlay = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSelection, setCurrentSelection] = useState<Experience | null>(
    null
  );
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const [menuSelectable, setMenuSelectable] = useState<boolean>(true);

  const handleMenuElementClick = (element: Experience) => {
    setCurrentSelection(element);
    toggleAnimation();
    setTimeout(() => setMenuVisible(false), 500);
  };

  const handleBackArrowClick = () => {
    setCurrentSelection(null);
    toggleAnimation();
    setTimeout(() => setMenuVisible(true), 500);
  };

  const toggleAnimation = () => {
    setShouldAnimate(true);
    setMenuSelectable(false);
    setTimeout(() => {
      setShouldAnimate(false);
      setMenuSelectable(true);
    }, 1000);
  };

  return (
    <div className="fullscreen overlay-container">
      <div className="experience-overlay roboto">
        <img id="experience-float-1" src="/TiVoAssets/Experience.png" />
        <img id="experience-float-2" src="/TiVoAssets/Experience.png" />
        <img id="work-float" src="/TiVoAssets/Work.png" />
        <div className="tivo-header">
          <img
            className="tivo-logo"
            src="/TiVoAssets/tivo_logo.svg"
            width={"96px"}
          />
          <div className="tivo-title-container">
            <h1 className="tivo-title roboto">Experience</h1>
          </div>
        </div>
        <div className={`tivo-menu-body ${shouldAnimate ? "animate" : ""}`}>
          {menuVisible && currentPage !== 0 && (
            <img
              onClick={() => setCurrentPage((p) => p - 1)}
              id="up-arrow"
              src="/TiVoAssets/upArrow.png"
              width={"50px"}
            />
          )}
          {menuVisible && currentPage !== MAX_PAGES - 1 && (
            <img
              onClick={() => setCurrentPage((p) => p + 1)}
              id="down-arrow"
              src="/TiVoAssets/downArrow.png"
              width={"50px"}
            />
          )}
          {menuVisible && (
            <ul className="experience-list">
              {experiences
                .slice(
                  currentPage * EXPERIENCE_ELEMENTS_PER_PAGE,
                  currentPage * EXPERIENCE_ELEMENTS_PER_PAGE +
                    EXPERIENCE_ELEMENTS_PER_PAGE
                )
                .map((e) => {
                  return (
                    <li
                      onClick={() => handleMenuElementClick(e)}
                      className={`experience-list-item roboto ${
                        menuSelectable ? "" : "closed"
                      }`}
                      key={e.id}
                    >
                      <p>{e.name}</p>
                      <p style={{ textAlign: "end" }}>
                        {formatDateRange(e.time)}
                      </p>
                      <img src={e.logoFilepath} height={"32px"} />
                    </li>
                  );
                })}
            </ul>
          )}
          {!menuVisible && currentSelection && (
            <div>
              <img
                id="left-arrow"
                onClick={handleBackArrowClick}
                src="/TiVoAssets/leftArrow.png"
                height={"50px"}
              />
              {currentSelection.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectsOverlay = () => {
  return (
    <div className="fullscreen overlay-container">
      <div className="projects-overlay">
        <img src="/WiiUIAssets/wiiMenuTopBar.svg" width={"100%"} />
        <button
          onClick={() => dispatchCameraEvent("focus-camera", "home")}
          className="exit-button montserrat"
        >
          EXIT
        </button>
        <div className="arrow-buttons">
          <img src="/WiiUIAssets/wiiArrowLeft.svg" width={"24px"} />
          <img src="/WiiUIAssets/wiiArrowRight.svg" width={"24px"} />
        </div>
        <div className="wii-button-container">
          <div className="wii-button montserrat">Demo</div>
          <div className="wii-button montserrat">GitHub</div>
        </div>
      </div>
    </div>
  );
};
