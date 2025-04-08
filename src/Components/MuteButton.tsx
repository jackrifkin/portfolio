const MuteButton = ({
  muted,
  toggleMuted,
  height,
}: {
  muted: boolean;
  toggleMuted: () => void;
  height: string | number;
}) => {
  return (
    <img
      height={height}
      onClick={toggleMuted}
      alt={muted ? "muted" : "unmuted"}
      src={muted ? "muted.png" : "unmuted.png"}
    />
  );
};

export default MuteButton;
