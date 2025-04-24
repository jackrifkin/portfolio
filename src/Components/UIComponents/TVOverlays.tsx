import { Suspense, useMemo, useRef, useState } from "react";
import { Experience, Project } from "../../types";
import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import { experiences } from "./Content/experience";
import "./UIComponents.css";
import { compareRanges, formatDateRange } from "../../Util/DateUtil";
import Dropdown from "./Dropdown";
import { projects } from "./Content/projects";

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
      <img alt={experience.logoFilepath} src={experience.logoFilepath} />
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
        <img alt={experience.logoFilepath} src={experience.logoFilepath} />
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
  const selectAudioRef = useRef<HTMLAudioElement | null>(null);
  const backAudioRef = useRef<HTMLAudioElement | null>(null);
  const boopAudioRef = useRef<HTMLAudioElement | null>(null);

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
    if (selectAudioRef.current) {
      selectAudioRef.current.play();
    }
    setTimeout(() => setMenuVisible(false), 500);
  };

  const handleBackArrowClick = () => {
    toggleAnimation();
    if (backAudioRef.current) {
      backAudioRef.current.play();
    }
    setTimeout(() => {
      setCurrentSelection(null);
      setMenuVisible(true);
    }, 500);
  };

  const handlePageArrowClick = (direction: -1 | 1) => {
    setCurrentPage((p) => p + direction);
    if (boopAudioRef.current) {
      boopAudioRef.current.play();
    }
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
      <audio
        ref={selectAudioRef}
        src="/TiVoAssets/TiVo_select.mp3"
        preload="auto"
        loop={false}
      />
      <audio
        ref={backAudioRef}
        src="/TiVoAssets/TiVo_back.mp3"
        preload="auto"
        loop={false}
      />
      <audio
        ref={boopAudioRef}
        src="/TiVoAssets/TiVo_boop.mp3"
        preload="auto"
        loop={false}
      />
      <div className="fullscreen overlay-container">
        <div className="experience-overlay roboto">
          <img
            alt="experience"
            id="experience-float-1"
            src="/TiVoAssets/Experience.png"
          />
          <img
            alt="experience"
            id="experience-float-2"
            src="/TiVoAssets/Experience.png"
          />
          <img alt="work" id="work-float" src="/TiVoAssets/Work.png" />
          <div className="tivo-header">
            <img
              alt="tivo-logo"
              className="tivo-logo"
              src="/TiVoAssets/tivo_logo.svg"
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
                    alt="up-arrow"
                    onClick={() => handlePageArrowClick(-1)}
                    id="up-arrow"
                    src="/TiVoAssets/upArrow.png"
                    width="50px"
                  />
                )}
                {currentPage !== MAX_PAGES - 1 && (
                  <img
                    alt="down-arrow"
                    onClick={() => handlePageArrowClick(1)}
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
                  alt="back-arrow"
                  id="left-arrow"
                  onClick={handleBackArrowClick}
                  src="/TiVoAssets/leftArrow.png"
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

const NUM_ROWS = 7;
const LOGOS_PER_ROW = 8;

const FloatingLogos = ({ logos }: { logos: string[] }) => {
  return (
    <div className="floating-logos">
      {Array.from({ length: NUM_ROWS }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="logo-row"
          style={{
            height: `${100 / (NUM_ROWS - 2)}%`,
            width: `100%`,
          }}
        >
          {Array.from({ length: LOGOS_PER_ROW }).map((_, colIndex) => {
            return (
              <img
                key={rowIndex * LOGOS_PER_ROW + colIndex}
                src={
                  logos[
                    rowIndex % 2 === 1
                      ? (colIndex + 1) % logos.length
                      : colIndex % logos.length
                  ]
                }
                height={45}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const ProjectsOverlay = () => {
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);

  const handleArrowClick = (moveRight: boolean) => {
    const nextIndex = moveRight
      ? (currentProjectIndex + 1) % projects.length
      : (currentProjectIndex - 1 + projects.length) % projects.length;

    setCurrentProjectIndex(nextIndex);
    setCurrentProject(projects[nextIndex]);
  };

  return (
    <Suspense fallback={<Fallback type="projects" />}>
      <div className="fullscreen overlay-container">
        <div className="projects-overlay">
          {/* CONTENT */}
          <div
            style={{
              color: currentProject.textColor,
              backgroundImage: currentProject.backgroundImage
                ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentProject.backgroundImage})`
                : "none",
              backgroundColor: currentProject.backgroundColor ?? "white",
            }}
            className="project-content-container montserrat"
          >
            <h1>{currentProject.name}</h1>
            <p style={{ fontWeight: 500 }}>
              {formatDateRange(currentProject.time, true)}
            </p>
            <p>{currentProject.description}</p>
            {currentProject.backgroundLogos?.length && (
              <FloatingLogos logos={currentProject.backgroundLogos} />
            )}
          </div>

          {/* TOP BAR + NAVIGATION */}
          <img
            alt="projects-top-bar"
            id="projects-top-bar"
            src="/WiiUIAssets/wiiMenuTopBar.svg"
            width={"100%"}
          />
          <button
            onClick={() => dispatchCameraEvent("focus-camera", "home")}
            className="exit-button montserrat"
          >
            EXIT
          </button>
          <div className="arrow-buttons">
            <img
              alt="left-arrow"
              onClick={() => handleArrowClick(false)}
              src="/WiiUIAssets/wiiArrowLeft.svg"
              width={"24px"}
            />
            <img
              alt="right-arrow"
              onClick={() => handleArrowClick(true)}
              src="/WiiUIAssets/wiiArrowRight.svg"
              width={"24px"}
            />
          </div>

          {/* BUTTONS */}
          <div className="wii-button-container">
            {currentProject.button1 && (
              <a
                className="wii-button montserrat"
                href={currentProject.button1.link}
                target="_blank"
              >
                {currentProject.button1.label}
              </a>
            )}
            {currentProject.button2 && (
              <a
                className="wii-button montserrat"
                href={currentProject.button2.link}
                target="_blank"
              >
                {currentProject.button2.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};
