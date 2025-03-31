// src/pages/CourseDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axios";
import CourseHero from "@/components/ui/course-detail/CourseHero";
import CourseTabs from "@/components/ui/course-detail/CourseTabs";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        setError("無法取得課程資料");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;
  if (!course) return <div>找不到課程</div>;

  return (
    <div className="p-4">
      <CourseHero course={course} />
      <CourseTabs course={course} />
    </div>
  );
}
