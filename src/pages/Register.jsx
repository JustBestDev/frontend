import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { registerAccount } from "../api/authApi";
import {
  ArrowLeftIcon,
  BrandLogo,
  CalendarIcon,
  EyeIcon,
  MailIcon,
  UserIcon,
} from "../icons/AuthIcons";
import { registerSchema } from "../validations/registerValidation";
import { getLocalToday } from "../utils/dateUtils";

const inputClass =
  "h-14 w-full rounded-xl border-[1.5px] border-[#ded9e1] bg-white px-5 pr-14 text-base text-[#342e38] outline-none transition placeholder:text-[#847c88] focus:border-[#6a278e] focus:ring-3 focus:ring-[#6a278e]/10 sm:h-16";
const errorInputClass =
  "border-red-400 focus:border-red-500 focus:ring-red-100";
const iconClass =
  "pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#aaa5ad] [&_svg]:size-6";

function FieldError({ error }) {
  return error ? (
    <p className="mt-1.5 text-sm text-red-500">{error.message}</p>
  ) : null;
}

function PasswordField({
  name,
  placeholder,
  shown,
  setShown,
  register,
  error,
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={name}>
        {placeholder}
      </label>

      <div className="relative">
        <input
          id={name}
          type={shown ? "text" : "password"}
          autoComplete="new-password"
          placeholder={placeholder}
          className={`${inputClass} ${error ? errorInputClass : ""}`}
          {...register(name)}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-4 flex w-10 cursor-pointer items-center justify-center text-[#aaa5ad] transition hover:text-[#6a278e] [&_svg]:size-6"
          onClick={() => setShown((value) => !value)}
          aria-pressed={shown}
        >
          <EyeIcon hidden={!shown} />
        </button>
      </div>

      <FieldError error={error} />
    </div>
  );
}

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const birthDateRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const birthDateRegister = register("birthDate");

  const onSubmit = async ({ name, email, password, birthDate }) => {
    try {
      await registerAccount({
        name: name.trim(),
        email: email.trim(),
        password,
        birthDate,
      });
      toast.success("สมัครสมาชิกสำเร็จ");
      setTimeout(() => navigate("/login", { replace: true }), 700);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-purple-50 via-white to-amber-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -right-32 -top-40 size-80 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-80 rounded-full bg-amber-100/60 blur-3xl" />

      <section
        className="relative z-10 mx-auto w-full max-w-125"
        aria-labelledby="register-title"
      >
        <div className="rounded-[28px] border border-white bg-white/90 px-5 py-7 shadow-[0_24px_70px_rgba(74,0,112,.10)] backdrop-blur sm:px-8 sm:py-9">
          <header className="mb-7 text-center">
            <div className="mx-auto mb-3 grid size-16 place-items-center rounded-2xl bg-purple-50 text-[#41006b] [&_svg]:size-10">
              <BrandLogo />
            </div>
            <h1
              id="register-title"
              className="text-3xl font-extrabold tracking-tight text-[#3B0066] sm:text-4xl"
            >
              MuMorrow
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-gray-600">
              เปิดรับพลังแห่งดวงดาว เริ่มต้นการเดินทางของคุณ
            </p>
          </header>

          <form
            className="flex flex-col gap-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="sr-only" htmlFor="name">
                ชื่อ - นามสกุล
              </label>
              <div className="relative">
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="ชื่อ - นามสกุล"
                  className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
                  {...register("name")}
                />
                <span className={iconClass}>
                  <UserIcon />
                </span>
              </div>
              <FieldError error={errors.name} />
            </div>

            <div>
              <label className="sr-only" htmlFor="email">
                อีเมล
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="อีเมล"
                  className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                  {...register("email")}
                />
                <span className={iconClass}>
                  <MailIcon />
                </span>
              </div>
              <FieldError error={errors.email} />
            </div>

            <PasswordField
              name="password"
              placeholder="รหัสผ่าน"
              shown={showPassword}
              setShown={setShowPassword}
              register={register}
              error={errors.password}
            />

            <PasswordField
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              shown={showConfirmPassword}
              setShown={setShowConfirmPassword}
              register={register}
              error={errors.confirmPassword}
            />

            <fieldset className="mt-1 rounded-xl border-2 border-amber-200 px-4 pb-5">
              <legend className="px-2 text-sm font-medium text-amber-700">
                ✨ ข้อมูลสำคัญสำหรับดูดวง
              </legend>

              <label
                className="mb-2 mt-2 block text-sm font-medium text-[#514a55]"
                htmlFor="birthDate"
              >
                วัน/เดือน/ปีเกิด
              </label>

              <div
                className="relative cursor-pointer"
                onClick={() => {
                  if (birthDateRef.current?.showPicker) {
                    birthDateRef.current.showPicker();
                  } else {
                    birthDateRef.current?.focus();
                  }
                }}
              >
                <span className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-amber-600 [&_svg]:size-6">
                  <CalendarIcon />
                </span>

                <input
                  id="birthDate"
                  type="date"
                  max={getLocalToday()}
                  {...birthDateRegister}
                  ref={(element) => {
                    birthDateRegister.ref(element);
                    birthDateRef.current = element;
                  }}
                  className={`${inputClass} cursor-pointer px-12 pr-4
    [&::-webkit-calendar-picker-indicator]:absolute
    [&::-webkit-calendar-picker-indicator]:inset-0
    [&::-webkit-calendar-picker-indicator]:h-full
    [&::-webkit-calendar-picker-indicator]:w-full
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
    [&::-webkit-calendar-picker-indicator]:opacity-0
    ${errors.birthDate ? errorInputClass : ""}
  `}
                />
              </div>

              <FieldError error={errors.birthDate} />
            </fieldset>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex min-h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-[#4A1D6B] px-4 font-medium text-white shadow-[0_10px_25px_rgba(67,0,107,.16)] transition hover:bg-[#5b2580] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  กำลังประมวลผล...
                </span>
              ) : (
                "สมัครสมาชิก"
              )}
            </button>

            <Link
              to="/login"
              className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-[#4A1D6B] hover:underline [&_svg]:size-5"
            >
              <ArrowLeftIcon /> กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
