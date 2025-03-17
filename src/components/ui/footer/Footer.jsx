// src/components/ui/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-6 text-sm flex justify-between">
        <div>© 2025 GoBoard Inc. All rights reserved.</div>
        <div className="flex gap-4">
          <Link to="/faq" className="hover:underline">
            常見問題
          </Link>
          <Link to="/about" className="hover:underline">
            關於我們
          </Link>
        </div>
      </div>
    </footer>
  );
}
