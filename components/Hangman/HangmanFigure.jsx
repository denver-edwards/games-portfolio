export default function Hangman({ wrongTries }) {
  return (
    <svg height="250" width="200" className="hangman-figure">
      {/* Base */}
      <line
        x1="10"
        y1="230"
        x2="100"
        y2="230"
        style={{ stroke: "black", strokeWidth: 2 }}
      />
      <line
        x1="60"
        y1="20"
        x2="60"
        y2="230"
        style={{ stroke: "black", strokeWidth: 2 }}
      />
      <line
        x1="60"
        y1="20"
        x2="150"
        y2="20"
        style={{ stroke: "black", strokeWidth: 2 }}
      />
      <line
        x1="150"
        y1="20"
        x2="150"
        y2="50"
        style={{ stroke: "black", strokeWidth: 2 }}
      />

      {/* Head */}
      {wrongTries > 0 && (
        <circle
          cx="150"
          cy="70"
          r="20"
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      )}
      {/* Body */}
      {wrongTries > 1 && (
        <line
          x1="150"
          y1="90"
          x2="150"
          y2="150"
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      )}
      {/* Left Arm */}
      {wrongTries > 2 && (
        <line
          x1="150"
          y1="110"
          x2="120"
          y2="90"
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      )}
      {/* Right Arm */}
      {wrongTries > 3 && (
        <line
          x1="150"
          y1="110"
          x2="180"
          y2="90"
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      )}
      {/* Left Leg */}
      {wrongTries > 4 && (
        <line
          x1="150"
          y1="150"
          x2="120"
          y2="180"
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      )}
      {/* Right Leg */}
      {wrongTries > 5 && (
        <line
          x1="150"
          y1="150"
          x2="180"
          y2="180"
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      )}
    </svg>
  );
}
