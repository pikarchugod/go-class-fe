// src/components/ui/sort/SortDropdown.jsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // 路徑依你專案結構調整

// 定義排序選項
const sortOptions = [
  { value: "relevant", label: "最相關" },
  { value: "rating", label: "依評價" },
  { value: "price_low", label: "價格較低" },
  { value: "price_high", label: "價格較高" },
  { value: "time_asc", label: "時間較早" },
  { value: "time_desc", label: "時間較晚" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="排序方式" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
