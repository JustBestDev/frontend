// import { useEffect, useState } from "react";
// import TempleCard from "../components/TempleCard";
// import useUserStore from "../stores/userStore";

// function Favorites() {
//   const token = useUserStore((state) => state.token);

//   const [favorites, setfavorites] = useState([]);
//   const [updatingFavorite, setUpdatingFavorite] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   console.log("favorites", favorites);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!token) return;

//       setLoading(true);
//       setError("");

//       try {
//         const res = await getFavorites(token);

//         setFavorites(res.data.favorites);
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             "ไม่สามารถโหลดรายการโปรดได้ กรุณาลองใหม่อีกครั้ง",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//     console.log("fetchFavorites", fetchFavorites);
//   }, [token]);
//   return (
//     <div>
//       {favorites.map((temple) => (
//         <TempleCard
//           key={temple.id}
//           temple={temple}
//           isFavorite={favorites.has(temple.id)}
//           onToggleFavorite={handleToggleFavorite}
//           favoriteDisabled={updatingFavorite === temple.id}
//         />
//       ))}
//     </div>
//   );
// }

// export default Favorites;
