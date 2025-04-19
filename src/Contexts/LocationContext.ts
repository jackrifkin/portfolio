import { createContext } from "react";
import { CameraLocation } from "../types";

export const LocationContext = createContext<CameraLocation | undefined>(
  "home"
);
