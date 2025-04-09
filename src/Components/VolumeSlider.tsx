import { useContext } from "react";
import { VolumeContext } from "../Contexts/VolumeContext";

const VolumeSlider = ({ onChange }: { onChange: (val: number) => void }) => {
  const volume = useContext(VolumeContext);

  return (
    <input
      type="range"
      min="0"
      max="0.4"
      step={0.02}
      value={volume}
      onChange={(e) => onChange(+e.target.value)}
    />
  );
};

export default VolumeSlider;
