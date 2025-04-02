// src/components/ui/dashboard/MyCoursesTab.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn UI Card
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MyCoursesTab() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  async function fetchMyCourses() {
    try {
      const res = await axiosInstance.get("/my-courses");
      setCourses(res.data.courses);
    } catch (err) {
      console.error("取得已購買課程失敗：", err);
      setError("無法取得已購買的課程");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">我的課程</h3>
      {courses.length === 0 ? (
        <p>目前沒有已購買的課程</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={course.cover_url || "/default-course.png"}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <p className="text-sm text-gray-600 mb-2">價格：NT${course.price}</p>
                <Button onClick={() => navigate(`/courses/${course.id}/watch`)}>
                  觀看課程
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
