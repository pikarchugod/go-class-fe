import React from "react";

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      {/* container: 與 Navbar / Home 其他區塊對齊 */}
      <div className="container mx-auto px-6 lg:px-20 py-8">
        {/* 
          grid-cols-3 (>= md) → 三欄 
          grid-cols-1 (< md) → 一欄直排 
          gap-8 → 欄間距
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 關於 */}
          <div>
            <h3 className="font-bold mb-3">關於</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  關於我們
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  合作夥伴
                </a>
              </li>
            </ul>
          </div>

          {/* 幫助 */}
          <div>
            <h3 className="font-bold mb-3">幫助</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  常見問題
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  使用教學
                </a>
              </li>
            </ul>
          </div>

          {/* 社群 */}
          <div>
            <h3 className="font-bold mb-3">社群</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  LINE
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 
          若需要版權聲明，可加在下方 
          <div className="mt-8 text-sm text-gray-500">
            © 2025 GoChess. All rights reserved.
          </div>
        */}
      </div>
    </footer>
  );
}
