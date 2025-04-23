import { Suspense, useMemo, useState } from "react";
import { Experience } from "../../types";
import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import { experiences } from "./Content/experience";
import "./UIComponents.css";
import { compareRanges, formatDateRange } from "../../Util/DateUtil";
import Dropdown from "./Dropdown";

const EXPERIENCE_ELEMENTS_PER_PAGE = 5;
const MAX_PAGES = Math.ceil(experiences.length / EXPERIENCE_ELEMENTS_PER_PAGE);

const Fallback = ({ type }: { type: "experience" | "projects" }) => {
  return (
    <div className="fullscreen overlay-container">
      <div className={`${type}-overlay ${type}-fallback`}></div>
    </div>
  );
};

const ExperienceMenuItem = ({
  experience,
  menuSelectable,
  handleClick,
  index,
}: {
  experience: Experience;
  menuSelectable: boolean;
  handleClick: (item: Experience) => void;
  index: number;
}) => {
  return (
    <li
      onClick={() => handleClick(experience)}
      className={`experience-list-item roboto ${
        menuSelectable ? "" : "closed"
      }`}
      key={index}
    >
      <p>{experience.name}</p>
      <p style={{ textAlign: "end" }}>{formatDateRange(experience.time)}</p>
      <img src={experience.logoFilepath} height={"32px"} />
    </li>
  );
};

const ExperienceDetails = ({ experience }: { experience: Experience }) => {
  return (
    <div className="details-container roboto">
      <div className="header-container">
        <div>
          <h1>{experience.name}</h1>
          <h2>{formatDateRange(experience.time, true)}</h2>
        </div>
        <img src={experience.logoFilepath} height={"80px"} />
      </div>
      <p>{experience.description}</p>
    </div>
  );
};

type SortOption = "Relevance" | "Start Date" | "End Date";
const SORT_OPTIONS: SortOption[] = ["Relevance", "Start Date", "End Date"];

export const ExperienceOverlay = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSelection, setCurrentSelection] = useState<Experience | null>(
    null
  );
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const [menuSelectable, setMenuSelectable] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("Relevance");

  const sortedExperiences = useMemo(() => {
    return sortBy === "Relevance"
      ? experiences
      : [...experiences].sort((a, b) =>
          compareRanges(a.time, b.time, sortBy === "Start Date")
        );
  }, [sortBy]);

  const handleMenuElementClick = (element: Experience) => {
    setCurrentSelection(element);
    toggleAnimation();
    setTimeout(() => setMenuVisible(false), 500);
  };

  const handleBackArrowClick = () => {
    toggleAnimation();
    setTimeout(() => {
      setCurrentSelection(null);
      setMenuVisible(true);
    }, 500);
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
    <Suspense fallback={<Fallback type="experience" />}>
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
            {menuVisible && (
              <>
                <Dropdown
                  options={SORT_OPTIONS}
                  onSelect={(option: SortOption) => setSortBy(option)}
                  renderT={(item: SortOption) => item}
                />
                {currentPage !== 0 && (
                  <img
                    onClick={() => setCurrentPage((p) => p - 1)}
                    id="up-arrow"
                    src="/TiVoAssets/upArrow.png"
                    width="50px"
                  />
                )}
                {currentPage !== MAX_PAGES - 1 && (
                  <img
                    onClick={() => setCurrentPage((p) => p + 1)}
                    id="down-arrow"
                    src="/TiVoAssets/downArrow.png"
                    width="50px"
                  />
                )}
                <ul className="experience-list">
                  {sortedExperiences
                    .slice(
                      currentPage * EXPERIENCE_ELEMENTS_PER_PAGE,
                      currentPage * EXPERIENCE_ELEMENTS_PER_PAGE +
                        EXPERIENCE_ELEMENTS_PER_PAGE
                    )
                    .map((e, index) => (
                      <ExperienceMenuItem
                        experience={e}
                        menuSelectable={menuSelectable}
                        handleClick={handleMenuElementClick}
                        index={index}
                      />
                    ))}
                </ul>
              </>
            )}
            {!menuVisible && currentSelection && (
              <>
                <img
                  id="left-arrow"
                  onClick={handleBackArrowClick}
                  src="/TiVoAssets/leftArrow.png"
                  height={"50px"}
                />
                <ExperienceDetails experience={currentSelection} />
              </>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export const ProjectsOverlay = () => {
  return (
    <Suspense fallback={<Fallback type="projects" />}>
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
    </Suspense>
  );
};
