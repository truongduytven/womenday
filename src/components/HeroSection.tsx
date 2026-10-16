"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Flower2 } from "lucide-react";
import GreetingCard, { CardData } from "./GreetingCard";

const SAMPLE_LETTERS: CardData[] = [
  {
    message:
      "Mỗi ngày làm việc cùng các chị em Global Care là một ngày tràn đầy năng lượng và cảm hứng. Cảm ơn sự chu đáo, tinh tế và bản lĩnh của các bạn!",
    senderName: "Khối Công Nghệ & Sản Phẩm",
    senderDepartment: "Global Care Tech Team",
    cardTheme: "bloom",
  },
  {
    message:
      "Chúc các nữ thần Global Care một ngày 20/10 cười thả ga, việc gì cũng hanh thông, ví luôn rủng rỉnh và ngày nào đi làm cũng tràn đầy hoa cùng trà sữa!",
    senderName: "Product & Design Team",
    senderDepartment: "Product Development",
    cardTheme: "joy",
  },
  {
    message:
      "Mỗi người phụ nữ tại Global Care đều là một đóa hoa độc bản với bản lĩnh và tài năng phi thường. Cảm ơn sự cống hiến bền bỉ của các bạn cho hành trình chung!",
    senderName: "Ban Lãnh Đạo",
    senderDepartment: "Board of Directors",
    cardTheme: "celebration",
  },
];

export default function HeroSection() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  // Automatically loop between the 3 letters every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLetterIndex((prev) => (prev + 1) % SAMPLE_LETTERS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const activeCard = SAMPLE_LETTERS[currentLetterIndex];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFEAF1] to-[#FFE0EB] border-b border-[#F7C2D1]">
      {/* Decorative floating petal elements */}
      <div className="absolute top-20 left-10 w-12 h-12 text-[#F45B8A]/30 animate-float-slow pointer-events-none hidden md:block">
        <Flower2 className="w-full h-full rotate-12" />
      </div>
      <div className="absolute top-44 right-12 w-10 h-10 text-[#D9365E]/20 animate-float-gentle pointer-events-none hidden md:block">
        <Heart className="w-full h-full fill-current" />
      </div>
      <div className="absolute bottom-10 left-1/4 w-8 h-8 text-[#F45B8A]/25 animate-float-slow pointer-events-none hidden lg:block">
        <Flower2 className="w-full h-full" />
      </div>

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F45B8A]/15 via-[#FFF0F4]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#F8D7E0] shadow-xs backdrop-blur-sm mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9365E] animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-[#D9365E] uppercase">
                GLOBALCARE CELEBRATES WOMEN&apos;S DAY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#30252B] leading-[1.15]">
              20/10 —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9365E] via-[#F45B8A] to-[#E04877]">
                Gửi nàng một điều tử tế
              </span>
            </h1>

            {/* Campaign Core Quote */}
            <p className="text-sm sm:text-base font-serif italic text-[#D9365E]/90 bg-[#FFF0F4]/80 px-4 py-2 rounded-xl inline-block border border-[#F8D7E0]">
              &ldquo;20/10 — Gửi một lời thương, trao ngàn điều tử tế.&rdquo;
            </p>

            {/* Extended Narrative Paragraphs filling the space of the removed action buttons */}
            <div className="space-y-4 text-base sm:text-lg text-[#5C4D55] leading-relaxed max-w-xl mx-auto lg:mx-0 pt-1">
              <p>
                Mỗi người phụ nữ tại Global Care đều sở hữu một bản sắc rực rỡ và
                nguồn cảm hứng rất riêng — từ sự kiên cường, tận tâm trong từng
                dự án đến nụ cười ấm áp thắp sáng không gian làm việc mỗi ngày.
              </p>
              <p>
                Ngày Phụ Nữ Việt Nam 20/10 là dịp đặc biệt để tất cả chúng ta cùng
                chậm lại, lắng nghe và gửi trao những điều tử tế nhất. Dù là một lời
                cảm ơn chân thành, một câu chúc ấm lòng hay một cử chỉ sẻ chia giản đơn,
                tất cả đều là những đóa hoa tươi thắm tri ân những cống hiến thầm lặng
                của phái đẹp.
              </p>
              <p className="text-sm font-medium text-[#D9365E] italic">
                Cùng nhau lan tỏa yêu thương và ghi dấu những khoảnh khắc tuyệt vời này nhé!
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Letter Box (Rotating between 3 letters) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Back decorative artwork layer */}
              <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/60 opacity-90 hidden sm:block">
                <Image
                  src="/images/hero_floral.jpg"
                  alt="Floral Celebration Art"
                  fill
                  className="object-cover"
                />
              </div>

              {/* The Active Letter Card with Smooth Keyed Transition */}
              <div
                key={currentLetterIndex}
                className="relative z-10 transform sm:-rotate-1 hover:rotate-0 transition-all duration-500 animate-in fade-in zoom-in-95"
              >
                <GreetingCard card={activeCard} className="shadow-2xl" />
              </div>

              {/* Carousel Indicator Dots & Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-[#F8D7E0]">
                {/* 3 Letter Dots */}
                <div className="flex items-center gap-1.5">
                  {SAMPLE_LETTERS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentLetterIndex(idx)}
                      title={`Xem bức thư số ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentLetterIndex
                          ? "w-6 bg-[#D9365E]"
                          : "w-2 bg-[#F8D7E0] hover:bg-[#F45B8A]"
                      }`}
                    />
                  ))}
                </div>

                <div className="h-3 w-px bg-[#F8D7E0]" />

                <span className="text-[11px] font-semibold text-[#D9365E] whitespace-nowrap">
                  Thư tri ân {currentLetterIndex + 1}/3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
