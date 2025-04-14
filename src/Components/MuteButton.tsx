type MuteButtonProps = {
  toggleMute: () => void;
  height: string | number;
  isMuted: boolean;
} & React.HTMLAttributes<HTMLImageElement>;

const MuteButton = ({
  toggleMute: toggleMuted,
  height,
  isMuted,
  ...props
}: MuteButtonProps) => {
  return (
    <img
      {...props}
      className="mute-button"
      height={height}
      onClick={toggleMuted}
      alt={isMuted ? "muted" : "unmuted"}
      src={isMuted ? "muted.svg" : "unmuted.svg"}
    />
  );
};

export default MuteButton;
