export default function ProgressRing({ percent, size = 18, strokeWidth = 3, showCheck = false }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, percent));
  const offset = circumference * (1 - clamped);
  const mastered = clamped >= 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={"progress-ring" + (mastered ? " mastered" : "")}
      aria-hidden="true"
    >
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" />
      {clamped > 0 && (
        <circle
          className="ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
      {mastered && showCheck && (
        <path
          className="ring-check"
          d={`M ${size * 0.28} ${size * 0.52} L ${size * 0.43} ${size * 0.68} L ${size * 0.74} ${size * 0.32}`}
          fill="none"
          strokeWidth={Math.max(1.5, strokeWidth * 0.85)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
