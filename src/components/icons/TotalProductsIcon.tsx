interface IconProps {
  size?: number;
  color?: string;
}

export default function TotalProductsIcon({ size = 24, color = "currentColor" }: IconProps) {
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
      <path d="M20.91 8.84L8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.5a2.12 2.12 0 0 0-.09-3.66Z" />
      <path d="M7 6v13.28A2 2 0 0 0 8 21.1a2 2 0 0 0 1.94-1L17 16" />
      <path d="M17 10.85V16" />
    </svg>
  );
}