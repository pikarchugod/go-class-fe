import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/ui/navbar/Navbar";
import { HeroCarousel } from "@/components/ui/home/HeroCarousel";
import { CoursesRecommend } from "@/components/ui/home/CoursesRecommend";




export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        
        <HeroCarousel />
        <CoursesRecommend />
      </div>
    </AuthProvider>
  );
}

export default App;
