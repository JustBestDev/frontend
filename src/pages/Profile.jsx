import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ProfileIcon } from "../icons/HeaderIcons";
import { EditIcon } from "../icons/ProfileIcons";
import { HistoryIcon } from "../icons/TempleIcons";
import useUserStore from "../stores/userStore";

const actionLink =
  "flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#3B0066] bg-white text-lg font-medium text-[#3B0066] transition hover:bg-[#f8f3fa] active:scale-[0.99]";

const roleLabels = {
  USER: "ผู้แสวงบุญ (Seeker)",
  ADMIN: "ผู้ดูแลระบบ (Admin)",
};

const dayNames = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
];

function getBirthDateParts(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  return {
    year: Number(match[1]), // (\d{4})   ปี 4 ตัว
    month: Number(match[2]), // (\d{2})   เดือน 2 ตัว
    day: Number(match[3]), // (\d{2})   วัน 2 ตัว
  };
}

function formatThaiDate(value) {
  const parts = getBirthDateParts(value);
  if (!parts) return "ไม่พบข้อมูลวันเกิด";

  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getBirthDayName(value) {
  const parts = getBirthDateParts(value);
  if (!parts) return "ไม่พบข้อมูลวันเกิด";

  const dayIndex = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day),
  ).getUTCDay();
  return `คุณเกิด${dayNames[dayIndex]}`;
}

function Profile() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);
  const logout = useUserStore((state) => state.logout);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setError("");
        await fetchCurrentUser();
      } catch (err) {
        if (err.response?.status === 401) logout();
        setError(
          err.response?.data?.message ||
            "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่อีกครั้ง",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [fetchCurrentUser, logout, token]);

  if (!token) {
    return (
      <section className="relative mx-auto min-h-[70vh] w-full max-w-md px-4 py-6">
        {/* Background preview */}
        <div
          className="pointer-events-none select-none blur-sm"
          aria-hidden="true"
        >
          <header className="mb-8 px-4 py-8">
            <h1 className="text-4xl font-bold text-[#3B0066]">โปรไฟล์ของฉัน</h1>
            <p className="mt-2 text-[#6e6673]">
              จัดการข้อมูลส่วนตัวและดวงชะตาของคุณ
            </p>
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
              เข้าสู่ระบบเพื่อดูและจัดการโปรไฟล์ของคุณ
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
    <div className="min-h-screen bg-[#faf8fb] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#3B0066]">โปรไฟล์ของฉัน</h1>
          <p className="mt-2 text-base text-[#5f5863]">
            จัดการข้อมูลส่วนตัวและดวงชะตาของคุณ
          </p>
        </header>

        {loading && (
          <p className="rounded-3xl bg-white px-6 py-16 text-center text-[#5f5863] shadow-sm">
            กำลังโหลดข้อมูลโปรไฟล์...
          </p>
        )}

        {!loading && error && (
          <p
            role="alert"
            className="rounded-3xl bg-white px-6 py-12 text-center text-red-600 shadow-sm"
          >
            {error}
          </p>
        )}

        {!loading && !error && user && (
          <section className="rounded-3xl bg-white p-6 shadow-[0_10px_32px_rgba(59,0,102,0.06)] sm:p-8">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={`รูปโปรไฟล์ของ ${user.name}`}
                className="size-28 rounded-full border-4 border-[#f0edf1] object-cover shadow-sm"
              />
            ) : (
              <div className="grid size-28 place-items-center rounded-full bg-[#F6EFF9] text-[#3B0066] shadow-sm">
                <ProfileIcon className="size-16" />
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#242024]">
                {user.name}
              </h2>
              <p className="mt-1 wrap-break-word text-lg text-[#5f5863]">
                {user.email}
              </p>
              <p className="mt-4 font-semibold inline-flex rounded-full bg-[#F1E1F5] px-4 py-2 text-[#4A1268]">
                {roleLabels[user.role] || user.role}
              </p>
            </div>

            <hr className="my-7 border-gray-200" />

            <div>
              <p className="text-sm text-[#5f5863]">วันเกิด</p>
              <p className="mt-2 text-xl text-[#242024]">
                {formatThaiDate(user.birthDate)}
              </p>
            </div>

            <div className="mt-7">
              <p className="text-sm text-[#5f5863]">วันเกิดประจำสัปดาห์</p>
              <p className="mt-2 text-xl font-semibold text-[#BF9A33]">
                {getBirthDayName(user.birthDate)}
              </p>
            </div>

            <Link to="/profile/edit" className={`mt-9 ${actionLink}`}>
              <EditIcon className="size-6" />
              <span>แก้ไขโปรไฟล์</span>
            </Link>
            <Link to="/my-history" className={`mt-4 ${actionLink}`}>
              <HistoryIcon className="size-6" />
              <span>ประวัติเสี่ยงเซียมซีของฉัน</span>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

export default Profile;
