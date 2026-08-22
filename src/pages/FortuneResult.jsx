import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getFortuneHistoryById } from "../api/templeApi";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, HistoryIcon, HomeOutlineIcon, LeafIcon, RefreshIcon } from "../icons/TempleIcons";
import { TempleIcon } from "../icons/NavigationIcons";
import useUserStore from "../stores/userStore";

const outlineButton = "flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#d9cadf] bg-white px-4 text-lg font-medium text-[#3B0066] transition hover:bg-[#f8f3fa] active:scale-[0.99]";

function formatDrawDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return {
    date: new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "long", year: "numeric" }).format(date),
    time: `${new Intl.DateTimeFormat("th-TH", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date)} น.`,
  };
}

function normalizeLegacyState(state) {
  if (!state?.fortune || !state?.temple) return null;
  return {
    id: state.fortune.historyId,
    createdAt: state.fortune.createdAt,
    temple: state.temple,
    fortuneStick: state.fortune,
    prediction: state.fortune.prediction,
  };
}

function FortuneResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { historyId } = useParams();
  const token = useUserStore((state) => state.token);
  const [history, setHistory] = useState(() => location.state?.history || normalizeLegacyState(location.state));
  const [loading, setLoading] = useState(!history && Boolean(historyId));
  const [error, setError] = useState("");
  const from = location.state?.from || "/temples";

  useEffect(() => {
    if (history || !historyId) return;
    if (!token) {
      setLoading(false);
      setError("กรุณาเข้าสู่ระบบเพื่อดูผลเซียมซีนี้");
      return;
    }

    let active = true;
    getFortuneHistoryById(historyId, token)
      .then((response) => { if (active) setHistory(response.data.history); })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "ไม่สามารถโหลดผลเซียมซีได้");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [history, historyId, token]);

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#faf8fb] text-[#5f5863]">กำลังโหลดผลเซียมซี...</main>;

  if (error || !history?.temple || !history?.fortuneStick) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf8fb] px-5 text-center">
        <div>
          <p role="alert" className="text-xl font-medium text-[#3B0066]">{error || "ไม่พบผลเซียมซี กรุณาเสี่ยงเซียมซีจากหน้าวัด"}</p>
          <button type="button" onClick={() => navigate("/temples", { replace: true })} className="mt-5 rounded-xl bg-[#3B0066] px-5 py-3 text-white">ไปหน้ารวมวัด</button>
        </div>
      </main>
    );
  }

  const { temple, fortuneStick, prediction, createdAt } = history;
  const drawnAt = formatDrawDate(createdAt);
  const goToTemple = (openFortuneModal = false) => navigate(`/temples/${temple.id}`, {
    replace: true,
    state: { from, openFortuneModal },
  });

  return (
    <main className="min-h-screen bg-[#faf8fb] px-4 py-10 text-[#29252d] sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-md">
        <header className="relative text-center">
          <button type="button" aria-label="ย้อนกลับ" onClick={() => navigate(from)} className="absolute left-0 top-0 grid size-11 place-items-center rounded-full text-[#3B0066] transition hover:bg-[#f1e2f3]">
            <ArrowLeftIcon className="size-8" />
          </button>
          <h1 className="text-4xl font-semibold leading-tight text-[#3B0066]">ผลการเสี่ยงเซียมซี</h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-lg text-[#5f5863]"><TempleIcon /><span>{temple.name}</span></p>
        </header>

        <section className="mt-9 rounded-[24px] border border-[#e5e1e6] bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="text-center">
            <div className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f1e2f3] px-6 text-lg text-[#3B0066]"><LeafIcon className="size-6" /><span>เซียมซีใบที่ {fortuneStick.stickNumber}</span></div>
            {fortuneStick.title && <h2 className="mt-7 text-2xl font-semibold leading-snug text-[#3B0066]">{fortuneStick.title}</h2>}
          </div>
          <p className="mt-6 whitespace-pre-line text-left text-base leading-8 text-[#29252d]">{prediction}</p>
          {drawnAt && (
            <div className="mx-auto mt-9 w-fit border-t border-[#eadcf0] px-4 pt-6 text-[#5f5863]">
              <p className="flex items-center gap-2"><CalendarIcon className="size-5" />{drawnAt.date}</p>
              <p className="mt-1 flex items-center gap-2"><ClockIcon className="size-5" />{drawnAt.time}</p>
            </div>
          )}
        </section>

        <div className="mt-8 space-y-4">
          <button type="button" onClick={() => navigate("/my-history")} className={outlineButton}><HistoryIcon className="size-7" />ดูประวัติเสี่ยงเซียมซี</button>
          <button type="button" onClick={() => goToTemple(true)} className={outlineButton}><RefreshIcon className="size-7" />เสี่ยงใหม่</button>
          <button type="button" onClick={() => goToTemple(false)} className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#3B0066] px-4 text-lg font-medium text-white shadow-[0_8px_18px_rgba(59,0,102,0.2)] transition hover:bg-[#4d0877] active:scale-[0.99]"><HomeOutlineIcon className="size-7" />กลับหน้าวัด</button>
        </div>
      </div>
    </main>
  );
}

export default FortuneResult;
