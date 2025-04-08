import { useGLTF, useTexture } from "@react-three/drei";
import { ModelSource } from "../types";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";

const LoadingModel = ({ model }: { model: ModelSource }) => {
  const { scene } = useGLTF(`/Models/${model.name}.gltf`);
  const texture = useTexture(`/Textures/${model.texture}`);
  texture.flipY = false;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
        });
      }
    });
  }, [model.hasTransparency, scene, texture]);

  return <primitive object={scene} />;
};

export default LoadingModel;
