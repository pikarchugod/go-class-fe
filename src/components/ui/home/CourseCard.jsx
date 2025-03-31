// src/components/home/CourseCard.jsx
import React from "react";

export default function CourseCard({ course }) {
  // 從環境變數取得後端基底 URL（請在 .env 設定 VITE_BACKEND_BASE_URL=http://127.0.0.1:8000）
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://127.0.0.1:8000";

  // 組合圖片完整 URL；假設 cover_image 存放為 "uploads/courses/1.png"
  const coverUrl = course.cover_image
    ? `${baseURL}/storage/${course.cover_image}`
    : `${baseURL}/storage/uploads/courses/default.png`;

  return (
    <div className="w-full">
      {/* 桌機版卡片 (>=1280px) */}
      <div className="hidden xl:flex flex-col h-full w-[279px] bg-white rounded-md shadow p-4">
        <img
          src={coverUrl}
          alt={course.title}
          className="mb-3 w-full h-auto object-cover rounded-md"
        />
        <h3 className="text-base font-semibold mb-2 line-clamp-2">
          {course.title}
        </h3>
        {/* 顯示講師姓名 */}
        <p className="text-sm text-gray-500">講師：{course.teacher_name || "未知"}</p>
        <div className="mt-auto space-y-1">
          <p className="text-primary font-bold">NT${course.price}</p>
          <p className="text-sm text-gray-500">
            評分：{course.rating ? course.rating : "尚未評分"} ★
          </p>
          <p className="text-sm text-gray-500">
            {course.duration ? course.duration : ""}
          </p>
        </div>
      </div>

      {/* 手機版卡片 (<1280px) */}
      <div className="block xl:hidden bg-white rounded-md shadow p-4 h-full">
        <div className="flex flex-row h-full">
          <img
            src={coverUrl}
            alt={course.title}
            className="w-[131px] h-auto object-cover rounded-md mr-4"
          />
          <div className="flex flex-col flex-1">
            <h3 className="text-base font-semibold mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500">講師：{course.teacher_name || "未知"}</p>
            <div className="mt-auto space-y-1">
              <p className="text-primary font-bold">NT${course.price}</p>
              <p className="text-sm text-gray-500">
                評分：{course.rating ? course.rating : "尚未評分"} ★
              </p>
              <p className="text-sm text-gray-500">
                {course.duration ? course.duration : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
