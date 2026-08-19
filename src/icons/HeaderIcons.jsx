const sharedProps = {
  "aria-hidden": true,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.8,
};

export function LogoutIcon({ className = "" }) {
  return (
    <svg className={className} {...sharedProps}>
      <path d="M10 17l-5-5 5-5" />
      <path d="M5 12h10" />
      <path d="M14 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

export function ProfileIcon({ className = "" }) {
  return (
    <svg className={className} {...sharedProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.8 19.3a5.5 5.5 0 0 1 10.4 0" />
    </svg>
  );
}
