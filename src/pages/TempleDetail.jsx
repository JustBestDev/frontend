import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, HeartIcon } from "../icons/TempleIcons";
import { useEffect, useState } from "react";
import { getTempleById } from "../api/templeApi";

const actionClassName =
  "grid min-h-11 min-w-11 place-items-center rounded-full text-[#3B0066] transition hover:bg-[#F6EFF9] hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

function TempleImageFallback() {
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-[#eee1f3] via-[#f8f5f9] to-[#dcc8e6] text-[#5B008E]">
      <svg
        aria-hidden="true"
        className="h-20 w-20 opacity-35"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M8 54h48M13 48h38M18 29h28M32 8 8 25h48L32 8ZM20 29v19m12-19v19m12-19v19" />
      </svg>
    </div>
  );
}

function TempleDetail({ isFavorite, onToggleFavorite, favoriteDisabled }) {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { templeId } = useParams();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getTempleById(templeId);

        setTemples(res.data.temple);
      } catch (err) {
        setTemples([]);
        setError(
          err.response?.data?.message ||
            "ไม่สามารถโหลดสถานที่ได้ กรุณาลองใหม่อีกครั้ง",
        );
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="w-full border-[#eee8f1] bg-white shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur">
        <div className="mx-auto grid h-16 w-full max-w-screen-md grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 md:px-8">
          <button
            type="button"
            aria-label="goBack"
            className={`${actionClassName} justify-self-start`}
            onClick={handleGoBack}
          >
            <ArrowLeftIcon className="size-7" />
          </button>

          <span className="justify-self-center text-xl font-bold tracking-[-0.04em] text-[#3B0066] sm:text-2xl">
            {temples.name}
          </span>
        </div>
      </header>
      <div className="relative">
        {temples.imageUrl ? (
          <img
            src={temples.imageUrl}
            alt={temples.name}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <TempleImageFallback />
        )}
        <div
          className={`absolute right-4 bottom-4 grid size-11 shrink-0 place-items-center rounded-full
bg-white/30 backdrop-blur-md
border border-white/40
shadow-sm transition active:scale-95
disabled:cursor-not-allowed disabled:opacity-55
${isFavorite ? "text-[#5B008E]" : "text-[#29252d]"}`}
        >
          <button
            type="button"
            aria-label={
              isFavorite
                ? `นำ ${temples.name} ออกจากรายการโปรด`
                : `เพิ่ม ${temples.name} ในรายการโปรด`
            }
            aria-pressed={isFavorite}
            disabled={favoriteDisabled}
            onClick={() => onToggleFavorite(temples.id)}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>
      </div>
    </>
  );
}

export default TempleDetail;
