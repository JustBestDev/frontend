import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getFortuneHistories } from "../api/templeApi";
import { ArrowLeftIcon, HistoryIcon } from "../icons/TempleIcons";
import useUserStore from "../stores/userStore";

function formatThaiDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "ไม่พบข้อมูลวันที่";
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function MyHistory() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getFortuneHistories(token)
      .then((response) => {
        if (active) setHistories(response.data.histories);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "ไม่สามารถโหลดประวัติการเสี่ยงเซียมซีได้",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <main className="min-h-screen animate-slide-in-right bg-[#faf8fb] text-[#302b33]">
      <header className="fixed top-0 z-50 w-full border-b border-[#eee8f1] bg-white shadow-sm">
        <div className="mx-auto grid h-20 w-full max-w-md grid-cols-[1fr_auto_1fr] items-center px-4">
          <button
            type="button"
            aria-label="กลับหน้าโปรไฟล์"
            onClick={() => navigate("/profile")}
            className="grid size-11 place-items-center justify-self-start rounded-full text-[#3B0066] transition hover:bg-[#f6eff9]"
          >
            <ArrowLeftIcon className="size-8" />
          </button>
          <h1 className="whitespace-nowrap text-2xl font-bold text-[#3B0066]">
            ประวัติของฉัน
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-5 pb-14 pt-24">
        <section>
          <h2 className="flex items-center gap-3 text-xl font-medium text-[#3B0066]">
            <HistoryIcon className="size-7 text-[#806b00]" />
            ประวัติเซียมซี
          </h2>
          <p className="mt-4 text-base leading-7 text-[#625b66]">
            รวบรวมคำทำนายและข้อคิดจากสิ่งศักดิ์สิทธิ์ที่คุณได้เคยเสี่ยงทายไว้
          </p>
        </section>

        {loading && (
          <p className="py-20 text-center text-[#625b66]">
            กำลังโหลดประวัติ...
          </p>
        )}

        {!loading && error && (
          <p role="alert" className="mt-10 rounded-3xl bg-white px-6 py-12 text-center text-red-600 shadow-sm">
            {error}
          </p>
        )}

        {!loading && !error && histories.length === 0 && (
          <section className="mt-10 rounded-3xl bg-white px-7 py-12 text-center shadow-sm">
            <HistoryIcon className="mx-auto size-12 text-[#9a8ca0]" />
            <h2 className="mt-5 text-xl font-semibold text-[#3B0066]">
              ยังไม่มีประวัติการเสี่ยงเซียมซี
            </h2>
            <p className="mt-2 leading-7 text-[#625b66]">
              เมื่อคุณเสี่ยงเซียมซี ผลการเสี่ยงจะถูกบันทึกไว้ที่นี่
            </p>
            <button type="button" onClick={() => navigate("/temples")} className="mt-6 rounded-xl bg-[#3B0066] px-6 py-3 font-medium text-white">
              ไปค้นหาวัด
            </button>
          </section>
        )}

        {!loading && !error && histories.length > 0 && (
          <div className="mt-9 space-y-6">
            {histories.map((history) => (
              <article key={history.id} className="rounded-[24px] border border-[#eee9f0] bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <time className="text-sm text-[#817987]" dateTime={history.createdAt}>
                      {formatThaiDate(history.createdAt)}
                    </time>
                    <h2 className="mt-2 text-lg font-medium leading-7 text-[#3B0066]">
                      {history.temple.name}
                    </h2>
                  </div>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#FFD45C] text-xl font-semibold text-[#685500]">
                    #{history.fortuneStick.stickNumber}
                  </span>
                </div>

                <hr className="my-6 border-[#e5dfe7]" />
                <p className="line-clamp-4 whitespace-pre-line text-base leading-7 text-[#302b33]">
                  {history.predictionSnapshot}
                </p>
                <div className="mt-7 flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate(`/fortune-result/${history.id}`, { state: { from: "/my-history" } })}
                    className="rounded-xl border border-[#3B0066] px-5 py-2.5 font-medium text-[#3B0066] transition hover:bg-[#f8f3fa] active:scale-[0.99]"
                  >
                    ดูผล
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyHistory;
