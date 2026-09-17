import {
  ChevronDownIcon,
  LocationIcon,
  SearchIcon,
} from "../icons/TempleIcons";

function TempleFilters({
  search,
  setSearch,
  province,
  setProvince,
  provinceOptions,
  category,
  setCategory,
  categories,
}) {
  return (
    <section
      className="
            rounded-[22px] bg-white p-5
            shadow-[0_10px_32px_rgba(59,0,102,0.06)]
            lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1
          "
    >
      <h1 className="text-2xl font-bold text-[#3B0066]">
        ค้นหาสถานที่ศักดิ์สิทธิ์
      </h1>

      <label className="relative mt-5 block">
        <span className="sr-only">ค้นหาชื่อวัดหรือสถานที่</span>

        <SearchIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-[#8b8391]" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาชื่อวัดหรือสถานที่..."
          className="h-14 w-full rounded-xl border border-[#ded9e1] bg-[#fcfbfc] pl-12 pr-4 text-base outline-none placeholder:text-[#918a96] focus:border-[#7A21A8] focus:ring-2 focus:ring-[#7A21A8]/15"
        />
      </label>

      <label className="relative mt-4 block cursor-pointer">
        <span className="sr-only">เลือกจังหวัด</span>

        <LocationIcon className="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-[#8b8391]" />

        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="h-14 w-full appearance-none rounded-xl border border-[#ded9e1] bg-[#fcfbfc] pl-12 pr-12 text-base outline-none focus:border-[#7A21A8]"
        >
          <option value="">ทุกจังหวัด</option>

          {provinceOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#77707d]" />
      </label>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {[{ id: "all", name: "ทั้งหมด" }, ...categories].map((item) => {
          const value = item.id === "all" ? "" : item.name;
          const active = category === value;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(value)}
              className={`h-10 shrink-0 rounded-full px-5 text-sm font-medium ${
                active
                  ? "bg-[#3B0066] text-white"
                  : "cursor-pointer bg-[#efe2f2] text-[#40204f]"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default TempleFilters