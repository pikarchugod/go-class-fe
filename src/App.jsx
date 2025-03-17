// src/App.jsx
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/ui/navbar/Navbar";

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">首頁內容</h1>
          <p>這裡是你的首頁。</p>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
