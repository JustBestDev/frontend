import { Link, useNavigate } from "react-router";
import { LogoutIcon, ProfileIcon } from "../icons/HeaderIcons";
import useUserStore from "../stores/userStore";

const actionClassName =
  "grid min-h-11 min-w-11 place-items-center rounded-full text-[#3B0066] transition hover:bg-[#F6EFF9] hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

function Header() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    // Authentication state/API can be cleared here when it is added to the app.
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full border-[#eee8f1] bg-white shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-screen-md grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 md:px-8">
        <button
          type="button"
          aria-label="Logout"
          className={`${actionClassName} justify-self-start`}
          onClick={handleLogout}
        >
          <LogoutIcon className="size-7" />
        </button>

        <span className="justify-self-center text-2xl font-extrabold tracking-[-0.04em] text-[#3B0066] sm:text-3xl">
          MuMorrow
        </span>

        <Link
          to="/profile"
          aria-label="Go to profile"
          className={`${actionClassName} justify-self-end`}
        >
          <ProfileIcon className="size-7" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
