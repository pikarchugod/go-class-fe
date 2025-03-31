// src/App.jsx
import React from "react";
import AppRouter from "@/router";
import { Navbar } from "@/components/ui/navbar/Navbar";
import { Footer } from "@/components/ui/footer/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Navbar (含登入/註冊彈窗按鈕) */}
      <Navbar />

      {/* 2. 中間區域顯示各頁面的內容 (Routes) */}
      <AppRouter />

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default App;
