// src/components/course-detail/CourseIntroduction.jsx
import React from "react";

export default function CourseIntroduction({ course }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">課程介紹</h3>
      <p className="text-gray-700">{course.description || "尚無課程介紹"}</p>
    </div>
  );
}
