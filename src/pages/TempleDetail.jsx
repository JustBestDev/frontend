import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import {
  addFavorite,
  getFavorites,
  getTempleById,
  removeFavorite,
} from "../api/templeApi";

import FortuneStickModal from "../components/FortuneStickModal";
import TempleHero from "../components/TempleHero";
import TempleInfo from "../components/TempleInfo";
import TempleLocation from "../components/TempleLocation";

import { ArrowIcon } from "../icons/AuthIcons";
import { ArrowLeftIcon, SparklesIcon } from "../icons/TempleIcons";

import useUserStore from "../stores/userStore";

const actionClassName =
  "grid min-h-11 min-w-11 place-items-center rounded-full text-[#3B0066] transition hover:bg-[#F6EFF9] hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

const fortuneButtonClass =
  "flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#4A006E] px-4 py-3 text-lg font-medium text-[#fafafa] shadow-[0_10px_24px_rgba(74,0,110,0.18)] transition";

function TempleDetail() {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);

  const [temple, setTemple] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDisabled, setFavoriteDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false);

  useEffect(() => {
    const fetchTemple = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTempleById(templeId);
        setTemple(response.data.temple);

        if (token) {
          const favoriteResponse = await getFavorites(token);

          const favorite = favoriteResponse.data.favorites.some(
            (item) => item.id === response.data.temple.id,
          );

          setIsFavorite(favorite);
        }
      } catch (err) {
        setTemple(null);

        setError(
          err.response?.status === 404
            ? "ไม่พบข้อมูลวัด"
            : err.response?.data?.message ||
                "ไม่สามารถโหลดข้อมูลวัดได้ กรุณาลองใหม่อีกครั้ง",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTemple();
  }, [templeId, token]);

  const handleToggleFavorite = async () => {
    if (!token) {
      return toast.info("กรุณาเข้าสู่ระบบเพื่อบันทึกรายการโปรด");
    }

    setFavoriteDisabled(true);

    try {
      if (isFavorite) {
        await removeFavorite(temple.id, token);
      } else {
        await addFavorite(temple.id, token);
      }

      setIsFavorite((current) => !current);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "ไม่สามารถอัปเดตรายการโปรดได้",
      );
    } finally {
      setFavoriteDisabled(false);
    }
  };

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf9fb] text-[#6e6673]">
        กำลังโหลดข้อมูลวัด...
      </main>
    );
  }

  if (error || !temple) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf9fb] px-5 text-center">
        <div>
          <p role="alert" className="text-xl font-medium text-[#3B0066]">
            {error || "ไม่พบข้อมูลวัด"}
          </p>

          <button
            type="button"
            onClick={() => navigate("/temples")}
            className="mt-5 rounded-xl bg-[#3B0066] px-5 py-3 text-white"
          >
            กลับไปหน้ารวมวัด
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen animate-slide-in-right overflow-x-hidden bg-[#faf9fb] text-[#5f5863]">
      <header className="fixed top-0 z-50 w-full border-[#eee8f1] bg-white shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur">
        <div className="mx-auto grid h-16 w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 md:px-8">
          <button
            type="button"
            aria-label="ย้อนกลับ"
            onClick={() => navigate("/temples")}
            className={`${actionClassName} justify-self-start cursor-pointer`}
          >
            <ArrowLeftIcon className="size-8" />
          </button>

          <h1 className="justify-self-center text-xl font-bold text-[#3B0066] sm:text-2xl">
            {temple.name}
          </h1>
        </div>
      </header>

      <div className="mx-auto mt-20 w-full max-w-md bg-[#faf9fb] sm:max-w-lg md:max-w-xl">
        <TempleHero
          temple={temple}
          isFavorite={isFavorite}
          favoriteDisabled={favoriteDisabled}
          onToggleFavorite={handleToggleFavorite}
        />

        <div className="space-y-5 px-4 py-6 pb-10 sm:px-6">
          {temple.hasFortuneSticks &&
            (token ? (
              <button
                type="button"
                onClick={() => setIsFortuneModalOpen(true)}
                className={fortuneButtonClass}
              >
                <SparklesIcon className="size-7" />
                เสี่ยงเซียมซีที่วัดนี้
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className={fortuneButtonClass}
              >
                <ArrowIcon className="size-7" />
                เข้าสู่ระบบเพื่อเสี่ยงเซียมซี
              </button>
            ))}

          <TempleInfo temple={temple} />

          <TempleLocation temple={temple} />
        </div>
      </div>

      {temple.hasFortuneSticks && (
        <FortuneStickModal
          temple={temple}
          isOpen={isFortuneModalOpen}
          onClose={() => setIsFortuneModalOpen(false)}
          from="/temples"
        />
      )}
    </main>
  );
}

export default TempleDetail;