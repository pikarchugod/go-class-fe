// src/components/ui/dashboard/MyFavoritesTab.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

export default function MyFavoritesTab() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const res = await axiosInstance.get("/favorites");
      // 假設後端回傳可能為 { favorites: [...] } 或直接陣列
      const favs = res.data.favorites || res.data;
      setFavorites(favs);
    } catch (err) {
      console.error("取得收藏失敗：", err);
      setError("無法取得收藏");
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(fav) {
    // 若 fav.course 存在則用 fav.course.id，否則直接使用 fav.id
    const courseId = fav.course ? fav.course.id : fav.id;
    try {
      await axiosInstance.delete(`/favorites/${courseId}`);
      fetchFavorites();
    } catch (err) {
      console.error("移除收藏失敗：", err);
    }
  }

  if (loading) return <div>載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">我的收藏</h3>
      {favorites.length === 0 ? (
        <p>目前沒有收藏的課程</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((fav) => {
            // 如果 fav.course 存在則使用 fav.course，否則用 fav 本身作為課程資料
            const course = fav.course || fav;
            return (
              <li key={course.id} className="p-4 bg-white rounded shadow">
                <p className="font-semibold">{course.title}</p>
                <img
                  src={course.cover_url || "/default-course.png"}
                  alt={course.title}
                  className="w-40 h-40 object-cover mt-2"
                />
                <p>價格：NT${course.price}</p>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => removeFavorite(fav)}
                >
                  移除收藏
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
