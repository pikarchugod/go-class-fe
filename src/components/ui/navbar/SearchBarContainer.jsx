// src/components/ui/navbar/SearchBarContainer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopSearchBar } from "./DesktopSearchBar";
import { MobileSearchTrigger } from "./MobileSearchTrigger";
import { MobileSearchModal } from "./MobileSearchModal";

export function SearchBarContainer({ placeholder = "搜尋你想要的課程", onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    // 若輸入為空，就不處理
    if (!keyword.trim()) return;

    if (onSearch) {
      // 如果父層傳入自訂 onSearch，就用父層的方法
      onSearch(keyword);
    } else {
      // 否則預設行為：跳轉到 /courses?search=xxx
      navigate(`/courses?search=${encodeURIComponent(keyword)}`);
    }

    // 清空輸入
    setKeyword("");
    setIsMobileSearchOpen(false);
  };

  return (
    <div className="flex items-center">
      {/* 桌機版輸入框 */}
      <DesktopSearchBar
        placeholder={placeholder}
        keyword={keyword}
        setKeyword={setKeyword}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* 手機版放大鏡 + 全螢幕搜尋 */}
      <MobileSearchTrigger onOpen={() => setIsMobileSearchOpen(true)} />
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
