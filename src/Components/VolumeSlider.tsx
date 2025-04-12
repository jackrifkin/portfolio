import { useContext } from "react";
import { VolumeContext } from "../Contexts/VolumeContext";
import { MAX_VOLUME } from "../App";

const VolumeSlider = ({ onChange }: { onChange: (val: number) => void }) => {
  const volume = useContext(VolumeContext);

  return (
    <input
      type="range"
      min={0}
      max={MAX_VOLUME}
      step={MAX_VOLUME / 20}
      value={volume}
      onChange={(e) => onChange(+e.target.value)}
    />
  );
};

export default VolumeSlider;
