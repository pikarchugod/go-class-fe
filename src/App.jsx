// src/App.jsx
import React from "react";
import AppRouter from "@/router/index";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/ui/navbar/Navbar";
import { Footer } from "@/components/ui/footer/Footer";
import { TestPage } from "@/pages/TestPage";


export function App() {
  return (
    
      <AuthProvider>
        <div className="min-h-screen bg-background">
        <Navbar />
        <AppRouter />
        <Footer />
        </div>
      </AuthProvider>
    
  );
}

export default App;
