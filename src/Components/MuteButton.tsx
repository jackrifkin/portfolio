const MuteButton = ({
  muted,
  toggleMuted,
}: {
  muted: boolean;
  toggleMuted: () => void;
}) => {
  return (
    <img
      height={"50%"}
      onClick={toggleMuted}
      alt={muted ? "muted" : "unmuted"}
      src={muted ? "muted.png" : "unmuted.png"}
    />
  );
};

export default MuteButton;
