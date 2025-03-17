import React, { useState } from "react";
// ShadCN UI
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// 若要呼叫 AuthContext，可在這裡匯入
// import { useAuth } from "@/contexts/AuthContext";

export function AuthDialogTabs({ isOpen, onClose }) {
  // 若要整合到 AuthContext，可以在此取得 login, register 等函式
  // const { login, register } = useAuth();

  // 切換登入 / 註冊的狀態
  const [tabValue, setTabValue] = useState("login");

  // ===== 以下為表單用的狀態 =====
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // 假的提交行為：示範用
  const handleSubmit = () => {
    if (tabValue === "login") {
      console.log("執行登入", { account, password, rememberMe });
      // login({ account, password, rememberMe });
    } else {
      console.log("執行註冊", { email, account, password });
      // register({ email, account, password });
    }
    // 成功後關閉
    onClose();
  };

  // Google 登入 / 註冊示範
  const handleGoogle = () => {
    alert(`使用 Google ${tabValue === "login" ? "登入" : "註冊"}...`);
  };

  // 當切換標籤時，清空表單 (可自行決定是否保留)
  const handleTabChange = (value) => {
    setTabValue(value);
    setEmail("");
    setAccount("");
    setPassword("");
    setRememberMe(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        
        {/* 這裡使用 Tabs 元件，切換「登入 / 註冊」 */}
        <Tabs value={tabValue} onValueChange={handleTabChange}>
          {/* 上方的兩個按鈕 (登入 / 註冊) */}
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">登入</TabsTrigger>
            <TabsTrigger value="register">註冊</TabsTrigger>
          </TabsList>

          {/* ======== 登入內容 ======== */}
          <TabsContent value="login">
            {/* Google 按鈕 + 文字 */}
            <Button
              variant="outline"
              className="w-full mb-3"
              onClick={handleGoogle}
            >
              使用 Google 登入
            </Button>
            <p className="text-center text-sm text-gray-500 mb-4">
              或使用帳號密碼登入
            </p>

            {/* 帳號 / 密碼 */}
            <div className="space-y-3">
              {/* 帳號 */}
              <div>
                <Input
                  placeholder="帳號"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                />
              </div>
              {/* 密碼 */}
              <div>
                <Input
                  type="password"
                  placeholder="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* 記住我 & 忘記密碼 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                  />
                  <span>記住我</span>
                </label>
                <button className="text-sm text-blue-500 hover:underline">
                  忘記密碼？
                </button>
              </div>
            </div>

            {/* 登入按鈕 */}
            <DialogFooter className="mt-4">
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={handleSubmit}
              >
                登入
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* ======== 註冊內容 ======== */}
          <TabsContent value="register">
            {/* Google 按鈕 + 文字 */}
            <Button
              variant="outline"
              className="w-full mb-3"
              onClick={handleGoogle}
            >
              使用 Google 註冊
            </Button>
            <p className="text-center text-sm text-gray-500 mb-4">
              或建立你的帳號
            </p>

            {/* 電子郵件 / 帳號 / 密碼 */}
            <div className="space-y-3">
              {/* 電子郵件 */}
              <div>
                <Input
                  type="email"
                  placeholder="電子郵件"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* 帳號 */}
              <div>
                <Input
                  placeholder="帳號"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                />
              </div>
              {/* 密碼 */}
              <div>
                <Input
                  type="password"
                  placeholder="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* 使用條款提示 */}
            <p className="text-xs text-gray-500 mt-2">
              註冊後，即表示已同意{" "}
              <a className="text-blue-500 hover:underline" href="#terms">
                使用條款
              </a>{" "}
              和{" "}
              <a className="text-blue-500 hover:underline" href="#privacy">
                隱私政策
              </a>
            </p>

            {/* 註冊按鈕 */}
            <DialogFooter className="mt-4">
              <Button
                className="w-full bg-[#8B5E34] hover:bg-[#7a4f2d] text-white"
                onClick={handleSubmit}
              >
                註冊
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
