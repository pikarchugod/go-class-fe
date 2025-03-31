// src/router/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestPage } from "@/pages/TestPage";
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage"; // 新增課程列表頁



function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
    </Routes>
  );
}

export default AppRouter;
