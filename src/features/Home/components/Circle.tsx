type CircleOverlayProps = {
  phase: "idle" | "expanding" | "done";
  nameCircle: string;
  onClick: () => void;
};

function CircleOverlay({ phase, nameCircle, onClick }: CircleOverlayProps) {
  if (phase === "done") {
    return null;
  }

  if (phase === "idle") {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={nameCircle}
          onClick={onClick}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  }

  if (phase === "expanding") {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 9999 }}
      >
        <div
          className="circleFullscreen"
          style={{ pointerEvents: "none" }}
        />
      </div>
    );
  }

  return null;
}
export default CircleOverlay;