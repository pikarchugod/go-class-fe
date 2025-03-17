import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function MobileSearchModal({
  isOpen,
  onClose,
  placeholder,
  keyword,
  setKeyword,
  onSearchSubmit,
}) {
  if (!isOpen) return null; // 沒開啟就不顯示

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4">
      {/* 搜尋輸入框容器 */}
      <div className="relative w-full max-w-[375px] mx-auto">
        {/* 放大鏡 Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        {/* 輸入框 */}
        <Input
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10" 
        />

        {/* 右側 X 按鈕 (關閉視窗) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
