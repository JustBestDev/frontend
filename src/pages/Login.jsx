import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ArrowIcon, BrandLogo, EyeIcon, MailIcon } from "../icons/AuthIcons";
import { loginSchema } from "../validations/loginValidation";
import useUserStore from "../stores/userStore";

const inputWrap =
  "relative flex min-h-14 items-center rounded-[13px] border-[1.5px] border-[#ded9e1] bg-white/90 transition focus-within:border-[#6a278e] focus-within:ring-3 focus-within:ring-[#6a278e]/10 sm:min-h-[66px]";

const inputClass =
  "h-14 w-full bg-transparent px-6 pr-15.5 text-[1.08rem] text-[#342e38] outline-none placeholder:text-[#736b76] sm:h-16";

function Login() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email.trim(),
        password: data.password,
      });

      toast.success("เข้าสู่ระบบสำเร็จ");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      );
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[linear-gradient(145deg,#fff_5%,#fbf7ff_52%,#7f1ad1_100%)] px-4 py-7.5 sm:px-5 sm:py-13">
      <div className="pointer-events-none absolute -right-32 -top-44 size-97.5 rounded-full bg-[radial-gradient(circle,rgba(209,160,255,.48)_0%,rgba(225,194,255,.22)_42%,transparent_70%)] opacity-65 blur-lg sm:-right-42.5 sm:-top-57.5 sm:size-140" />

      <div className="pointer-events-none absolute -bottom-52 -left-40 size-97.5 rounded-full bg-[radial-gradient(circle,rgba(209,160,255,.48)_0%,rgba(225,194,255,.22)_42%,transparent_70%)] opacity-65 blur-lg sm:-bottom-75 sm:-left-57.5 sm:size-140" />

      <section
        className="relative z-10 w-full max-w-152.5"
        aria-labelledby="login-title"
      >
        <header className="mb-5.5 text-center sm:mb-7.5">
          <div className="mx-auto mb-3.5 grid size-17 place-items-center rounded-[18px] bg-white/90 text-[#41006b] shadow-[0_16px_40px_rgba(74,13,104,.09)] sm:mb-4.5 sm:size-20.5 sm:rounded-[22px] [&_svg]:size-11 sm:[&_svg]:size-13.5">
            <BrandLogo />
          </div>

          <h1
            id="login-title"
            className="font-sans text-[clamp(2.15rem,5vw,3rem)] font-extrabold leading-[1.1] tracking-[-1.5px] text-[#41006b]"
          >
            MuMorrow
          </h1>

          <p className="mt-2.5 text-[clamp(1.05rem,2.6vw,1.35rem)] text-[#5f5763]">
            วันนี้จักรวาลมีอะไรอยากบอกคุณ
          </p>
        </header>

        <form
          className="flex flex-col gap-4.25 rounded-[22px] border border-white/90 bg-white/80 px-5 py-6 shadow-[0_25px_75px_rgba(74,0,112,.11)] backdrop-blur-lg sm:gap-5 sm:rounded-[28px] sm:p-10.5"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <label className={inputWrap}>
              <span className="sr-only">อีเมล</span>

              <input
                className={inputClass}
                type="email"
                {...register("email")}
                autoComplete="email"
                placeholder="อีเมล"
              />

              <span className="absolute right-5 grid size-7 place-items-center text-[#aaa5ad] [&_svg]:size-full">
                <MailIcon />
              </span>
            </label>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className={inputWrap}>
              <span className="sr-only">รหัสผ่าน</span>

              <input
                className={inputClass}
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="current-password"
                placeholder="รหัสผ่าน"
              />

              <button
                className="absolute right-5 grid size-7 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[#aaa5ad] [&_svg]:size-full"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                <EyeIcon hidden={!showPassword} />
              </button>
            </label>
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <Link
            className="-mt-1 self-end text-[#43006b] hover:underline"
            to="/login"
          >
            ลืมรหัสผ่าน?
          </Link>

          {/* Login Button */}
          <button
            className="mt-1 flex min-h-13.75 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[#43006b] bg-[#43006b] text-[1.1rem] text-white shadow-[0_10px_25px_rgba(67,0,107,.16)] transition hover:-translate-y-px hover:bg-[#560087] hover:shadow-[0_13px_28px_rgba(67,0,107,.23)] sm:min-h-15 [&_svg]:size-6.5"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>กำลังเข้าสู่ระบบ...</span>
            ) : (
              <>
                <span>เข้าสู่ระบบ</span>
                <ArrowIcon />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-5 text-[#777078] before:h-px before:flex-1 before:bg-[#ded9e1] after:h-px after:flex-1 after:bg-[#ded9e1]">
            <span>หรือ</span>
          </div>

          {/* Register */}
          <Link
            className="grid min-h-13.75 place-items-center rounded-xl border-[1.5px] border-[#43006b] text-[1.1rem] text-[#43006b] transition hover:bg-[#43006b] hover:text-white sm:min-h-15"
            to="/register"
          >
            สมัครสมาชิก
          </Link>

          {/* Continue Later */}
          <Link
            className="grid min-h-13.75 place-items-center rounded-xl border-[1.5px] border-[#43006b] text-[1.1rem] text-[#43006b] transition hover:bg-[#43006b] hover:text-white sm:min-h-15"
            to="/home"
          >
            เข้าสู่ระบบภายหลัง
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;
