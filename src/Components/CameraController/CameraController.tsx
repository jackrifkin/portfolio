import { OrbitControls } from "@react-three/drei";

const CameraController = () => {
  return (
    <OrbitControls
      // minDistance={11}
      // maxDistance={40}
      maxPolarAngle={Math.PI / 2 - 0.1}
      target={[0, 3, 0]}
      // enablePan={false}
    />
  );
};

export default CameraController;
