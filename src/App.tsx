import "./App.css";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import SceneModels from "./Components/SceneModels/SceneModels";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import MuteButton from "./Components/UIComponents/MuteButton";
import VolumeSlider from "./Components/UIComponents/VolumeSlider";
import { isMobile } from "react-device-detect";
import { MutedContext } from "./Contexts/MutedContext";
import useBackgroundMusic from "./Hooks/useBackgroundMusic";
import Info from "./Components/UIComponents/Info";
import Navbar from "./Components/UIComponents/Navbar";

export const HOVER_COLOR = "#ee2cf5";

function App() {
  const { currentVolume, isMuted, setVolume, toggleMute, musicRef } =
    useBackgroundMusic();
  const [clickedPlay, setClickedPlay] = useState<boolean>(false);
  const [landingControlsVisible, setLandingControlsVisible] =
    useState<boolean>(false);

  // give time for the loader to mount
  useEffect(() => {
    setTimeout(() => {
      setLandingControlsVisible(true);
    }, 500);
  }, []);

  const PlayButton = () => {
    return (
      <button
        className="play-button montserrat"
        onClick={() => {
          setClickedPlay(true);
          setTimeout(() => {
            setLandingControlsVisible(false);
          }, 300);
        }}
      >
        Play
      </button>
    );
  };

  return (
    <MutedContext.Provider value={isMuted}>
      <audio loop ref={musicRef} src="background_music.mp3" />
      {/* Scene */}
      <Canvas
        style={{ visibility: clickedPlay ? "visible" : "hidden" }}
        className="canvas"
        camera={{ position: [5, 3, 10] }}
      >
        <Suspense fallback={null}>
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
      <Loader
        containerStyles={{ backgroundColor: "black" }}
        dataInterpolation={(p) => `${p.toFixed(2)}%`}
      />

      {/* After loader, before models */}
      {landingControlsVisible && (
        <div
          className="fullscreen landing"
          style={clickedPlay ? { opacity: "0%" } : undefined}
        >
          <h1 className="title special-gothic">Jack Rifkin</h1>
          <div className="volume-controls" style={{ marginBottom: "24px" }}>
            <MuteButton isMuted={isMuted} toggleMute={toggleMute} height={40} />
            {!isMobile && (
              <VolumeSlider volume={currentVolume} onChange={setVolume} />
            )}
            {isMobile && <PlayButton />}
          </div>
          {!isMobile && <PlayButton />}
        </div>
      )}

      {/* In-scene UI */}
      {clickedPlay && (
        <>
          <div className="ui-container">
            <div className="volume-controls">
              <MuteButton
                isMuted={isMuted}
                toggleMute={toggleMute}
                height={32}
              />
              {!isMobile && (
                <VolumeSlider volume={currentVolume} onChange={setVolume} />
              )}
            </div>
          </div>
          <Navbar />
          <Info />
        </>
      )}
    </MutedContext.Provider>
  );
}

export default App;
