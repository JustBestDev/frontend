import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TempleCard from "../components/TempleCard";
import {
  addFavorite,
  getCategories,
  getFavorites,
  getTemples,
  removeFavorite,
} from "../api/templeApi";
import {
  ChevronDownIcon,
  LocationIcon,
  SearchIcon,
} from "../icons/TempleIcons";
import useUserStore from "../stores/userStore";

function Temples() {
  const token = useUserStore((state) => state.token);
  const [temples, setTemples] = useState([]);
  const [categories, setCategories] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [updatingFavorite, setUpdatingFavorite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.categories))
      .catch(() => toast.error("ไม่สามารถโหลดหมวดหมู่ได้"));
  }, []);
  useEffect(() => {
    if (token)
      getFavorites(token)
        .then((res) =>
          setFavorites(new Set(res.data.favorites.map((item) => item.id))),
        )
        .catch(() => toast.error("ไม่สามารถโหลดรายการโปรดได้"));
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = {};
        if (search.trim()) params.search = search.trim();
        if (province) params.province = province;
        if (category) params.category = category;
        const res = await getTemples(params);
        setTemples(res.data.temples);
        setProvinceOptions((current) =>
          [
            ...new Set([
              ...current,
              ...res.data.temples.map((item) => item.province),
            ]),
          ].sort((a, b) => a.localeCompare(b, "th")),
        );
      } catch (err) {
        setTemples([]);
        setError(
          err.response?.data?.message ||
            "ไม่สามารถโหลดสถานที่ได้ กรุณาลองใหม่อีกครั้ง",
        );
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, province, category]);

  const handleToggleFavorite = async (templeId) => {
    if (!token) return toast.info("กรุณาเข้าสู่ระบบเพื่อบันทึกรายการโปรด");
    const isFavorite = favorites.has(templeId);
    setUpdatingFavorite(templeId);
    try {
      if (isFavorite) await removeFavorite(templeId, token);
      else await addFavorite(templeId, token);
      setFavorites((current) => {
        const next = new Set(current);
        if (isFavorite) next.delete(templeId);
        else next.add(templeId);
        return next;
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "ไม่สามารถอัปเดตรายการโปรดได้",
      );
    } finally {
      setUpdatingFavorite(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8fb] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <section className="rounded-[22px] bg-white p-5 shadow-[0_10px_32px_rgba(59,0,102,0.06)]">
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
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[{ id: "all", name: "ทั้งหมด" }, ...categories].map((item) => {
              const value = item.id === "all" ? "" : item.name;
              const active = category === value;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(value)}
                  className={`h-10 shrink-0 rounded-full px-5 text-sm font-medium ${active ? "bg-[#3B0066] text-white" : "bg-[#efe2f2] text-[#40204f] cursor-pointer"}`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </section>
        <div className="mt-8 flex flex-col gap-7">
          {loading && (
            <p className="py-16 text-center text-[#6e6673]">
              กำลังโหลดสถานที่...
            </p>
          )}
          {!loading && error && (
            <p
              role="alert"
              className="rounded-2xl bg-white px-5 py-10 text-center text-red-600 shadow-sm"
            >
              {error}
            </p>
          )}
          {!loading && !error && temples.length === 0 && (
            <p className="rounded-2xl bg-white px-5 py-12 text-center text-[#6e6673] shadow-sm">
              ไม่พบสถานที่ที่ตรงกับการค้นหา
            </p>
          )}
          {!loading &&
            !error &&
            temples.map((temple) => (
              <TempleCard
                key={temple.id}
                temple={temple}
                isFavorite={favorites.has(temple.id)}
                onToggleFavorite={handleToggleFavorite}
                favoriteDisabled={updatingFavorite === temple.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Temples;
