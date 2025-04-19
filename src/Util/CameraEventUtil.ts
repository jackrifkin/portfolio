import { DEFAULT_TRANSITION_DURATION } from "../Components/CameraController/CameraController";
import {
  CameraEventMap,
  CameraEvents,
  CameraLocations,
  FlyerNames,
} from "../types";

const LOCATION_DETAIL_MAP = {
  projects: {
    position: [2.568, 3.4, 3.354],
    lookAt: [3, 3.4, 3.44],
    transitionDuration: DEFAULT_TRANSITION_DURATION,
    location: "projects",
  },
  experience: {
    position: [2.3, 3.4, -2.8],
    lookAt: [2.9, 3.4, -4],
    transitionDuration: DEFAULT_TRANSITION_DURATION,
    location: "experience",
  },
  links: {
    position: [4.24, 4.086, 0.2576],
    lookAt: [4.5, 4.07, 0.2576],
    transitionDuration: DEFAULT_TRANSITION_DURATION,
    location: "links",
  },
  home: {
    position: [4.945, 4.3997, 10.3758],
    lookAt: [0, 3, 0],
    transitionDuration: DEFAULT_TRANSITION_DURATION,
    location: "home",
  },
};

export const dispatchCameraEvent = <T extends CameraEvents>(
  type: T,
  location: CameraLocations,
  durationOverride?: number
): void => {
  const detail = { ...LOCATION_DETAIL_MAP[location] };

  if (durationOverride) {
    detail.transitionDuration = durationOverride;
  }

  const event = detail
    ? new CustomEvent(type, { detail })
    : new CustomEvent(type);
  window.dispatchEvent(event);
};

export const handleFlyerClick = (
  flyerName: FlyerNames,
  externalLink?: string
): void => {
  switch (flyerName) {
    case "experience_flyer":
      dispatchCameraEvent("focus-camera", "experience");
      break;
    case "projects_flyer":
      dispatchCameraEvent("focus-camera", "projects");
      break;
    case "links_flyer":
      dispatchCameraEvent("focus-camera", "links");
      break;
    case "github_flyer":
    case "linkedin_flyer":
      window.open(externalLink, "_blank");
      break;
  }
};

export const addCameraEventListener = <T extends CameraEvents>(
  type: T,
  listener: (event: CustomEvent<CameraEventMap[T]>) => void
): (() => void) => {
  const handler = (e: Event) => {
    listener(e as CustomEvent<CameraEventMap[T]>);
  };
  window.addEventListener(type, handler);
  return () => window.removeEventListener(type, handler);
};
