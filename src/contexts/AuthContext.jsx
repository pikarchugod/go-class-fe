// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/api/axios";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // App 啟動時，若 localStorage 有 token，設置 axios header 並嘗試 fetchUser
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser(); // 看 token 是否有效
    }
  }, []);

  // 登入
  async function login({ email, password }) {
    try {
      // POST /login => { token, user }
      const res = await axiosInstance.post("/login", { email, password });
      const { token, user } = res.data;
      // 存 token
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("登入失敗:", error);
      return { success: false, error };
    }
  }

  // 註冊
  async function register({ name, email, password }) {
    try {
      // POST /register => { token, user }
      const res = await axiosInstance.post("/register", { name, email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("註冊失敗:", error);
      return { success: false, error };
    }
  }

  // 取得使用者資料
  async function fetchUser() {
    try {
      const res = await axiosInstance.get("/user");
      setUser(res.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      console.error("取得使用者資料失敗:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  // 登出
  async function logout() {
    try {
      await axiosInstance.post("/logout"); // 後端刪除 token
    } catch (error) {
      console.error("登出失敗:", error);
    } finally {
      // 不管成功失敗，都清除 token
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    fetchUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
