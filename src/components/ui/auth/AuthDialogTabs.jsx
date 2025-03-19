// src/components/auth/AuthDialogTabs.jsx
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
// ShadCN UI
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

export function AuthDialogTabs({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [tabValue, setTabValue] = useState("login");

  // 表單欄位
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // 註冊用
  const [errorMsg, setErrorMsg] = useState("");

  // 切換標籤
  const handleTabChange = (value) => {
    setTabValue(value);
    setEmail("");
    setPassword("");
    setName("");
    setErrorMsg("");
  };

  // 送出表單
  const handleSubmit = async () => {
    setErrorMsg("");
    try {
      let result;
      if (tabValue === "login") {
        // 呼叫 AuthContext.login()
        result = await login({ email, password });
      } else {
        // 呼叫 AuthContext.register()
        result = await register({ name, email, password });
      }
      if (!result.success) {
        throw result.error || new Error("操作失敗");
      }
      // 成功 => 關閉彈窗
      onClose();
    } catch (error) {
      setErrorMsg(error?.message || "操作失敗，請稍後再試");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tabValue === "login" ? "登入" : "註冊"}
          </DialogTitle>
          <DialogDescription>
            {tabValue === "login"
              ? "請輸入 Email 與密碼登入"
              : "建立你的帳號，開始使用服務"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tabValue} onValueChange={handleTabChange} className="mt-2">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">登入</TabsTrigger>
            <TabsTrigger value="register">註冊</TabsTrigger>
          </TabsList>

          {/* ======== 登入內容 ======== */}
          <TabsContent value="login">
            <div className="space-y-3">
              <Input
                placeholder="電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMsg && (
              <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
            )}
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
            <div className="space-y-3">
              <Input
                placeholder="姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMsg && (
              <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              註冊後，即表示已同意 使用條款 和 隱私政策
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
