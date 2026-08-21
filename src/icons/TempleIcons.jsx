const props = { "aria-hidden": true, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.9 };
export function SearchIcon({ className = "size-6" }) { return <svg {...props} className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>; }
export function LocationIcon({ className = "size-5" }) { return <svg {...props} className={className}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>; }
export function ChevronDownIcon({ className = "size-5" }) { return <svg {...props} className={className}><path d="m7 9 5 5 5-5" /></svg>; }
export function HeartIcon({ className = "size-6", filled = false }) { return <svg {...props} className={className} fill={filled ? "currentColor" : "none"}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>; }
export function ArrowRightIcon({ className = "size-5" }) { return <svg {...props} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
export function ArrowLeftIcon({ className = "size-6" }) { return <svg {...props} className={className}><path d="m15 18-6-6 6-6" /></svg>; }
export function SparklesIcon({ className = "size-6" }) { return <svg {...props} className={className}><path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z" /><path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2ZM5 13l1 2.8L9 17l-3 1.2L5 21l-1-2.8L1 17l3-1.2L5 13Z" /></svg>; }
export function LeafIcon({ className = "size-6" }) { return <svg {...props} className={className}><path d="M12 21V9" /><path d="M12 13C7 13 4 10 4 5c5 0 8 3 8 8Z" /><path d="M12 17c0-6 3-9 8-9 0 5-3 8-8 9Z" /></svg>; }
export function CalendarIcon({ className = "size-6" }) { return <svg {...props} className={className}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>; }
export function ClockIcon({ className = "size-6" }) { return <svg {...props} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>; }
export function HistoryIcon({ className = "size-6" }) { return <svg {...props} className={className}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></svg>; }
export function RefreshIcon({ className = "size-6" }) { return <svg {...props} className={className}><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 1-2-5" /></svg>; }
export function HomeOutlineIcon({ className = "size-6" }) { return <svg {...props} className={className}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></svg>; }
