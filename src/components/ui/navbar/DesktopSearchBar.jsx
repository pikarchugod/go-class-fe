import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DesktopSearchBar({ placeholder, keyword, setKeyword, onSearchSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  const handleClear = () => {
    setKeyword("");
  };

  return (
    <div className="hidden xl:block"> 
      {/* 只在 xl 以上顯示 */}
      <div className="relative max-w-md">
        {/* 放大鏡 Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        {/* 輸入框 */}
        <Input
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10" 
          // 左側留空給放大鏡，右側留空給 X
        />

        {/* 右側 X 按鈕 (清空) */}
        {keyword.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
