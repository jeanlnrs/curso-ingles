const COLORS = ["#1d4ed8", "#4ade80", "#15803d", "#fbbf24", "#93c5fd", "#4338ca"];

function randomPiece(i) {
  return {
    left: Math.random() * 100,
    delay: Math.random() * 0.25,
    duration: 0.9 + Math.random() * 0.6,
    rotate: Math.random() * 360,
    color: COLORS[i % COLORS.length],
    drift: (Math.random() - 0.5) * 60,
  };
}

const PIECES = Array.from({ length: 28 }, (_, i) => randomPiece(i));

export default function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
            "--rotate": `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
