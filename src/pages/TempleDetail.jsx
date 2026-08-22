import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  addFavorite,
  getFavorites,
  getTempleById,
  removeFavorite,
} from "../api/templeApi";
import {
  ArrowLeftIcon,
  HeartIcon,
  LocationIcon,
  SparklesIcon,
} from "../icons/TempleIcons";
import FortuneStickModal from "../components/FortuneStickModal";
import useUserStore from "../stores/userStore";
import { ArrowIcon } from "../icons/AuthIcons";

function TempleImageFallback() {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[#eee1f3] via-[#f8f5f9] to-[#dcc8e6] text-lg font-medium text-[#5B008E]/60">
      ไม่มีรูปภาพ
    </div>
  );
}

const actionClassName =
  "grid min-h-11 min-w-11 place-items-center rounded-full text-[#3B0066] transition hover:bg-[#F6EFF9] hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

function TempleDetail() {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/temples";
  const token = useUserStore((state) => state.token);
  const [temple, setTemple] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteDisabled, setFavoriteDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false);

  useEffect(() => {
    if (!location.state?.openFortuneModal) return;
    setIsFortuneModalOpen(true);
    navigate(location.pathname, { replace: true, state: { from } });
  }, [from, location.pathname, location.state?.openFortuneModal, navigate]);

  useEffect(() => {
    const fetchTemple = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getTempleById(templeId);
        setTemple(response.data.temple);

        if (token) {
          const favoriteResponse = await getFavorites(token);
          setIsFavorite(
            favoriteResponse.data.favorites.some(
              (item) => item.id === response.data.temple.id,
            ),
          );
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
    if (!token) return toast.info("กรุณาเข้าสู่ระบบเพื่อบันทึกรายการโปรด");
    setFavoriteDisabled(true);
    try {
      if (isFavorite) await removeFavorite(temple.id, token);
      else await addFavorite(temple.id, token);
      setIsFavorite((current) => !current);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "ไม่สามารถอัปเดตรายการโปรดได้",
      );
    } finally {
      setFavoriteDisabled(false);
    }
  };

  if (loading)
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf9fb] text-[#6e6673]">
        กำลังโหลดข้อมูลวัด...
      </main>
    );

  if (error || !temple) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf9fb] px-5 text-center">
        <div>
          <p role="alert" className="text-xl font-medium text-[#3B0066]">
            {error || "ไม่พบข้อมูลวัด"}
          </p>
          <button
            type="button"
            onClick={() => navigate(from, { replace: true })}
            className="mt-5 rounded-xl bg-[#3B0066] px-5 py-3 text-white"
          >
            กลับไปหน้ารวมวัด
          </button>
        </div>
      </main>
    );
  }

  const hasCoordinates =
    Number.isFinite(temple.latitude) && Number.isFinite(temple.longitude);
  const mapUrl = hasCoordinates
    ? `https://maps.google.com/maps?q=${temple.latitude},${temple.longitude}&z=15&output=embed`
    : "";
  const largeMapUrl = hasCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${temple.latitude},${temple.longitude}`
    : "";

  return (
    <main className="min-h-screen animate-slide-in-right overflow-x-hidden bg-[#faf9fb] text-[#5f5863]">
      <header className="fixed top-0 z-50 w-full border-[#eee8f1] bg-white shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur">
        <div className="mx-auto grid h-16 w-full max-w-screen-md grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 md:px-8">
          <button
            type="button"
            aria-label="ย้อนกลับ"
            onClick={() => navigate("/temples")}
            className={`${actionClassName} justify-self-start cursor-pointer`}
          >
            <ArrowLeftIcon className="size-8" />
          </button>
          <h1 className="justify-self-center text-xl font-bold tracking-[-0.04em] text-[#3B0066] sm:text-2xl">
            {temple.name}
          </h1>
        </div>
      </header>
      <div className="mx-auto mt-20 w-full max-w-md bg-[#faf9fb] sm:max-w-lg md:max-w-xl">
        <section className="relative">
          {temple.imageUrl ? (
            <div className="z-10 w-full" style={{ backgroundColor: "black" }}>
              <img
                src={temple.imageUrl}
                alt={temple.name}
                className="aspect-[4/3] w-full object-cover"
                style={{ opacity: 0.6 }}
              />
            </div>
          ) : (
            <TempleImageFallback />
          )}

          <div className="absolute inset-x-0 bottom-0 p-5 pr-24 text-white">
            <h2 className="text-xl font-bold leading-snug sm:text-2xl">
              {temple.name}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-base sm:text-lg">
              <LocationIcon className="size-6 shrink-0" />
              <span>{temple.province}</span>
            </p>
          </div>
          <button
            type="button"
            aria-label={
              isFavorite
                ? `นำ ${temple.name} ออกจากรายการโปรด`
                : `เพิ่ม ${temple.name} ในรายการโปรด`
            }
            aria-pressed={isFavorite}
            disabled={favoriteDisabled}
            onClick={handleToggleFavorite}
            className={`absolute right-3 bottom-6 grid size-11 shrink-0 place-items-center rounded-full
bg-white/30 backdrop-blur-md
border border-white/40
shadow-sm transition active:scale-95
disabled:cursor-not-allowed disabled:opacity-55
${isFavorite ? "text-white" : "text-white"} cursor-pointer`}
          >
            <HeartIcon className="size-7" filled={isFavorite} />
          </button>
        </section>

        <div className="space-y-5 px-4 py-6 pb-10 sm:px-6">
          {token ? (
            <button
              type="button"
              onClick={() => setIsFortuneModalOpen(true)}
              style={{
                display: "flex",
                minHeight: "3.5rem",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                borderRadius: "0.75rem",
                backgroundColor: "#4A006E",
                padding: "0.75rem 1rem",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "#fafafa",
                boxShadow: "0 10px 24px rgba(74, 0, 110, 0.18)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <SparklesIcon className="size-7" />
              เสี่ยงเซียมซีที่วัดนี้
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                display: "flex",
                minHeight: "3.5rem",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                borderRadius: "0.75rem",
                backgroundColor: "#4A006E",
                padding: "0.75rem 1rem",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "#fafafa",
                boxShadow: "0 10px 24px rgba(74, 0, 110, 0.18)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <ArrowIcon className="size-7" />
              เข้าสู่ระบบเพื่อเสี่ยงเซียมซี
            </button>
          )}

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-medium text-[#3B0066]">เกี่ยวกับวัด</h2>
            <p className="mt-5 whitespace-pre-line text-base leading-8">
              {temple.description}
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-medium text-[#3B0066]">
              ความเชื่อและสิริมงคล
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {temple.categories?.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#efe2f2] px-5 py-2 text-center text-sm font-medium text-[#40204f]"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-medium text-[#3B0066]">ที่ตั้ง</h2>
            <div className="mt-5 flex items-start gap-3 text-base leading-7">
              <LocationIcon className="mt-0.5 size-7 shrink-0 text-[#817987]" />
              <p>{temple.address || temple.province}</p>
            </div>
            <div className="group relative mt-5 h-56 w-full overflow-hidden rounded-2xl bg-[#e8e5e9]">
              {hasCoordinates ? (
                <iframe
                  title={`แผนที่ ${temple.name}`}
                  src={mapUrl}
                  className="size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="grid size-full place-items-center text-[#817987]">
                  ไม่มีข้อมูลพิกัด
                </div>
              )}

              {hasCoordinates && (
                <a
                  href={largeMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-5 py-3 font-medium text-[#3B0066] opacity-0 shadow-lg transition group-hover:opacity-100"
                >
                  ดูแผนที่ขนาดใหญ่
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
      <FortuneStickModal
        temple={temple}
        isOpen={isFortuneModalOpen}
        onClose={() => setIsFortuneModalOpen(false)}
        from={from}
      />
    </main>
  );
}

export default TempleDetail;
