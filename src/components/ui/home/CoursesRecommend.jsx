// src/components/home/CoursesRecommend.jsx
import React from "react";
import { CourseCard } from "./CourseCard";

import slide1 from "@/assets/images/hero/slide1.png";
import slide2 from "@/assets/images/hero/slide2.png";
import slide3 from "@/assets/images/hero/slide3.png";

export function CoursesRecommend() {
  // 假資料，可改為後端 API
  const courseList = [
    {
      id: 1,
      title: "超簡單圍棋啟蒙",
      price: 520,
      rating: 5.0,
      duration: "5小時20分",
      cover: slide1,
    },
    {
      id: 2,
      title: "圍棋進階策略",
      price: 650,
      rating: 4.8,
      duration: "6小時10分",
      cover: slide2,
    },
    {
      id: 3,
      title: "高手對局解析",
      price: 999,
      rating: 4.9,
      duration: "10小時",
      cover: slide3,
    },
  ];

  return (
    <section className="bg-background text-foreground py-8">
      <div className="container mx-auto px-6 lg:px-20">
        {/* 標題 + 查看更多 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">推薦課程</h2>
          <a
            href="/courses"
            className="text-sm text-blue-600 hover:underline"
          >
            查看更多
          </a>
        </div>

        {/* 
          手機版：1 欄 
          桌機版 (>=1280px)：3 欄
        */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
