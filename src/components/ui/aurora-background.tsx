export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="aurora-blob"
        style={{
          top: "-10%",
          left: "8%",
          width: "480px",
          height: "480px",
          background: "var(--accent-cyan)",
          animationDuration: "22s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "15%",
          right: "2%",
          width: "420px",
          height: "420px",
          background: "var(--accent-violet)",
          animationDuration: "26s",
          animationDelay: "-6s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: "-15%",
          left: "32%",
          width: "380px",
          height: "380px",
          background: "var(--accent-pink)",
          animationDuration: "24s",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
