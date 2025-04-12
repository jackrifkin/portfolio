import "./App.css";
import { Loader, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import SceneModels from "./Components/SceneModels";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Outline } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import MuteButton from "./Components/MuteButton";
import { VolumeContext } from "./Contexts/VolumeContext";
import VolumeSlider from "./Components/VolumeSlider";
import { Object3D } from "three";
import { isMobile } from "react-device-detect";

export const MAX_VOLUME = 0.4;

function App() {
  const [playedMusic, setPlayedMusic] = useState<boolean>(false);
  const [clickedPlay, setClickedPlay] = useState<boolean>(false);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [prevVolume, setPrevVolume] = useState<number>(MAX_VOLUME / 2);
  const [currentVolume, setCurrentVolume] = useState<number>(
    isMobile ? MAX_VOLUME / 2 : 0
  );
  const [landingControlsVisible, setLandingControlsVisible] =
    useState<boolean>(false);
  const hoveredMesh = useRef<Object3D>(undefined);

  // give time for the loader to mount
  useEffect(() => {
    setTimeout(() => {
      setLandingControlsVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = currentVolume;
    }
  }, [musicRef, currentVolume]);

  // TODO: for debugging, remove
  useEffect(() => {
    console.log("hoveredMeshUseEffect");
    if (hoveredMesh.current) {
      console.log("hoveredmesh" + hoveredMesh.current.name);
    }
  }, [hoveredMesh]);

  // starts music if not already started
  const playMusic = () => {
    if (!playedMusic && musicRef.current) {
      setPlayedMusic(true);
      musicRef.current.play();
    }
  };

  // mutes the volume
  const toggleMute = () => {
    playMusic();

    // mobile protocols don't allow web apps to change audio volume
    if (isMobile) {
      if (musicRef.current) {
        if (musicRef.current.paused) {
          console.log("play");
          musicRef.current.play();
        } else {
          console.log("pause");
          musicRef.current.pause();
        }
      }
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
      setPrevVolume(MAX_VOLUME / 2);
    } else {
      setCurrentVolume(val);
      setPrevVolume(val);
    }
  };

  const isMuted = () => {
    return isMobile ? musicRef.current?.paused ?? true : currentVolume === 0;
  };

  return (
    <VolumeContext.Provider value={currentVolume}>
      <audio loop ref={musicRef} src="background_music.mp3" />
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
            <MuteButton
              isMuted={isMuted()}
              toggleMute={toggleMute}
              height={"40px"}
            />
            {!isMobile && <VolumeSlider onChange={setVolume} />}
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
            <MuteButton
              isMuted={isMuted()}
              toggleMute={toggleMute}
              height={"32px"}
            />
            {!isMobile && <VolumeSlider onChange={setVolume} />}
          </div>
        </div>
      )}
    </VolumeContext.Provider>
  );
}

export default App;
