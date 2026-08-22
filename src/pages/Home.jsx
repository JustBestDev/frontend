import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPopularTemples } from "../api/templeApi";
import {
  HeartIcon,
  HistoryIcon,
  LocationIcon,
  SearchIcon,
} from "../icons/TempleIcons";
import useUserStore from "../stores/userStore";

const shortcuts = [
  { label: "ค้นหาวัด", path: "/temples", Icon: SearchIcon },
  { label: "ประวัติ", path: "/my-history", Icon: HistoryIcon },
  { label: "วัดที่ชอบ", path: "/favorites", Icon: HeartIcon },
];

function TempleImage({ temple }) {
  if (temple.imageUrl) {
    return (
      <img
        src={temple.imageUrl}
        alt={temple.name}
        className="h-48 w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#eee1f3] via-[#f8f5f9] to-[#dcc8e6] px-6 text-center font-medium text-[#5B008E]/60">
      ไม่มีรูปภาพ
    </div>
  );
}

function Home() {
  const user = useUserStore((state) => state.user);
  const [popularTemples, setPopularTemples] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [popularError, setPopularError] = useState("");

  useEffect(() => {
    let active = true;

    getPopularTemples()
      .then((response) => {
        if (active) setPopularTemples(response.data.temples);
      })
      .catch((error) => {
        if (!active) return;
        setPopularTemples([]);
        setPopularError(
          error.response?.data?.message ||
            "ไม่สามารถโหลดวัดยอดนิยมได้ กรุณาลองใหม่อีกครั้ง",
        );
      })
      .finally(() => {
        if (active) setLoadingPopular(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8fb] px-4 pb-8 pt-10 sm:px-6 sm:pt-12">
      <div className="mx-auto w-full max-w-md">
        <section>
          <h1 className="text-3xl font-bold leading-tight text-[#3B0066]">
            สวัสดี{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-2 text-lg text-[#625b66]">
            เริ่มต้นวันใหม่ด้วยพลังแห่งความดี
          </p>
        </section>

        <nav aria-label="เมนูลัด" className="mt-9 grid grid-cols-3 gap-3">
          {shortcuts.map(({ label, path, Icon }) => (
            <Link
              key={path}
              to={path}
              className="flex min-h-36 flex-col items-center justify-center rounded-[24px] bg-white px-2 text-center shadow-[0_10px_28px_rgba(59,0,102,0.05)] transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            >
              <span className="grid size-16 place-items-center rounded-full bg-[#F1E2F3] text-[#3B0066] sm:size-20">
                <Icon className="size-8" />
              </span>
              <span className="mt-4 text-base font-medium text-[#302b33] sm:text-lg">
                {label}
              </span>
            </Link>
          ))}
        </nav>

        <section className="mt-12" aria-labelledby="popular-heading">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="popular-heading"
              className="text-2xl font-bold text-[#302b33]"
            >
              วัดยอดนิยม
            </h2>
            <Link
              to="/temples"
              className="shrink-0 rounded-lg px-2 py-2 font-medium text-[#3B0066] transition hover:bg-[#F1E2F3]"
            >
              ดูทั้งหมด
            </Link>
          </div>

          {loadingPopular && (
            <p className="py-16 text-center text-[#625b66]">
              กำลังโหลดวัดยอดนิยม...
            </p>
          )}

          {!loadingPopular && popularError && (
            <p
              role="alert"
              className="mt-5 rounded-2xl bg-white px-5 py-10 text-center text-red-600 shadow-sm"
            >
              {popularError}
            </p>
          )}

          {!loadingPopular && !popularError && popularTemples.length === 0 && (
            <p className="mt-5 rounded-2xl bg-white px-5 py-10 text-center text-[#625b66] shadow-sm">
              ยังไม่มีข้อมูลวัดยอดนิยม
            </p>
          )}

          {!loadingPopular && !popularError && popularTemples.length > 0 && (
            <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {popularTemples.map((temple) => (
                <article
                  key={temple.id}
                  className="w-[82%] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[26px] bg-white shadow-[0_10px_32px_rgba(59,0,102,0.07)]"
                >
                  <div className="relative">
                    <TempleImage temple={temple} />
                    <span className="absolute right-4 top-4 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white/30 border-white/40 px-3 font-semibold text-[#3B0066] shadow-sm backdrop-blur">
                      {temple.favoriteCount}
                      <HeartIcon className="size-5" filled />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="truncate text-xl font-semibold text-[#302b33]">
                      {temple.name}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-[#625b66]">
                      <LocationIcon className="size-5 shrink-0" />
                      <span className="truncate">{temple.province}</span>
                    </p>
                    <Link
                      to={`/temples/${temple.id}`}
                      state={{ from: "/" }}
                      className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#EEE7F1] px-4 font-medium text-[#3B0066] transition hover:bg-[#E5DAEA] active:scale-[0.98]"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
