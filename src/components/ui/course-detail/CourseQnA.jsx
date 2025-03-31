// src/components/course-detail/CourseQnA.jsx
import React from "react";

export default function CourseQnA({ course }) {
  const qnaList = course.qna || [];
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">問答區</h3>
      {qnaList.length > 0 ? (
        <ul className="space-y-4">
          {qnaList.map((item, index) => (
            <li key={index}>
              <p className="font-semibold">Q: {item.question}</p>
              <p>A: {item.answer || "尚無回覆"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>目前沒有問答</p>
      )}
    </div>
  );
}
