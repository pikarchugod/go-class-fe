// src/pages/StudentDashboard.jsx
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // 請根據實際路徑調整
// 從 components/ui/dashboard 內匯入子分頁元件
import MyCoursesTab from "@/components/ui/dashboard/MyCoursesTab";
import MyOrdersTab from "@/components/ui/dashboard/MyOrdersTab";
import MyFavoritesTab from "@/components/ui/dashboard/MyFavoritesTab";
import MyWishlistTab from "@/components/ui/dashboard/MyWishlistTab";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 lg:px-20 py-6">
      {/* 使用者基本資料區 */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.name || "使用者"}</h2>
          <p className="text-gray-600">{user?.email || "未設定 Email"}</p>
        </div>
      </div>

      {/* Tabs 區：四個功能分頁 */}
      <Tabs defaultValue="my-courses">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="my-courses">我的課程</TabsTrigger>
          <TabsTrigger value="my-orders">我的訂單</TabsTrigger>
          <TabsTrigger value="my-favorites">我的收藏</TabsTrigger>
          <TabsTrigger value="wishlist">我想要學</TabsTrigger>
        </TabsList>
        <TabsContent value="my-courses">
          <MyCoursesTab />
        </TabsContent>
        <TabsContent value="my-orders">
          <MyOrdersTab />
        </TabsContent>
        <TabsContent value="my-favorites">
          <MyFavoritesTab />
        </TabsContent>
        <TabsContent value="wishlist">
          <MyWishlistTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
