import { MAX_VOLUME } from "../../Hooks/useBackgroundMusic";
import "./VolumeSlider.css";

const VolumeSlider = ({
  volume,
  onChange,
}: {
  volume: number;
  onChange: (val: number) => void;
}) => {
  return (
    <input
      type="range"
      min={0}
      max={MAX_VOLUME}
      step={MAX_VOLUME / 20}
      value={volume}
      onChange={(e) => onChange(+e.target.value)}
      className="volume-slider"
    />
  );
};

export default VolumeSlider;
