import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { drawFortune } from "../api/templeApi";
import useUserStore from "../stores/userStore";

const SHAKE_DURATION = 3000;

function FortuneStick({ isShaking }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto h-56 w-36 origin-bottom ${isShaking ? "fortune-stick-shaking" : ""}`}
    >
      <div className="absolute inset-x-5 top-2 flex h-32 items-start justify-center gap-1 overflow-hidden rounded-t-[2.5rem]">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="h-32 w-2 origin-bottom rounded-full bg-gradient-to-b from-[#e8c078] to-[#9b5b25] shadow-sm"
            style={{ transform: `rotate(${(index - 3) * 4}deg)` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-3 bottom-0 h-32 rounded-[2rem_2rem_2.6rem_2.6rem] border-4 border-[#9d672d] bg-gradient-to-r from-[#8a4c20] via-[#c58a45] to-[#754018] shadow-[0_18px_30px_rgba(59,0,102,0.2)]">
        <div className="absolute inset-3 rounded-[1.4rem_1.4rem_2rem_2rem] border border-[#efd298]/70" />
        <div className="absolute inset-x-0 top-1/2 text-center text-3xl text-[#f3d999]">
          เซียมซี
        </div>
      </div>
    </div>
  );
}

function FortuneStickModal({ temple, isOpen, onClose, from = "/temples" }) {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const [isShaking, setIsShaking] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isShaking) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isShaking, onClose]);

  if (!isOpen) return null;

  const handleDrawFortune = async () => {
    if (!token) {
      toast.info("กรุณาเข้าสู่ระบบเพื่อเสี่ยงเซียมซี");
      return;
    }

    setIsShaking(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, SHAKE_DURATION));
      const response = await drawFortune(temple.id, token);
      const history = response.data.history;
      navigate(`/fortune-result/${history.id}`, {
        state: { history, from },
      });
    } catch (err) {
      if (isMounted.current) {
        setIsShaking(false);
        toast.error(
          err.response?.data?.message ||
            "ไม่สามารถเสี่ยงเซียมซีได้ กรุณาลองใหม่อีกครั้ง",
        );
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isShaking) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="fortune-modal-title"
        className="relative w-full max-w-md rounded-[2rem] bg-white px-5 py-8 text-center shadow-2xl sm:px-9"
      >
        <button
          type="button"
          aria-label="ปิดหน้าต่างเซียมซี"
          disabled={isShaking}
          onClick={onClose}
          className="absolute right-3 top-3 grid size-10 cursor-pointer place-items-center rounded-full text-4xl text-[#6e6673] transition hover:bg-[#F6EFF9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ×
        </button>

        <p className="text-lg font-semibold text-[#6e6673]">{temple.name}</p>
        <h2
          id="fortune-modal-title"
          className="mt-1 text-3xl font-bold text-[#3B0066]"
        >
          เสี่ยงเซียมซี
        </h2>

        <div className="my-7 min-h-56">
          <FortuneStick isShaking={isShaking} />
        </div>
        <p className="text-[#746b78]">
          ตั้งจิตอธิษฐาน แล้วกดเพื่อเสี่ยงเซียมซี
        </p>

        <button
          type="button"
          disabled={isShaking}
          onClick={handleDrawFortune}
          className="min-h-14 w-full cursor-pointer rounded-full bg-[#3B0066] px-6 py-3 mt-1 text-lg font-semibold text-white shadow-[0_10px_24px_rgba(59,0,102,0.22)] transition hover:bg-[#4d0877] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isShaking ? "กำลังเขย่าเซียมซี..." : "เสี่ยงเซียมซี"}
        </button>
      </section>
    </div>
  );
}

export default FortuneStickModal;
