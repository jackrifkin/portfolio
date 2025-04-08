import "./App.css";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import SceneModels from "./Components/SceneModels";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import MuteButton from "./Components/MuteButton";
import { MutedContext } from "./Contexts/MutedContext";

const LOADER_FADE_DURATION = 500; // in ms

type LoaderProps = {
  onFinish: () => void;
  beforeFinish: () => void;
  finishDelay: number;
};

const Loader = ({ onFinish, beforeFinish, finishDelay }: LoaderProps) => {
  useEffect(() => {
    beforeFinish();
    setTimeout(() => {
      onFinish();
    }, finishDelay);
  }, [beforeFinish, finishDelay, onFinish]);

  return null;
};

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [clickedPlay, setClickedPlay] = useState<boolean>(false);
  const [shouldFadeOutLoader, setShouldFadeOutLoader] =
    useState<boolean>(false);
  const [musicMuted, setMusicMuted] = useState<boolean>(true);
  const backgroundMusic = useMemo(() => {
    const music = new Audio("background_music.mp3");
    music.loop = true;
    return music;
  }, []);

  useEffect(() => {
    if (musicMuted) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
  }, [backgroundMusic, musicMuted]);

  return (
    <MutedContext.Provider value={musicMuted}>
      <Canvas
        style={{ visibility: clickedPlay ? "visible" : "hidden" }}
        className="canvas"
        camera={{ position: [5, 3, 10] }}
      >
        <Suspense
          fallback={
            <Loader
              onFinish={() => setLoaded(true)}
              beforeFinish={() => setShouldFadeOutLoader(true)}
              finishDelay={LOADER_FADE_DURATION}
            />
          }
        >
          <ambientLight intensity={0.6} color={[1, 1, 1.5]} />
          <SceneModels />
          <OrbitControls
            minDistance={11}
            maxDistance={40}
            maxPolarAngle={Math.PI / 2 - 0.1}
            target={[0, 3, 0]}
            enablePan={false}
          />
          <color attach="background" args={["#000"]} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.5}
              intensity={2}
              kernelSize={KernelSize.VERY_LARGE}
              luminanceSmoothing={0.5}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Loader */}
      {!loaded && (
        <div
          className="fullscreen loader"
          style={
            shouldFadeOutLoader
              ? {
                  opacity: "0%",
                  transitionDuration: `${LOADER_FADE_DURATION}ms`,
                }
              : undefined
          }
        >
          <p>Loading...</p>
        </div>
      )}

      {/* After loader, before models */}
      {loaded && !clickedPlay && (
        <div className="fullscreen landing">
          <h1>
            NOTE: This site is a work in progress and not yet fully functional
            :)
          </h1>
          <MuteButton
            muted={musicMuted}
            toggleMuted={() => setMusicMuted(!musicMuted)}
            height={"75vh"}
          />
          <button className="play-button" onClick={() => setClickedPlay(true)}>
            Start
          </button>
        </div>
      )}

      {/* In-scene UI */}
      {loaded && clickedPlay && (
        <div className="ui-container">
          <MuteButton
            muted={musicMuted}
            toggleMuted={() => setMusicMuted(!musicMuted)}
            height={"50%"}
          />
        </div>
      )}
    </MutedContext.Provider>
  );
}

export default App;
