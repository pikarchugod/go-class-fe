import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 子元件
import { DesktopSearchBar } from "./DesktopSearchBar";
import { MobileSearchTrigger } from "./MobileSearchTrigger";
import { MobileSearchModal } from "./MobileSearchModal";

export function SearchBarContainer({ placeholder = "搜尋你想要的課程", onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  // 觸發搜尋時
  const handleSearchSubmit = () => {
    if (!keyword.trim()) return; // 空字串就不處理
    if (onSearch) {
      // 若父層有客製搜尋行為
      onSearch(keyword);
    } else {
      // 預設行為：導向 /courses/search?keyword=xxx
      navigate(`/courses/search?keyword=${encodeURIComponent(keyword)}`);
    }
    // 清空關鍵字
    setKeyword("");
    // 關閉手機版視窗
    setIsMobileSearchOpen(false);
  };

  return (
    <div className="flex items-center">
      {/* 桌機版 (>= xl) */}
      <DesktopSearchBar
        placeholder={placeholder}
        keyword={keyword}
        setKeyword={setKeyword}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* 手機版 (< xl) 放大鏡圖示 */}
      <MobileSearchTrigger onOpen={() => setIsMobileSearchOpen(true)} />

      {/* 手機版 全螢幕搜尋視窗 */}
      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        placeholder={placeholder}
        keyword={keyword}
        setKeyword={setKeyword}
        onSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
}
