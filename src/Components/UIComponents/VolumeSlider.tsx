import { MAX_VOLUME } from "../../Hooks/useBackgroundMusic";

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
    />
  );
};

export default VolumeSlider;
