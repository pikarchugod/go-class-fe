// src/components/ui/dashboard/MyWishlistTab.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MyWishlistTab() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">我想要學</h3>
      <p className="mb-4">你可以瀏覽更多課程，並將感興趣的課程加入願望清單。</p>
      <Button onClick={() => navigate("/courses")}>前往課程搜尋</Button>
    </div>
  );
}
