const props = { "aria-hidden": true, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.9 };
export function SearchIcon({ className = "size-6" }) { return <svg {...props} className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>; }
export function LocationIcon({ className = "size-5" }) { return <svg {...props} className={className}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>; }
export function ChevronDownIcon({ className = "size-5" }) { return <svg {...props} className={className}><path d="m7 9 5 5 5-5" /></svg>; }
export function HeartIcon({ className = "size-6", filled = false }) { return <svg {...props} className={className} fill={filled ? "currentColor" : "none"}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>; }
export function ArrowRightIcon({ className = "size-5" }) { return <svg {...props} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
