import "./App.css";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import SceneModels from "./Components/SceneModels";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Outline } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import MuteButton from "./Components/MuteButton";
import { VolumeContext } from "./Contexts/VolumeContext";
import VolumeSlider from "./Components/VolumeSlider";
import { Object3D } from "three";
import { isMobile } from "react-device-detect";

function App() {
  const [playedMusic, setPlayedMusic] = useState<boolean>(false);
  const [clickedPlay, setClickedPlay] = useState<boolean>(false);
  const backgroundMusic = useMemo(() => {
    const music = new Audio("background_music.mp3");
    music.loop = true;
    return music;
  }, []);
  const [prevVolume, setPrevVolume] = useState<number>(0.2);
  const [currentVolume, setCurrentVolume] = useState<number>(0);
  const [landingControlsVisible, setLandingControlsVisible] =
    useState<boolean>(false);
  const hoveredMesh = useRef<Object3D>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setLandingControlsVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    backgroundMusic.volume = currentVolume;
  }, [backgroundMusic, currentVolume]);

  // TODO: for debugging, remove
  useEffect(() => {
    console.log("hoveredMeshUseEffect");
    if (hoveredMesh.current) {
      console.log("hoveredmesh" + hoveredMesh.current.name);
    }
  }, [hoveredMesh]);

  // starts music if not already started
  const playMusic = () => {
    if (!playedMusic) {
      setPlayedMusic(true);
      backgroundMusic.play();
    }
  };

  // mutes the volume
  const toggleMute = () => {
    playMusic();

    if (isMobile) {
      // mobile protocols don't allow web apps to change audio volume
      backgroundMusic.pause();
    } else {
      if (currentVolume === 0 && prevVolume !== 0) {
        setCurrentVolume(prevVolume);
      } else if (currentVolume === 0) {
        setCurrentVolume(prevVolume);
      } else {
        setPrevVolume(currentVolume);
        setCurrentVolume(0);
      }
    }
  };

  // Sets the volume to the provided value
  const setVolume = (val: number) => {
    playMusic();

    if (val === 0) {
      setCurrentVolume(0);
      setPrevVolume(0.2);
    } else {
      setCurrentVolume(val);
      setPrevVolume(val);
    }
  };

  return (
    <VolumeContext.Provider value={currentVolume}>
      {/* Scene */}
      <Canvas
        style={{ visibility: clickedPlay ? "visible" : "hidden" }}
        className="canvas"
        camera={{ position: [5, 3, 10] }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} color={[1, 1, 1.5]} />
          <SceneModels hoverableMeshRef={hoveredMesh} />
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
            <Outline
              selection={hoveredMesh?.current}
              edgeStrength={5}
              visibleEdgeColor={1}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader containerStyles={{ backgroundColor: "black" }} />

      {/* After loader, before models */}
      {landingControlsVisible && (
        <div
          className="fullscreen landing"
          style={clickedPlay ? { opacity: "0%" } : undefined}
        >
          <div className="volume-controls">
            <MuteButton toggleMuted={toggleMute} height={"50vh"} />
            {!isMobile && <VolumeSlider onChange={(n) => setVolume(n)} />}
          </div>
          <button
            className="play-button"
            onClick={() => {
              setClickedPlay(true);
              setTimeout(() => {
                setLandingControlsVisible(false);
              }, 300);
            }}
          >
            Play
          </button>
        </div>
      )}

      {/* In-scene UI */}
      {clickedPlay && (
        <div className="ui-container">
          <div className="volume-controls">
            <MuteButton toggleMuted={toggleMute} height={"35px"} />
            {!isMobile && <VolumeSlider onChange={(n) => setVolume(n)} />}
          </div>
        </div>
      )}
    </VolumeContext.Provider>
  );
}

export default App;
