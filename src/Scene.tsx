import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { modelSources } from "./sources";
import { ModelSource } from "./types";

const Model = ({ model }: { model: ModelSource }) => {
  const gltf = useGLTF(`/${model.name}.gltf`);

  console.log(`rendering: ${model.name}`);
  return (
    <>
      <primitive object={gltf.scene} />
    </>
  );
};

const Models = () => {
  return (
    <>
      {modelSources.map((model, index) => (
        <Model key={index} model={model} />
      ))}
    </>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={0.5} />
      <Models />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
