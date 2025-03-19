// src/components/home/CourseCard.jsx
import React from "react";

export function CourseCard({ course }) {
  return (
    <div className="w-full">
      {/* 桌機版卡片 (>=1280px) */}
      <div className="hidden xl:flex flex-col h-full w-[279px] bg-white rounded-md shadow p-4">
        {/* 圖片 */}
        <img
          src={course.cover}
          alt={course.title}
          className="mb-3 w-full h-auto object-cover rounded-md"
        />
        {/* 標題 (可 line-clamp-2 避免太長) */}
        <h3 className="text-base font-semibold mb-2 line-clamp-2">
          {course.title}
        </h3>
        {/* 底部資訊：價格 / 評分 / 時數，固定在最底 */}
        <div className="mt-auto space-y-1">
          <p className="text-primary font-bold">NT${course.price}</p>
          <p className="text-sm text-gray-500">評分：{course.rating} ★</p>
          <p className="text-sm text-gray-500">{course.duration}</p>
        </div>
      </div>

      {/* 手機版卡片 (<1280px) */}
      <div className="block xl:hidden bg-white rounded-md shadow p-4 h-full">
        <div className="flex flex-row h-full">
          {/* 左側圖片 */}
          <img
            src={course.cover}
            alt={course.title}
            className="w-[131px] h-auto object-cover rounded-md mr-4"
          />
          {/* 右側：標題 + 底部資訊 */}
          <div className="flex flex-col flex-1">
            <h3 className="text-base font-semibold mb-2 line-clamp-2">
              {course.title}
            </h3>
            <div className="mt-auto space-y-1">
              <p className="text-primary font-bold">NT${course.price}</p>
              <p className="text-sm text-gray-500">評分：{course.rating} ★</p>
              <p className="text-sm text-gray-500">{course.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
