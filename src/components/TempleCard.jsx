import { ArrowRightIcon, HeartIcon, LocationIcon } from "../icons/TempleIcons";
import { Link } from "react-router";

function TempleImageFallback() {
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-[#eee1f3] via-[#f8f5f9] to-[#dcc8e6] text-[#5B008E]">
      <svg
        aria-hidden="true"
        className="h-20 w-20 opacity-35"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M8 54h48M13 48h38M18 29h28M32 8 8 25h48L32 8ZM20 29v19m12-19v19m12-19v19" />
      </svg>
    </div>
  );
}

function TempleCard({
  temple,
  from = "/temples",
  isFavorite,
  onToggleFavorite,
  favoriteDisabled,
}) {
  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_32px_rgba(59,0,102,0.07)]">
      <div className="relative">
        {temple.imageUrl ? (
          <img
            src={temple.imageUrl}
            alt={temple.name}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <TempleImageFallback />
        )}
        <button
          type="button"
          aria-label={
            isFavorite
              ? `นำ ${temple.name} ออกจากรายการโปรด`
              : `เพิ่ม ${temple.name} ในรายการโปรด`
          }
          aria-pressed={isFavorite}
          disabled={favoriteDisabled}
          onClick={() => onToggleFavorite(temple.id)}
          className={`absolute right-3 top-3 inline-flex gap-1.5 px-3 min-h-10 shrink-0 place-items-center rounded-full
bg-white/30 backdrop-blur-md
border border-white/40
shadow-sm transition active:scale-95
disabled:cursor-not-allowed disabled:opacity-55
${isFavorite ? "text-[#5B008E]" : "text-[#29252d]"} cursor-pointer`}
        >
          {temple.favoriteCount}
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="p-5">
        <div className="mt-1 flex gap-2 pb-3">
          {temple.categories?.map((item) => (
            <span
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-[#efe2f2] px-5 text-sm font-medium text-[#40204f]"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold leading-snug text-[#3B0066]">
          {temple.name}
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#615a66]">
          <LocationIcon className="size-[18px] shrink-0" />
          <span>{temple.province}</span>
        </p>
        <p className="mt-3 line-clamp-2 min-h-12 leading-6 text-[#615a66]">
          {temple.description}
        </p>
        <div className="mt-5 border-t border-[#e5e0e7] pt-4">
          <Link
            to={`/temples/${temple.id}`}
            state={{ from }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#f5f1f6] font-medium text-[#3B0066] transition hover:bg-[#eadcf0] active:scale-[0.99]"
          >
            ดูรายละเอียด <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
export default TempleCard;
