/** Decorative constellation of dots and connecting lines — suggests a network of relationships, not literal data. */
export function NetworkBg({ className }: { className?: string }) {
  const nodes = [
    [4, 12], [18, 6], [34, 18], [52, 9], [68, 22], [83, 11], [96, 24],
    [10, 40], [28, 52], [46, 38], [64, 50], [80, 42], [94, 55],
    [6, 70], [22, 84], [40, 72], [58, 86], [76, 74], [92, 88],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [0, 7], [1, 8], [2, 9], [3, 10], [4, 11], [5, 12],
    [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
    [7, 13], [8, 14], [9, 15], [10, 16], [11, 17], [12, 18],
    [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--bronze-500)"
          strokeWidth="0.15"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.6" fill="var(--bronze-500)" />
      ))}
    </svg>
  );
}
