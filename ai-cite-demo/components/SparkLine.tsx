export default function SparkLine({ points }: { points: number[] }) {
    const max = Math.max(...points);
    const scale = 100 / max;
    const path = points
      .map((y, i) => `${i * 10},${100 - y * scale}`)
      .join(" L ");
    return (
      <svg width={points.length * 10} height={100}>
        <polyline
          fill="none"
          stroke="teal"
          strokeWidth={2}
          points={path}
        />
      </svg>
    );
  }
  