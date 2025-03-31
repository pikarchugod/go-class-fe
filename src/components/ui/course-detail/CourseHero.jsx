// src/components/course-detail/CourseHero.jsx
import React from "react";
import { Button } from "@/components/ui/button";

export default function CourseHero({ course }) {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://127.0.0.1:8000";
  const coverUrl = course.cover_image
    ? `${baseURL}/storage/${course.cover_image}`
    : "https://via.placeholder.com/800x400"; // 預設圖可自行換

  return (
    <div className="container mx-auto px-4 lg:px-20 py-6">
      {/* 桌機版：左右兩欄；手機版：上下堆疊 */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* 圖片欄：限制最大寬度、置中 */}
        <div className="flex justify-center md:justify-end">
          <img
            src={coverUrl}
            alt={course.title}
            className="max-w-md w-full h-auto object-contain rounded-md"
          />
        </div>

        {/* 文字欄：左對齊，適度留白 */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            {course.title}
          </h2>
          <p className="text-base text-gray-700">
            講師：{course.teacher_name || "未知"}
          </p>
          <p className="text-base text-gray-600">
            評分：{course.rating !== undefined ? course.rating : "尚未評分"} ★
          </p>
          <p className="text-base text-gray-600">
            購買人數：{course.purchase_count || 0}
          </p>

          {/* 按鈕組 */}
          <div className="flex space-x-4 pt-2">
            <Button>加入購物車</Button>
            <Button variant="outline">收藏課程</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
