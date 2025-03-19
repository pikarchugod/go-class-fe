import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

export function TestPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/courses")
      .then(res => {
        setCourses(res.data.data || res.data);
      })
      .catch(err => {
        console.error("取得課程失敗:", err);
      });
  }, []);

  return (
    <div>
      <h1>首頁</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title} - NT${course.price}</li>
        ))}
      </ul>
    </div>
  );
}
