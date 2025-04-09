import { useFBX, useGLTF, useTexture } from "@react-three/drei";
import { modelSources } from "../sources";
import { ModelSource } from "../types";
import { useContext, useEffect, useRef } from "react";
import {
  AnimationMixer,
  Color,
  LoopRepeat,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { useFrame } from "@react-three/fiber";
import { VolumeContext } from "../Contexts/VolumeContext";

// Issues with gltf animations, using FBX for animated models
const AnimatedEmissiveFBXModel = ({ model }: { model: ModelSource }) => {
  const mixer = useRef<AnimationMixer | null>(null);
  const scene = useFBX(`/Models/${model.name}.fbx`);
  const texture = useTexture(`/Textures/${model.texture}`);
  const emissiveMap = useTexture(`/Textures/${model.emissiveMap}`);
  const volume = useContext(VolumeContext);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
          transparent: model.hasTransparency ?? false,
          emissive: new Color(1, 1, 1),
          toneMapped: false,
          emissiveMap: emissiveMap,
        });

        if (model.isAnimated) {
          mixer.current = new AnimationMixer(scene);
          const animationClip = scene.animations?.[0];

          if (mixer.current && animationClip) {
            const action = mixer.current.clipAction(animationClip);
            action.play();
            action.setLoop(LoopRepeat, Infinity);
          }
        }
      }
    });
  }, [
    emissiveMap,
    model.hasTransparency,
    model.isAnimated,
    model.name,
    scene,
    texture,
  ]);

  useFrame((_, delta) => {
    if (volume !== 0) {
      mixer.current?.update(delta);
    }
  });

  return <primitive object={scene} />;
};

const EmissiveModel = ({ model }: { model: ModelSource }) => {
  const mixer = useRef<AnimationMixer>(null);
  const { scene, animations } = useGLTF(`/Models/${model.name}.gltf`);
  const texture = useTexture(`/Textures/${model.texture}`);
  const emissiveMap = useTexture(`/Textures/${model.emissiveMap}`);
  texture.flipY = false;
  emissiveMap.flipY = false;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
          transparent: model.hasTransparency ?? false,
          emissive: new Color(1, 1, 1),
          toneMapped: false,
          emissiveMap: emissiveMap,
        });

        if (model.isAnimated && animations?.length) {
          mixer.current = new AnimationMixer(scene);
          if (mixer.current) {
            const action = mixer.current.clipAction(animations[0]);
            action.play();
            action.setLoop(LoopRepeat, Infinity);
          }
        }
      }
    });
  }, [
    animations,
    emissiveMap,
    model.hasTransparency,
    model.isAnimated,
    model.name,
    scene,
    texture,
  ]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} />;
};

const Model = ({ model }: { model: ModelSource }) => {
  const { scene } = useGLTF(`/Models/${model.name}.gltf`);
  const texture = useTexture(`/Textures/${model.texture}`);
  texture.flipY = false;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = new MeshStandardMaterial({
          map: texture,
          transparent: model.hasTransparency ?? false,
        });
      }
    });
  }, [model.hasTransparency, scene, texture]);

  return <primitive object={scene} />;
};

const SceneModels = () => {
  return modelSources.map((model, index) =>
    model.hasBloom && model.emissiveMap ? (
      model.isAnimated ? (
        <AnimatedEmissiveFBXModel model={model} key={index} />
      ) : (
        <EmissiveModel model={model} key={index} />
      )
    ) : (
      <Model model={model} key={index} />
    )
  );
};

export default SceneModels;
