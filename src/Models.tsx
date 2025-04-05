import "./App.css";
import { useGLTF, useTexture } from "@react-three/drei";
import { modelSources } from "./sources";
import { ModelSource } from "./types";
import { useEffect } from "react";
import { Color, MeshStandardMaterial } from "three";

const EmissiveModel = ({ model }: { model: ModelSource }) => {
  const { scene } = useGLTF(`/Models/${model.name}.gltf`);
  const texture = useTexture(`/Textures/${model.texture}`);
  const emissiveMap = useTexture(`/Textures/${model.emissiveMap}`);
  texture.flipY = false;
  emissiveMap.flipY = false;

  useEffect(() => {
    scene.traverse((child) => {
      // @ts-expect-error: isMesh isn't recognized
      if (child.isMesh) {
        // @ts-expect-error: child.material isn't recognized
        child.material = new MeshStandardMaterial({
          map: texture,
          transparent: model.hasTransparency,
          emissive: new Color(1, 1, 1),
          toneMapped: false,
          emissiveMap: emissiveMap,
        });
      }
    });
  }, [emissiveMap, model.hasTransparency, scene, texture]);

  return <primitive object={scene} />;
};

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
          transparent: model.hasTransparency,
        });
      }
    });
  }, [model.hasTransparency, scene, texture]);

  return <primitive object={scene} />;
};

const Models = () => {
  return modelSources.map((model, index) =>
    model.hasBloom && model.emissiveMap ? (
      <EmissiveModel model={model} key={index} />
    ) : (
      <Model model={model} key={index} />
    )
  );
};

export default Models;
