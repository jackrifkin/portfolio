import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { modelSources } from "./sources";
import { ModelSource } from "./types";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";

const Model = ({ model }: { model: ModelSource }) => {
  const { scene } = useGLTF(`/Models/${model.name}.gltf`);
  const texture = useTexture(`/Textures/${model.texture}`);
  texture.flipY = false;

  useEffect(() => {
    scene.traverse((child) => {
      // @ts-expect-error: isMesh isn't recognized
      if (child.isMesh) {
        // @ts-expect-error: child.material isn't recognized
        child.material = new MeshStandardMaterial({
          map: texture,
          // transparent: model.hasTransparency || false,
          // alphaMap: model.hasTransparency ? texture : null,
        });
      }
    });
  }, [model.hasTransparency, model.name, scene, texture]);

  return <primitive object={scene} />;
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
      <ambientLight intensity={0.3} color={[1, 1, 1]} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.5}
        color={[1.2, 1, 1]}
      />
      <Models />
      <OrbitControls />
      <color attach="background" args={["#000"]} />
    </Canvas>
  );
};

export default Scene;
