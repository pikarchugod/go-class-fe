import React from "react";
import { Search } from "lucide-react";

export function MobileSearchTrigger({ onOpen }) {
  return (
    <button
      type="button"
      className="xl:hidden inline-flex items-center justify-center"
      onClick={onOpen}
    >
      <Search className="w-6 h-6" />
    </button>
  );
}
