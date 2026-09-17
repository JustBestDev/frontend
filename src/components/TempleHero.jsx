import { HeartIcon, LocationIcon } from "../icons/TempleIcons";

function TempleImageFallback() {
  return (
    <div className="flex aspect-4/3 w-full items-center justify-center bg-linear-to-br from-[#eee1f3] via-[#f8f5f9] to-[#dcc8e6] text-lg font-medium text-[#5B008E]/60">
      ไม่มีรูปภาพ
    </div>
  );
}

function TempleHero({
  temple,
  isFavorite,
  favoriteDisabled,
  onToggleFavorite,
}) {
  return (
    <section className="relative">
      {temple.imageUrl ? (
        <div className="z-10 w-full" style={{ backgroundColor: "black" }}>
          <img
            src={temple.imageUrl}
            alt={temple.name}
            className="aspect-4/3 w-full object-cover"
            style={{ opacity: 0.6 }}
          />
        </div>
      ) : (
        <TempleImageFallback />
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 pr-24 text-white">
        <h2 className="text-xl font-bold leading-snug sm:text-2xl">
          {temple.name}
        </h2>
        <p className="mt-2 flex items-center gap-2 text-base sm:text-lg">
          <LocationIcon className="size-6 shrink-0" />
          <span>{temple.province}</span>
        </p>
      </div>
      <button
        type="button"
        aria-label={
          isFavorite
            ? `นำ ${temple.name} ออกจากรายการโปรด`
            : `เพิ่ม ${temple.name} ในรายการโปรด`
        }
        aria-pressed={isFavorite}
        disabled={favoriteDisabled}
        onClick={onToggleFavorite}
        className={`absolute right-3 bottom-6 grid size-11 shrink-0 place-items-center rounded-full
    bg-white/30 backdrop-blur-md
    border border-white/40
    shadow-sm transition active:scale-95
    disabled:cursor-not-allowed disabled:opacity-55
    ${isFavorite ? "text-white" : "text-white"} cursor-pointer`}
      >
        <HeartIcon className="size-7" filled={isFavorite} />
      </button>
    </section>
  );
}

export default TempleHero;
