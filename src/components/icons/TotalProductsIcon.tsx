interface IconProps {
  size?: number;
  color?: string;
}

export default function TotalProductsIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 0H0V48H48V0Z" fill="white" fillOpacity="0.01" />
      <path d="M44 14L24 4L4 14V34L24 44L44 34V14Z" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path d="M4 14L24 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 44V24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 14L24 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 9L14 19" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}