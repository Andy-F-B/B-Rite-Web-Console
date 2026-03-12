export function BRLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="4" fill="#0a0a0a" stroke="#22c55e" strokeWidth="1" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill="#22c55e"
        fontFamily="monospace"
        fontSize="14"
        fontWeight="700"
      >
        BR
      </text>
    </svg>
  )
}
