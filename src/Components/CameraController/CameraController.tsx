import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Euler, Vector3 } from "three";
import { addCameraEventListener } from "../../Util/CameraEventUtil";

type CameraTargetProps = {
  position: Vector3;
  rotation: Vector3;
  elapsed: number;
  duration: number;
};

export const DEFAULT_TRANSITION_DURATION = 1;

const CameraController = () => {
  const { camera } = useThree();
  const [target, setTarget] = useState<CameraTargetProps | null>(null);
  const [orbitEnabled, setOrbitEnabled] = useState<boolean>(true);
  const [lockOrbit, setLockOrbit] = useState<boolean>(false);
  const inTransition = useRef<boolean>(false);
  const initialRotation = useRef<Vector3>(
    new Vector3(-1.3473197, -0.4172199, -1.059652)
  );
  const initialPos = useRef<Vector3>(new Vector3(4.945, 4.3997, 10.3758));

  useEffect(() => {
    const removeFocusListener = addCameraEventListener("focus-camera", (e) => {
      // do not allow new focus if transition is in progress
      if (inTransition.current) return;

      const { position, rotation, transitionDuration, location } = e.detail;
      initialPos.current.copy(camera.position);
      setTarget({
        position: new Vector3(...position),
        rotation: new Vector3(...rotation),
        duration: transitionDuration,
        elapsed: 0,
      });
      setLockOrbit(location !== "home");
    });

    return removeFocusListener;
  }, [camera]);

  useFrame((_, delta) => {
    if (!target) return;

    // starting transition
    if (!inTransition.current) {
      inTransition.current = true;
      initialRotation.current = new Vector3(
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z
      );
      setOrbitEnabled(false);
    }

    const t = Math.min((target.elapsed + delta) / target.duration, 1);
    const newPos = initialPos.current.clone().lerp(target.position, t);
    const newRotation = initialRotation.current
      .clone()
      .lerp(target.rotation, t);

    camera.position.copy(newPos);
    camera.rotation.copy(new Euler(...newRotation));

    if (t >= 1) {
      setTarget(null);
      inTransition.current = false;
      initialPos.current = newPos;
      if (!lockOrbit) {
        setOrbitEnabled(true);
      }
    } else {
      setTarget({ ...target, elapsed: target.elapsed + delta });
    }
  });

  return (
    <OrbitControls
      enabled={orbitEnabled}
      minDistance={11}
      maxDistance={40}
      maxPolarAngle={Math.PI / 2 - 0.1}
      target={[0, 3, 0]}
      enablePan={false}
    />
  );
};

export default CameraController;
