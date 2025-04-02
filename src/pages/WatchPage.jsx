// src/pages/WatchPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axiosInstance from "@/api/axios";

export default function WatchPage() {
  const { id } = useParams(); // 課程 ID
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 取得課程資料（包含章節）
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        const data = res.data;
        setCourse(data);
        // 預設播放第一個章節的影片 URL（若有章節）
        if (data.chapters && data.chapters.length > 0) {
          // 假設 chapters 已依 sort_order 排序
          setSelectedChapter(data.chapters[0]);
        }
      } catch (err) {
        console.error("取得課程資料失敗：", err);
        setError("無法取得課程資料");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // 當使用者點擊章節時更新播放影片 URL
  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  if (loading) return <div className="p-4">載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!course) return <div className="p-4">找不到課程資料</div>;

  return (
    <div className="container mx-auto px-4 lg:px-20 py-6">
      {/* 課程標題與基本資訊 */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-lg text-gray-700">
          講師：{course.teacher_name || "未知"}
        </p>
        <p className="text-base text-gray-600 mt-2">
          {course.description || "無課程介紹"}
        </p>
      </div>

      {/* 影片播放器與章節列表排版：桌機版左右排列，手機版上下堆疊 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 影片播放器區 */}
        <div className="flex justify-center">
          {selectedChapter ? (
            <ReactPlayer
              url={selectedChapter.video_url}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            <p>無影片資料</p>
          )}
        </div>

        {/* 章節列表區 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">章節列表</h2>
          {course.chapters && course.chapters.length > 0 ? (
            <ul className="space-y-2">
              {course.chapters
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((chapter) => (
                  <li
                    key={chapter.id}
                    className={`p-2 rounded cursor-pointer border ${
                      selectedChapter && selectedChapter.id === chapter.id
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleChapterClick(chapter)}
                  >
                    <p className="font-semibold">
                      第 {chapter.sort_order} 章：{chapter.title}
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <p>尚無章節資料</p>
          )}
        </div>
      </div>
    </div>
  );
}
