// src/components/course-detail/CourseTabs.jsx
import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import CourseIntroduction from "./CourseIntroduction";
import CourseChapters from "./CourseChapters";
import CourseQnA from "./CourseQnA";

export default function CourseTabs({ course }) {
  const [tab, setTab] = useState("introduction");

  return (
    <div className="container mx-auto px-4 lg:px-20 pb-6">
      <Tabs value={tab} onValueChange={setTab}>
        {/* 父層加上 flex justify-center 或 TabsList 本身加上 className */}
        <div className="flex justify-center mb-4">
          <TabsList className="inline-flex">
            <TabsTrigger value="introduction">介紹</TabsTrigger>
            <TabsTrigger value="chapters">章節</TabsTrigger>
            <TabsTrigger value="qna">問答</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="introduction">
          <CourseIntroduction course={course} />
        </TabsContent>
        <TabsContent value="chapters">
          <CourseChapters course={course} />
        </TabsContent>
        <TabsContent value="qna">
          <CourseQnA course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
