// src/components/course-detail/CourseChapters.jsx
import React from "react";

export default function CourseChapters({ course }) {
  const chapters = course.chapters || [];
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">課程章節</h3>
      {chapters.length > 0 ? (
        <ul className="list-disc pl-5">
          {chapters.map((chapter, index) => (
            <li key={index}>
              <p className="font-semibold">{chapter.title}</p>
              <p className="text-sm text-gray-600">{chapter.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>暫無章節資料</p>
      )}
    </div>
  );
}
