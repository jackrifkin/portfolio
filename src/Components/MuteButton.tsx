import { useContext } from "react";
import { VolumeContext } from "../Contexts/VolumeContext";

const MuteButton = ({
  toggleMuted,
  height,
}: {
  toggleMuted: () => void;
  height: string | number;
}) => {
  const volume = useContext(VolumeContext);

  return (
    <img
      className="mute-button"
      height={height}
      onClick={toggleMuted}
      alt={volume === 0 ? "muted" : "unmuted"}
      src={volume === 0 ? "muted.svg" : "unmuted.svg"}
    />
  );
};

export default MuteButton;
