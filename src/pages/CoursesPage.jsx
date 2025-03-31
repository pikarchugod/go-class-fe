// src/pages/CoursesPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@/api/axios";
import CourseCard from "@/components/ui/home/CourseCard";
import SortDropdown from "@/components/ui/sort/SortDropdown"; // 確認路徑正確

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  // 排序狀態，預設 "relevant"
  const [sortOption, setSortOption] = useState("relevant");

  useEffect(() => {
    fetchCourses(searchValue, sortOption);
  }, [searchValue, sortOption]);

  const fetchCourses = async (searchStr, sort) => {
    try {
      const res = await axiosInstance.get("/courses", {
        params: { search: searchStr, sort },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("取得課程失敗：", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">課程列表</h1>
      <p className="text-sm text-gray-500 mb-2">
        搜尋關鍵字：{searchValue || "（無）"}
      </p>

      {/* 排序下拉選單：置於搜尋結果數量上方 */}
      <div className="mb-4 flex justify-end">
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <p className="mt-4 text-center text-muted-foreground">
          沒有找到符合條件的課程
        </p>
      )}
    </div>
  );
}
