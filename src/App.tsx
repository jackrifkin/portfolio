import { Html, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Models from "./Models";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

// TODO: make better
const Loader = () => {
  return (
    <Html
      as="div"
      fullscreen
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </Html>
  );
};

function App() {
  return (
    <Canvas camera={{ position: [5, 3, 10] }}>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} color={[1, 1, 1.5]} />
        <Models />
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
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default App;
