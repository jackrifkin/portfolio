import { Vector3 } from "three";

export type ModelSource = {
  name: string;
  texture: string;
  isHoverable?: boolean;
  hasTransparency?: boolean;
  hasBloom?: boolean;
  emissiveMap?: string;
  isAnimated?: boolean;
  externalLink?: string;
};

export type FlyerNames =
  | "projects_flyer"
  | "experience_flyer"
  | "links_flyer"
  | "github_flyer"
  | "linkedin_flyer";

export type CameraEvents = "focus-camera";
export type CameraLocation = "home" | "projects" | "experience" | "links";

interface CameraFocusEventDetails {
  position: Vector3 | [x: number, y: number, z: number];
  rotation: Vector3 | [x: number, y: number, z: number];
  transitionDuration: number;
  location: CameraLocation;
}

export interface CameraEventMap {
  "focus-camera": CameraFocusEventDetails;
}

export type Month = {
  month: number;
  year: number;
};

export type DateRange = {
  start: Month;
  end?: Month;
};

export type Experience = {
  name: string;
  time: DateRange;
  logoFilepath: string;
  description: string;
};
