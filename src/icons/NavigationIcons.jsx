const iconProps = {
  "aria-hidden": true,
  className: "size-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.8,
};

export function HomeIcon() {
  return (
    <svg {...iconProps}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function TempleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 21h18" />
      <path d="M5 18h14" />
      <path d="M6 10h12" />
      <path d="M12 3 3 8h18Z" />
      <path d="M7 10v8M12 10v8M17 10v8" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}
