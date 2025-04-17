import { Vector3 } from "three";

export type ModelSource = {
  name: string;
  texture: string;
  isHoverable?: boolean;
  hasTransparency?: boolean;
  hasBloom?: boolean;
  emissiveMap?: string;
  isAnimated?: boolean;
};

export type FlyerNames =
  | "projects_flyer"
  | "experience_flyer"
  | "links_flyer"
  | "github_flyer"
  | "linkedin_flyer";

export type CameraEvents = "focus-camera";
export type CameraLocations = "home" | "projects" | "experience" | "links";

interface CameraFocusEventDetails {
  position: Vector3 | [x: number, y: number, z: number];
  lookAt: Vector3 | [x: number, y: number, z: number];
  transitionDuration: number;
  location: CameraLocations;
}

export interface CameraEventMap {
  "focus-camera": CameraFocusEventDetails;
}
