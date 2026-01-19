interface IconProps {
  size?: number;
  color?: string;
}

export default function StockIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <path d="M2 20h20" />
      <path d="M4 20v-3" />
      <path d="M20 20v-3" />
      <path d="M12 20v-3" />

      <rect x="3" y="8" width="18" height="9" rx="1" />
      <path d="M12 8v9" />
      <rect x="6" y="3" width="12" height="5" rx="1" />
    </svg>
  );
}