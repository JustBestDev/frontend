import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!show) return null;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="กลับไปด้านบน"
      className="fixed top-10 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-[#3B0066]/15 bg-white/30 p-2 px-5 text-lg text-[#3B0066]/50 shadow-[0_8px_24px_rgba(59,0,102,0.12)] backdrop-blur-md transition hover:bg-white/70 active:scale-95 sm:right-6"
    >
      ↑ กลับไปบนสุด
    </button>
  );
}

export default ScrollToTopButton;