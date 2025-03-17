import React from "react";
import { useAuth } from "@/contexts/AuthContext";

// 先前已做好：桌機版顯示輸入框、手機版顯示放大鏡 + 全螢幕搜尋
import { SearchBarContainer } from "@/components/ui/navbar/SearchBarContainer";

// 先前已做好：桌機版顯示頭像 / 登入按鈕，手機版顯示漢堡選單
import { UserMenuContainer } from "@/components/ui/navbar/UserMenuContainer";

// 這裡示範用 lucide-react 的三個 icon
import { BookOpen, Bell, ShoppingCart } from "lucide-react";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-background text-foreground shadow-sm">
      {/* 
        container + max-w-screen-xl：符合設計系統 
        h-16：固定高度 
        flex items-center justify-between：左右佈局 
      */}
      <div className="mx-auto w-full max-w-screen-xl px-4 h-16 flex items-center justify-between">
        {/* ===== 左側：LOGO ===== */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // 請換成你的 LOGO 路徑
            alt="Logo"
            className="h-8 w-auto"
          />
          {/* 也可用文字或 SVG 取代 */}
        </div>

        {/* ===== 中間：搜尋 ===== 
            SearchBarContainer 內部已處理「桌機版輸入框 / 手機版放大鏡」 
        */}
        <div className="flex-1 mx-4">
          <SearchBarContainer />
        </div>

        {/* ===== 右側：icons + user menu ===== */}
        <div className="flex items-center space-x-3">
          {/* 桌機版 (>= xl) → 已登入才顯示課程/通知/購物車 */}
          {isAuthenticated && (
            <div className="hidden xl:flex items-center space-x-3">
              <button aria-label="我的課程">
                <BookOpen className="w-5 h-5" />
              </button>
              <button aria-label="通知">
                <Bell className="w-5 h-5" />
              </button>
              <button aria-label="購物車">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* 手機版 (< xl) → 已登入才顯示課程/通知/購物車 */}
          {isAuthenticated && (
            <div className="flex xl:hidden items-center space-x-3">
              <button aria-label="我的課程">
                <BookOpen className="w-5 h-5" />
              </button>
              <button aria-label="通知">
                <Bell className="w-5 h-5" />
              </button>
              <button aria-label="購物車">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* UserMenuContainer：桌機版→頭像/登入按鈕，手機版→漢堡選單 */}
          <UserMenuContainer />
        </div>
      </div>
    </header>
  );
}
