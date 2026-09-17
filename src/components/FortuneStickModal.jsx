import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { drawFortune } from "../api/templeApi";
import useUserStore from "../stores/userStore";

const SHAKE_DURATION = 2000;

function FortuneStick({ isShaking }) {
  const sticks = [
    { rotate: -10, x: 2, height: 132 },
    { rotate: -5, x: 1, height: 145 },
    { rotate: -2, x: 0, height: 156 },
    { rotate: 2, x: 0, height: 160 },
    { rotate: 5, x: -1, height: 150 },
    { rotate: 9, x: -2, height: 138 },
  ];

  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto h-64 w-44 origin-bottom ${
        isShaking ? "fortune-stick-shaking" : ""
      }`}
    >
      {/* ไม้เซียมซี */}
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-end justify-center">
        {sticks.map((stick, index) => (
          <div
            key={index}
            className="relative -mx-1 w-7 origin-bottom"
            style={{
              height: `${stick.height}px`,
              transform: `translateX(${stick.x}px) rotate(${stick.rotate}deg)`,
            }}
          >
            {/* ตัวไม้ */}
            <div className="absolute inset-x-1 bottom-0 top-8 rounded-sm bg-linear-to-r from-[#ead8ae] via-[#f3e2ba] to-[#d7bf91]" />

            {/* ปลายสีทอง */}
            <div className="absolute inset-x-1 top-2 h-11 bg-linear-to-r from-[#8A5A12] via-[#FFF2A8] to-[#A96F16]" />

            {/* หัวไม้แหลมสีทอง */}
            <div className="absolute left-1/2 top-0 size-5 -translate-x-1/2 rotate-45 bg-linear-to-br from-[#FFF2A8] via-[#D49A2A] to-[#8A5A12]" />
          </div>
        ))}
      </div>

      {/* ตัวกระบอก */}
      <div
        className="absolute bottom-3 left-1/2 z-10 h-32 w-36
    -translate-x-1/2 overflow-hidden rounded-b-[2.6rem]
    bg-linear-to-r
    from-[#2A0048]
    via-[#5B1680]
    to-[#2A0048]
    shadow-[0_18px_30px_rgba(59,0,102,0.18)]"
      >
        {/* highlight */}
        <div className="absolute inset-y-0 left-7 w-8 bg-white/5" />

        <div
          className="
    absolute inset-x-0 top-1/2 -translate-y-1/2
    bg-[linear-gradient(90deg,#6F470C_0%,#D49A2A_18%,#FFF3A3_38%,#B97816_55%,#FFE88A_72%,#8A570F_100%)]
    bg-clip-text
    text-center text-xl font-semibold tracking-wide
    text-transparent
    drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]
  "
        >
          MuMorrow
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
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
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
        state: {
          history: history,
          from: from,
        },
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
        className="relative w-full max-w-md rounded-4xl bg-white px-5 py-8 text-center shadow-2xl sm:px-9"
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
