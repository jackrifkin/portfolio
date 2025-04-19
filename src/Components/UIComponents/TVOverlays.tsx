import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import "./UIComponents.css";

export const ExperienceOverlay = () => {
  return (
    <div className="fullscreen overlay-container">
      <div className="experience-overlay"></div>
    </div>
  );
};

export const ProjectsOverlay = () => {
  return (
    <div className="fullscreen overlay-container">
      <div className="projects-overlay">
        <img src="/SVGAssets/wiiMenuTopBar.svg" width={"100%"} />
        <button
          onClick={() => dispatchCameraEvent("focus-camera", "home")}
          className="exit-button montserrat"
        >
          EXIT
        </button>
        <div className="arrow-buttons">
          <img src="/SVGAssets/wiiArrowLeft.svg" width={"24px"} />
          <img src="/SVGAssets/wiiArrowRight.svg" width={"24px"} />
        </div>
        <div className="wii-button-container">
          <div className="wii-button montserrat">Demo</div>
          <div className="wii-button montserrat">GitHub</div>
        </div>
      </div>
    </div>
  );
};
