const MuteButton = ({
  toggleMute: toggleMuted,
  height,
  isMuted,
}: {
  toggleMute: () => void;
  height: string | number;
  isMuted: boolean;
}) => {
  console.log(isMuted);
  return (
    <img
      className="mute-button"
      height={height}
      onClick={toggleMuted}
      alt={isMuted ? "muted" : "unmuted"}
      src={isMuted ? "muted.svg" : "unmuted.svg"}
    />
  );
};

export default MuteButton;
