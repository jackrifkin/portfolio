import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { addCameraEventListener } from "../../Util/CameraEventUtil";

type TargetProps = {
  position: Vector3;
  lookAt: Vector3;
  elapsed: number;
  duration: number;
};

export const DEFAULT_TRANSITION_DURATION = 0.5;

const CameraController = () => {
  const cameraRef = useRef(null);
  const { camera } = useThree();
  const [target, setTarget] = useState<TargetProps | null>(null);
  const [orbitEnabled, setOrbitEnabled] = useState<boolean>(true);
  const [lockOrbit, setLockOrbit] = useState<boolean>(false);
  const inTransition = useRef<boolean>(false);
  const initialLookAt = useRef<Vector3>(new Vector3(0, 3, 0));
  const initialPos = useRef<Vector3>(new Vector3(4.945, 4.3997, 10.3758));

  useEffect(() => {
    const removeFocusListener = addCameraEventListener("focus-camera", (e) => {
      // do not allow new focus if transition is in progress
      if (inTransition.current) return;

      const { position, lookAt, transitionDuration, location } = e.detail;
      initialPos.current.copy(camera.position);
      setTarget({
        position: new Vector3(...position),
        lookAt: new Vector3(...lookAt),
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
      setOrbitEnabled(false);
    }

    const t = Math.min((target.elapsed + delta) / target.duration, 1);
    const newPos = initialPos.current.clone().lerp(target.position, t);
    const newLookAt = initialLookAt.current.clone().lerp(target.lookAt, t);

    camera.position.copy(newPos);
    camera.lookAt(newLookAt);

    if (t >= 1) {
      setTarget(null);
      inTransition.current = false;
      initialLookAt.current = newLookAt;
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
      ref={cameraRef}
      minDistance={11}
      maxDistance={40}
      maxPolarAngle={Math.PI / 2 - 0.1}
      target={[0, 3, 0]}
      enablePan={false}
    />
  );
};

export default CameraController;
