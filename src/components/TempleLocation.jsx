import { LocationIcon } from "../icons/TempleIcons";

function TempleLocation({ temple }) {
  const hasCoordinates =
    Number.isFinite(temple.latitude) && Number.isFinite(temple.longitude);
  const mapUrl = hasCoordinates
    ? `https://maps.google.com/maps?q=${temple.latitude},${temple.longitude}&z=15&output=embed`
    : "";
  const largeMapUrl = hasCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${temple.latitude},${temple.longitude}`
    : "";

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-[#3B0066]">ที่ตั้ง</h2>
      <div className="mt-5 flex items-start gap-3 text-base leading-7">
        <LocationIcon className="mt-0.5 size-7 shrink-0 text-[#817987]" />
        <p>{temple.address || temple.province}</p>
      </div>
      <div className="group relative mt-5 h-56 w-full overflow-hidden rounded-2xl bg-[#e8e5e9]">
        {hasCoordinates ? (
          <iframe
            title={`แผนที่ ${temple.name}`}
            src={mapUrl}
            className="size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="grid size-full place-items-center text-[#817987]">
            ไม่มีข้อมูลพิกัด
          </div>
        )}

        {hasCoordinates && (
          <a
            href={largeMapUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-5 py-3 font-medium text-[#3B0066] opacity-0 shadow-lg transition group-hover:opacity-100"
          >
            ดูแผนที่ขนาดใหญ่
          </a>
        )}
      </div>
    </section>
  );
}

export default TempleLocation;
