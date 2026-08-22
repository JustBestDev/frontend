import { NavLink } from "react-router";
import {
  HeartIcon,
  HomeIcon,
  TempleIcon,
  UserIcon,
} from "../icons/NavigationIcons";

const navItems = [
  { label: "Home", path: "/", Icon: HomeIcon, end: true },
  { label: "Temples", path: "/temples", Icon: TempleIcon },
  { label: "Favorites", path: "/favorites", Icon: HeartIcon },
  { label: "Profile", path: "/profile", Icon: UserIcon },
];

function BottomNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#eee8f1] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur 
      md:top-60
    md:right-auto
    md:bottom-auto
    md:left-5
    md:w-24
    md:-translate-y-1/2
    md:rounded-2xl
    md:border
    md:pb-0
    md:shadow-[0_10px_30px_rgba(61,28,73,0.08)]"
    >
      <ul className="grid min-h-19 grid-cols-4 items-center px-2 py-2 md:min-h-0 md:grid-cols-1 md:gap-2 md:p-2">
        {navItems.map(({ label, path, Icon, end }) => (
          <li key={path} className="h-full md:w-full">
            <NavLink
  to={path}
  end={end}
  className={({ isActive }) =>
    `mx-auto flex h-full max-w-22 items-center justify-center rounded-2xl px-2 py-2 text-xs font-medium transition-colors duration-200
    md:flex-col md:gap-1
    ${
      isActive
        ? "bg-[#5B008E] text-[#E7C8F7]"
        : "text-[#514A58] hover:bg-[#F6EFF9] hover:text-[#5B008E]"
    }`
  }
>
  <Icon />
  <span className="hidden md:inline">{label}</span>
</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
