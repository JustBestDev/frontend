import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateProfile } from "../api/authApi";
import { CalendarIcon } from "../icons/AuthIcons";
import { ProfileIcon } from "../icons/HeaderIcons";
import useUserStore from "../stores/userStore";
import { editProfileSchema } from "../validations/editProfileValidation";
import { ArrowLeftIcon } from "../icons/TempleIcons";

const dayNames = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
];

function toDateInputValue(value) {
  return String(value || "").match(/^\d{4}-\d{2}-\d{2}/)?.[0] || "";
}

function getLocalToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getThaiWeekday(value) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "ยังไม่ได้เลือกวันเกิด";
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() + 1 !== Number(month) ||
    date.getUTCDate() !== Number(day)
  ) {
    return "วันเกิดไม่ถูกต้อง";
  }
  return `คุณเกิด${dayNames[date.getUTCDay()]}`;
}

function FieldError({ error }) {
  return error ? (
    <p className="mt-1.5 text-sm text-red-500" role="alert">
      {error.message}
    </p>
  ) : null;
}

function EditProfile() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);
  const setUser = useUserStore((state) => state.setUser);
  const originalName = user?.name || "";
  const originalBirthDate = toDateInputValue(user?.birthDate);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { name: originalName, birthDate: originalBirthDate },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        birthDate: toDateInputValue(user.birthDate),
      });
      return;
    }
    fetchCurrentUser().catch(() => {
      toast.error("ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่อีกครั้ง");
      navigate("/profile", { replace: true });
    });
  }, [fetchCurrentUser, navigate, reset, user]);

  const name = watch("name") || "";
  const birthDate = watch("birthDate") || "";
  const hasChanges =
    name.trim() !== originalName.trim() || birthDate !== originalBirthDate;

  const onSubmit = async (values) => {
    if (!hasChanges) return;
    try {
      const response = await updateProfile(
        { name: values.name.trim(), birthDate: values.birthDate },
        token,
      );
      setUser(response.data.user);
      toast.success("บันทึกข้อมูลเรียบร้อยแล้ว");
      navigate("/profile", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
      );
    }
  };

  if (!user)
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf8fb] px-5 text-[#625b66]">
        กำลังโหลดข้อมูลโปรไฟล์...
      </main>
    );

  return (
    <div className="animate-slide-in-right">
      <header className="w-full border-[#eee8f1] bg-white shadow-[0_-8px_30px_rgba(61,28,73,0.08)] backdrop-blur">
        <div className="mx-auto grid h-16 w-full max-w-screen-md grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 md:px-8">
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
      <main className="min-h-screen bg-[#faf8fb] px-5 pb-10 pt-5 sm:pt-8">
        <section
          className="mx-auto w-full max-w-md pt-20"
          aria-labelledby="edit-profile-title"
        >
          <div className="mt-7 flex flex-col items-center">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={`รูปโปรไฟล์ของ ${user.name}`}
                className="size-28 rounded-full object-cover shadow-sm ring-4 ring-[#F1E2F3]"
              />
            ) : (
              <div className="grid size-28 place-items-center rounded-full bg-white text-[#3B0066] shadow-sm ring-4 ring-[#F1E2F3]">
                <ProfileIcon className="size-16" />
              </div>
            )}
            {/* <button
              type="button"
              disabled
              title="ระบบเปลี่ยนรูปโปรไฟล์ยังไม่พร้อมใช้งาน"
              className="mt-4 cursor-not-allowed text-sm font-medium text-[#7A21A8] opacity-60"
            >
              📷 เปลี่ยนรูป (เร็ว ๆ นี้)
            </button> */}
          </div>

          <form
            className="mt-8 space-y-6"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="text-xl font-semibold text-[#242024]"
              >
                ชื่อผู้ใช้งาน
              </label>
              <input
                id="name"
                autoComplete="name"
                className={`h-14 w-full rounded-xl border bg-white px-4 text-[#302b33] outline-none transition focus:border-[#7A21A8] focus:ring-2 focus:ring-[#7A21A8]/15 ${errors.name ? "border-red-400" : "border-[#ded9e1]"}`}
                {...register("name")}
              />
              <FieldError error={errors.name} />
            </div>

            <div>
              <label
                htmlFor="birthDate"
                className="text-xl font-semibold text-[#242024]"
              >
                วันเกิด
              </label>
              <div className="relative">
                <input
                  id="birthDate"
                  type="date"
                  max={getLocalToday()}
                  className={`peer h-14 w-full cursor-pointer rounded-xl border bg-white px-4 pr-12 text-[#302b33] outline-none transition
      focus:border-[#7A21A8] focus:ring-2 focus:ring-[#7A21A8]/15
      [&::-webkit-calendar-picker-indicator]:absolute
      [&::-webkit-calendar-picker-indicator]:inset-0
      [&::-webkit-calendar-picker-indicator]:h-full
      [&::-webkit-calendar-picker-indicator]:w-full
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-webkit-calendar-picker-indicator]:opacity-0
      ${errors.birthDate ? "border-red-400" : "border-[#ded9e1]"}`}
                  {...register("birthDate")}
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#7A21A8] [&_svg]:size-5">
                  <CalendarIcon />
                </span>
              </div>
              <FieldError error={errors.birthDate} />
            </div>

            <div>
              <p className="text-xl font-semibold text-[#242024]">
                วันเกิดประจำสัปดาห์
              </p>
              <div className="rounded-2xl bg-[#F5EFF7] px-5 py-4">
                <p className="mt-2 text-xl font-semibold text-[#BF9A33]">
                  {getThaiWeekday(birthDate)}
                </p>
                <p className="mt-1 text-sm text-[#625b66]">
                  คำนวณอัตโนมัติจากวันเกิด
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!hasChanges || isSubmitting}
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-[#3B0066] px-4 font-medium text-lg text-white transition hover:bg-[#51107b] disabled:cursor-not-allowed disabled:bg-[#c8bdcc] disabled:text-white/80"
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default EditProfile;
