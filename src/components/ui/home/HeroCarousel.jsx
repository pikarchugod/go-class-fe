import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper 的 CSS
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "@/assets/images/hero/slide1.png";
import slide2 from "@/assets/images/hero/slide2.png";
import slide3 from "@/assets/images/hero/slide3.png";
import slide4 from "@/assets/images/hero/slide4.png";
import slide5 from "@/assets/images/hero/slide5.png";
import slide6 from "@/assets/images/hero/slide6.png";

export function HeroCarousel() {
  // 假資料：依需求換成真實圖片
  const slides = [
    { id: 1, image: slide1, alt: "輪播圖 1" },
    { id: 2, image: slide2, alt: "輪播圖 2" },
    { id: 3, image: slide3, alt: "輪播圖 3" },
    { id: 4, image: slide4, alt: "輪播圖 4" },
    { id: 5, image: slide5, alt: "輪播圖 5" },
    { id: 6, image: slide6, alt: "輪播圖 6" },
  ];

  // 如果 slides < 3，啟用 loop 會有警告，所以可做條件判斷
  const enableLoop = slides.length >= 3;

  return (
    <div 
      className="container mx-auto 
                 px-6 lg:px-20 py-4 
                 bg-background text-foreground"
    >
      {/* 
        container：Tailwind Container（可配合你的 config）
        px-6：手機版左右24px邊距
        lg:px-20：桌機版左右80px邊距
        py-4：上下16px
      */}
      
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={enableLoop}
        spaceBetween={16} 
        // 手機 / 桌機不同間距可在 breakpoints 再細分
        breakpoints={{
          // 手機版（0~639px）: 顯示1張
          0: {
            slidesPerView: 1,
            spaceBetween: 16, // 16px 間距
          },
          // 平板 ~ 中桌機（640~1279px）: 你可視需求顯示1或2張
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          // 大桌機（>=1280px）: 顯示3張
          1280: {
            slidesPerView: 3,
            spaceBetween: 24, // 24px 間距
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="mx-auto w-[279px]"
              // w-[279px]: 每張卡片的寬度(電腦版設計)
              // 在手機版會因 slidesPerView=1 而自動縮放
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
