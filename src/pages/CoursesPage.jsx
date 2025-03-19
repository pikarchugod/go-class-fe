import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

export function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/courses")  // GET /api/courses
      .then((res) => {
        // 後端若回傳 { data: [ {...}, {...} ] }
        // 可能要視後端 JSON 結構而定
        setCourses(res.data.data || res.data);
      })
      .catch((err) => {
        console.error("取得課程失敗:", err);
      });
  }, []);

  return (
    <div>
      <h1>首頁</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title} - {course.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
