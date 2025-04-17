import { Html } from "@react-three/drei";
import "./TVScreens.css";
import { useState } from "react";
import { dispatchCameraEvent } from "../../Util/CameraEventUtil";
import { isMobile } from "react-device-detect";

type TVTitleScreenProps = {
  meshPosition: [x: number, y: number, z: number];
  meshRotation: [x: number, y: number, z: number];
  htmlPosition: [x: number, y: number, z: number];
  text: string;
  hoverColor: string;
};

const TVTitleScreen = ({
  meshPosition,
  meshRotation,
  htmlPosition,
  text,
  hoverColor,
}: TVTitleScreenProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const handleClick = () => {
    dispatchCameraEvent(
      "focus-camera",
      text === "PROJECTS" ? "projects" : "experience"
    );
  };

  return (
    <mesh position={meshPosition} rotation={meshRotation}>
      <planeGeometry args={[1.6, 1.5]} />
      <meshStandardMaterial
        color={hovered ? hoverColor : "white"}
        emissive={[0.5, 0.5, 1]}
        emissiveIntensity={hovered ? 1.2 : 0.9}
      />
      <Html transform occlude position={htmlPosition}>
        <div
          className="tv-title-container"
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <h1 className="tv-title special-gothic">{text}</h1>
        </div>
      </Html>
    </mesh>
  );
};

const TVScreens = () => {
  return (
    <>
      {/* WORK EXPERIENCE TV SCREEN */}
      <TVTitleScreen
        meshPosition={[2.93, 3.37, -4.15]}
        meshRotation={[0, -Math.PI / 6.4, 0]}
        htmlPosition={[0, 0.05, 0.111]}
        text="EXPERIENCE"
        hoverColor="#fa6eff"
      />
      {/* PROJECTS TV SCREEN */}
      <TVTitleScreen
        meshPosition={[3.9, 3.37, 3.6]}
        meshRotation={[0, -Math.PI / 1.77, 0]}
        htmlPosition={[isMobile ? -0.4 : 0, 0.05, 0.1]}
        text="PROJECTS"
        hoverColor="#00e3fc"
      />
    </>
  );
};

export default TVScreens;
