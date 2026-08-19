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
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#eee8f1] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur md:right-auto md:bottom-4 md:left-1/2 md:w-full md:max-w-xl md:-translate-x-1/2 md:rounded-2xl md:border"
    >
      <ul className="grid min-h-[76px] grid-cols-4 items-center px-2 py-2">
        {navItems.map(({ label, path, Icon, end }) => (
          <li key={path} className="h-full">
            <NavLink
              to={path}
              end={end}
              className={({ isActive }) =>
                `mx-auto flex h-full max-w-[88px] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B008E] ${
                  isActive
                    ? "bg-[#5B008E] text-[#E7C8F7]"
                    : "text-[#514A58] hover:bg-[#F6EFF9] hover:text-[#5B008E]"
                }`
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
