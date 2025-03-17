// src/components/auth/AuthDialogTabs.jsx
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

// ShadCN UI - 請依照你實際的檔案路徑匯入
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function AuthDialogTabs({ isOpen, onClose }) {
  const { login, register } = useAuth();

  // 用來切換「login」或「register」
  const [tabValue, setTabValue] = useState("login");

  // 表單狀態
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // 錯誤訊息
  const [errorMsg, setErrorMsg] = useState("");

  // 切換 Tab 時重置表單
  const handleTabChange = (value) => {
    setTabValue(value);
    setEmail("");
    setAccount("");
    setPassword("");
    setRememberMe(false);
    setErrorMsg("");
  };

  // Google 登入 / 註冊示範
  const handleGoogle = () => {
    alert(`使用 Google ${tabValue === "login" ? "登入" : "註冊"} (尚未實作)`);
  };

  // 送出表單
  const handleSubmit = async () => {
    setErrorMsg("");

    try {
      if (tabValue === "login") {
        // 登入
        const result = await login({ account, password });
        if (!result.success) {
          throw result.error || new Error("登入失敗");
        }
      } else {
        // 註冊
        const result = await register({ email, account, password });
        if (!result.success) {
          throw result.error || new Error("註冊失敗");
        }
      }
      // 成功後關閉
      onClose();
    } catch (error) {
      setErrorMsg(error?.message || "操作失敗，請稍後再試");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-labelledby="auth-dialog-title"
        className="sm:max-w-md"
      >
        {/* DialogHeader: Title & Description */}
        <DialogHeader>
          <DialogTitle id="auth-dialog-title">
            {tabValue === "login" ? "登入" : "註冊"}
          </DialogTitle>
          <DialogDescription id="auth-dialog-description">
            {tabValue === "login" ? "請輸入帳號密碼登入" : "建立你的帳號，開始使用服務"}
          </DialogDescription>
        </DialogHeader>

        {/* 使用 Tabs 切換登入 / 註冊 */}
        <Tabs value={tabValue} onValueChange={handleTabChange} className="mt-2">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">登入</TabsTrigger>
            <TabsTrigger value="register">註冊</TabsTrigger>
          </TabsList>

          {/* ========== 登入內容 ========== */}
          <TabsContent value="login">
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

            {/* 帳號 & 密碼 */}
            <div className="space-y-3">
              <Input
                placeholder="帳號"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
              <Input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* 記住我 / 忘記密碼 */}
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
            {/* 錯誤訊息 */}
            {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

            <DialogFooter className="mt-4">
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={handleSubmit}
              >
                登入
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* ========== 註冊內容 ========== */}
          <TabsContent value="register">
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

            {/* 電子郵件 & 帳號 & 密碼 */}
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="帳號"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
              <Input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* 錯誤訊息 */}
            {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

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
