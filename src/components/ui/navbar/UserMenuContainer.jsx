import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialogTabs } from "@/components/ui/auth/AuthDialogTabs";
// ShadCN UI - 請依你實際路徑匯入
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// Lucide Icons
import { Menu, User } from "lucide-react";

/**
 * UserMenuContainer
 * - 桌機版：
 *   - 未登入：顯示「登入 / 註冊」按鈕，點擊彈出 AuthDialogTabs
 *   - 已登入：顯示頭像，點擊展開 DropdownMenu
 * - 手機版：
 *   - 永遠顯示「漢堡」icon，點擊後展開 Sheet (Drawer)
 *   - 未登入：Sheet 內顯示「登入 / 註冊」按鈕 (開啟 AuthDialog)
 *   - 已登入：Sheet 內顯示頭像 + 「登出」等選單
 */
export function UserMenuContainer() {
  const { isAuthenticated, user, logout } = useAuth();
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // 開啟 / 關閉 AuthDialog
  const handleOpenDialog = () => setOpenAuthDialog(true);
  const handleCloseDialog = () => setOpenAuthDialog(false);

  // 假裝頭像 (Avatar) 只有一個 User icon
  // 你也可以用 ShadCN 的 Avatar 元件 + user.avatarUrl
  const AvatarButton = (
    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-300">
      <User className="w-5 h-5" />
    </button>
  );

  // 桌機版顯示：未登入 → [登入/註冊]，已登入 → [頭像 + 下拉]
  const DesktopView = (
    <div className="hidden xl:flex items-center space-x-4">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {AvatarButton}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-sm">
              {`歡迎，${user?.name || "使用者"}`}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm text-red-500"
              onClick={logout}
            >
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
          onClick={handleOpenDialog}
        >
          登入 / 註冊
        </Button>
      )}
    </div>
  );

  // 手機版顯示：一個「漢堡」icon，點擊後展開 Sheet
  const MobileView = (
    <div className="xl:hidden">
      <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
        <SheetTrigger asChild>
          <button type="button" className="inline-flex items-center">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[80%] sm:w-[300px] p-4">
          <SheetHeader>
            {/* 這裡可以放 Logo / 或 "選單" 文字 */}
          </SheetHeader>
          <div className="mt-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  {AvatarButton}
                  <span>{user?.name || "使用者"}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setOpenMobileMenu(false);
                  }}
                  className="text-red-500 text-left"
                >
                  登出
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpenMobileMenu(false);
                  handleOpenDialog(); // 打開登入 / 註冊 Dialog
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                登入 / 註冊
              </button>
            )}
          </div>
          <SheetFooter>
            {/* 若有其他選單項目，如「我的課程 / 我的訂單」，可放這裡 */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <div className="flex items-center">
      {DesktopView}
      {MobileView}

      {/* AuthDialog */}
      <AuthDialogTabs
        isOpen={openAuthDialog}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
