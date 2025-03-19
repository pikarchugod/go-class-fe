// src/App.jsx
import React from "react";
import AppRouter from "@/router/index";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/ui/navbar/Navbar";
import { Footer } from "@/components/ui/footer/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
