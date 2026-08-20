import { Link, useNavigate } from "react-router";
import { LogoutIcon, ProfileIcon } from "../icons/HeaderIcons";
import useUserStore from "../stores/userStore";

const actionClassName =
  "grid min-h-11 min-w-11 place-items-center rounded-full text-[#3B0066] transition hover:bg-[#F6EFF9] hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

function Header() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);

  const handleLogout = () => {
    // Authentication state/API can be cleared here when it is added to the app.
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full border-[#eee8f1] bg-white shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-screen-md grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 md:px-8">
        {user ? (
          <button
            type="button"
            aria-label="Logout"
            className={`${actionClassName} justify-self-start`}
            onClick={handleLogout}
          >
            <LogoutIcon className="size-7" />
          </button>
        ) : (
          <Link
            className="inline-flex h-10 w-fit items-center justify-self-start rounded-full px-5 bg-[#3B0066] text-sm font-medium text-white shadow-[0_10px_25px_rgba(67,0,107,.16)] transition hover:-translate-y-px hover:bg-[#560087] hover:shadow-[0_13px_28px_rgba(67,0,107,.23)]"
            to="/login"
          >
            เข้าสู่ระบบ
          </Link>
        )}

        <span className="justify-self-center text-2xl font-extrabold tracking-[-0.04em] text-[#3B0066] sm:text-3xl">
          MuMorrow
        </span>

        {user ? (
          <Link
            to="/profile"
            aria-label="Go to profile"
            className={`${actionClassName} justify-self-end`}
          >
            <ProfileIcon className="size-7" />
          </Link>
        ) : (
          <p className={`${actionClassName} border px-4 justify-self-end`}>Guest</p>
        )}
      </div>
    </header>
  );
}

export default Header;
