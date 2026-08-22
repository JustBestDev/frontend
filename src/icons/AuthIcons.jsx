const iconProps = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 1.8 }

export function BrandLogo() {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 8c6.7 8.2 8 14.9 0 21.2C24 22.9 25.3 16.2 32 8Z" /><path fill="currentColor" d="M9.5 27.2c12.5.5 20.1 6.2 20.5 19.3-12.7-.7-20.3-6.5-20.5-19.3Z" /><path fill="currentColor" d="M54.5 27.2C42 27.7 34.4 33.4 34 46.5c12.7-.7 20.3-6.5 20.5-19.3Z" /></svg>
}
export function MailIcon() {
  return <svg viewBox="0 0 24 24" {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
}
export function EyeIcon({ hidden = false }) {
  return <svg viewBox="0 0 24 24" {...iconProps}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" />{hidden && <path d="m4 4 16 16" />}</svg>
}
export function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...iconProps}
      className={className}
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}
export function UserIcon() {
  return <svg viewBox="0 0 24 24" {...iconProps}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
}
export function CalendarIcon() {
  return <svg viewBox="0 0 24 24" {...iconProps}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
}
export function ArrowLeftIcon() {
  return <svg viewBox="0 0 24 24" {...iconProps}><path d="M19 12H5M10 17l-5-5 5-5" /></svg>
}
