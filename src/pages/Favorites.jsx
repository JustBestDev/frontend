import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { getFavorites, removeFavorite } from "../api/templeApi";
import TempleCard from "../components/TempleCard";
import useUserStore from "../stores/userStore";

function Favorites() {
  const token = useUserStore((state) => state.token);

  const [favorites, setFavorites] = useState([]);
  const [updatingFavorite, setUpdatingFavorite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await getFavorites(token);
        setFavorites(res.data.favorites);
      } catch (err) {
        setFavorites([]);
        setError(
          err.response?.data?.message ||
            "ไม่สามารถโหลดรายการโปรดได้ กรุณาลองใหม่อีกครั้ง",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (templeId) => {
    setUpdatingFavorite(templeId);

    try {
      await removeFavorite(templeId, token);
      setFavorites((current) =>
        current.filter((temple) => temple.id !== templeId),
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "ไม่สามารถอัปเดตรายการโปรดได้",
      );
    } finally {
      setUpdatingFavorite(null);
    }
  };

  if (!token) {
    return (
      <section className="relative mx-auto min-h-[70vh] w-full max-w-md px-4 py-6">
        {/* Background preview */}
        <div
          className="pointer-events-none select-none blur-sm"
          aria-hidden="true"
        >
          <header className="mb-8 px-4 py-8">
            <h1 className="text-4xl font-bold text-[#3B0066]">
              วัดที่บันทึกไว้
            </h1>
            <p className="mt-2 text-[#6e6673]">สถานที่ศักศิ์ที่คุณชื่นชอบ</p>
          </header>

          <div className="space-y-5">
            <div className="h-80 rounded-3xl bg-white shadow-sm" />
            <div className="h-80 rounded-3xl bg-white shadow-sm" />
          </div>
        </div>

        {/* Login overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="w-full max-w-xs rounded-3xl bg-white/95 p-6 text-center shadow-xl backdrop-blur">
            <h2 className="text-2xl font-bold text-[#3B0066]">
              โปรดลงชื่อเข้าใช้
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              เข้าสู่ระบบเพื่อดูและจัดการวัดที่คุณบันทึกไว้
            </p>

            <Link
              to="/login"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#4A1D6B] px-5 font-medium text-white transition hover:bg-[#5B2580]"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8fb] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#3B0066]">วัดที่บันทึกไว้</h1>
          <p className="mt-2 text-[#6e6673]">สถานที่ศักศิ์ที่คุณชื่นชอบ</p>
        </header>

        <div className="flex flex-col gap-7">
          {loading && (
            <p className="py-16 text-center text-[#6e6673]">
              กำลังโหลดรายการที่บันทึก...
            </p>
          )}

          {!loading && error && (
            <p
              role="alert"
              className="rounded-2xl bg-white px-5 py-10 text-center text-red-600 shadow-sm"
            >
              {error}
            </p>
          )}

          {!loading && !error && favorites.length === 0 && (
            <section className="rounded-2xl bg-white px-5 py-12 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-[#3B0066]">
                ยังไม่มีวัดที่บันทึกไว้
              </h2>
              <p className="mt-2 leading-6 text-[#6e6673]">
                ไปค้นหาวัดที่ถูกใจแล้วกดหัวใจเก็บไว้ได้เลย
              </p>
              <Link
                to="/temples"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#5B008E] px-6 font-medium text-white transition hover:bg-[#4b0076]"
              >
                ค้นหาวัด
              </Link>
            </section>
          )}

          {!loading &&
            !error &&
            favorites.map((temple) => (
              <TempleCard
                from="/favorites"
                key={temple.id}
                temple={temple}
                isFavorite
                onToggleFavorite={handleRemoveFavorite}
                favoriteDisabled={updatingFavorite === temple.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
