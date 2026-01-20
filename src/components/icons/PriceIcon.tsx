interface IconProps {
  size?: number;
  color?: string;
}

export default function PriceIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 11.172V5a2 2 0 0 1 2-2h6.172a2 2 0 0 1 1.414.586l8 8a2 2 0 0 1 0 2.828l-6.172 6.172a2 2 0 0 1-2.828 0l-8-8A2 2 0 0 1 3 11.172zM7 7h.001" />
    </svg>
  );
}