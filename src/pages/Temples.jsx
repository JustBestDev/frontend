import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  addFavorite,
  getCategories,
  getFavorites,
  getTemples,
  removeFavorite,
} from "../api/templeApi";

import ScrollToTopButton from "../components/ScrollToTopButton";
import TempleCard from "../components/TempleCard";
import TempleFilters from "../components/TempleFilters";

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

  // โหลด categories ตอนเปิดหน้า
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.categories);
      } catch {
        toast.error("ไม่สามารถโหลดหมวดหมู่ได้");
      }
    };

    fetchCategories();
  }, []);

  // โหลด favorites เมื่อ token เปลี่ยน
  useEffect(() => {
    if (!token) {
      setFavorites(new Set());
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await getFavorites(token);

        setFavorites(new Set(res.data.favorites.map((item) => item.id)));
      } catch {
        toast.error("ไม่สามารถโหลดรายการโปรดได้");
      }
    };

    fetchFavorites();
  }, [token]);

  // โหลด temples เมื่อ search / province / category เปลี่ยน
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

      setTemples((current) =>
        current.map((temple) =>
          temple.id === templeId
            ? {
                ...temple,
                favoriteCount:
                  (temple.favoriteCount ?? 0) + (isFavorite ? -1 : 1),
              }
            : temple,
        ),
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "ไม่สามารถอัปเดตรายการโปรดได้",
      );
    } finally {
      setUpdatingFavorite(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8fb] px-4 py-8 sm:px-6 ">
      <div className="mx-auto w-full max-w-md lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          {/* ฝั่งขวา: Search / Filter */}
          <TempleFilters
            search={search}
            setSearch={setSearch}
            province={province}
            setProvince={setProvince}
            provinceOptions={provinceOptions}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
          {/* ฝั่งซ้าย: Temple Cards */}
          <div
            className="
            mt-8 flex flex-col gap-7
            lg:col-start-1 lg:row-start-1 lg:mt-0
            lg:grid lg:grid-cols-2 lg:gap-6
          "
          >
            {loading && (
              <p className="py-16 text-center text-[#6e6673] lg:col-span-2">
                กำลังโหลดสถานที่...
              </p>
            )}

            {!loading && error && (
              <p
                role="alert"
                className="rounded-2xl bg-white px-5 py-10 text-center text-red-600 shadow-sm lg:col-span-2"
              >
                {error}
              </p>
            )}

            {!loading && !error && temples.length === 0 && (
              <p className="rounded-2xl bg-white px-5 py-12 text-center text-[#6e6673] shadow-sm lg:col-span-2">
                ไม่พบสถานที่ที่ตรงกับการค้นหา
              </p>
            )}

            {!loading &&
              !error &&
              temples.length > 0 &&
              temples.map((temple) => (
                <TempleCard
                  from="/temples"
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
      <ScrollToTopButton />
    </div>
  );
}
export default Temples;
