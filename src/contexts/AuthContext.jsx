import React, { createContext, useContext, useState } from "react";

// 建立 Context
const AuthContext = createContext(null);

// 提供一個 custom hook，方便其他組件使用
export function useAuth() {
  return useContext(AuthContext);
}

// 建立 Provider，包在最外層 (e.g. App.jsx) 讓整個應用都可取用
export function AuthProvider({ children }) {
  // 基本狀態：是否已登入、使用者資訊
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ======== 登入 ========
  async function login({ email, password }) {
    try {
      // TODO: 呼叫你的後端 API，例如：
      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // if (data.success) { 
      //   // 假設後端回傳 token & user
      //   localStorage.setItem("token", data.token);
      //   setUser(data.user);
      //   setIsAuthenticated(true);
      // } else {
      //   throw new Error(data.message || "登入失敗");
      // }

      // 為了測試方便，先用假資料模擬成功
      const fakeUser = { id: 1, name: "測試用戶", avatarUrl: "" };
      localStorage.setItem("token", "fake_jwt_token");
      setUser(fakeUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("登入失敗：", error);
      return { success: false, error };
    }
  }

  // ======== 註冊 ========
  async function register({ email, password }) {
    try {
      // TODO: 呼叫後端 /api/register
      // const response = await fetch("/api/register", { ... });
      // const data = await response.json();
      // if (data.success) {
      //   // 註冊後可直接登入
      //   localStorage.setItem("token", data.token);
      //   setUser(data.user);
      //   setIsAuthenticated(true);
      // } else {
      //   throw new Error(data.message || "註冊失敗");
      // }

      // 測試用假資料
      const fakeUser = { id: 2, name: "新用戶", avatarUrl: "" };
      localStorage.setItem("token", "fake_jwt_token");
      setUser(fakeUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("註冊失敗：", error);
      return { success: false, error };
    }
  }

  // ======== 登出 ========
  function logout() {
    // 清除 token & 狀態
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
