import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/ui/navbar/Navbar";

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="p-4">
          <h1>首頁內容</h1>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
