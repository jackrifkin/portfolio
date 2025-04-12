import { createContext } from "react";
import { MAX_VOLUME } from "../App";

export const VolumeContext = createContext(MAX_VOLUME / 2);
