// src/router/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestPage } from "@/pages/TestPage";
import HomePage from "@/pages/HomePage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import CoursesPage from "@/pages/CoursesPage"; // 新增課程列表頁
import CartPage from "@/pages/CartPage"; // 新增課程列表頁
import WatchPage from "@/pages/WatchPage"; // 新增 WatchPage


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/courses/:id/watch" element={<WatchPage />} />
    </Routes>
  );
}

export default AppRouter;
