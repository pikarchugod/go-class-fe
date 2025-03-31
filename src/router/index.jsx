// src/router/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestPage } from "@/pages/TestPage";
import HomePage from "@/pages/HomePage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import CoursesPage from "@/pages/CoursesPage"; // 新增課程列表頁



function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default AppRouter;
