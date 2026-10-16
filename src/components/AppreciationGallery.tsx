"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Sun, Smile, Compass } from "lucide-react";

export default function AppreciationGallery() {
  const highlights = [
    {
      icon: Sparkles,
      title: "Góc nhìn độc đáo & Sáng tạo",
      quote: "Cảm ơn nàng vì luôn mang đến những góc nhìn tuyệt vời trong từng dự án và sản phẩm.",
      color: "from-[#F45B8A]/10 to-[#FFF0F4]",
      accent: "text-[#D9365E]",
    },
    {
      icon: Sun,
      title: "Sự tận tâm & Bền bỉ",
      quote: "Sự tận tâm và tinh tế của nàng tạo nên những khác biệt lớn lao cho khách hàng và đối tác.",
      color: "from-[#F59E0B]/10 to-[#FFF7ED]",
      accent: "text-[#D97706]",
    },
    {
      icon: Smile,
      title: "Năng lượng tích cực",
      quote: "Nụ cười và sự nhiệt thành của các bạn luôn thắp sáng không gian làm việc mỗi ngày.",
      color: "from-[#10B981]/10 to-[#ECFDF5]",
      accent: "text-[#059669]",
    },
    {
      icon: Compass,
      title: "Bản lĩnh & Tự tin",
      quote: "Mong nàng luôn kiên định, tự tin, hạnh phúc và tỏa sáng rực rỡ theo cách rất riêng.",
      color: "from-[#6366F1]/10 to-[#EEF2FF]",
      accent: "text-[#4F46E5]",
    },
  ];

  return (
    <section id="appreciation" className="py-20 bg-white/70 border-y border-[#F8D7E0]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F4] border border-[#F8D7E0] text-xs font-bold tracking-widest text-[#D9365E] uppercase shadow-xs mb-5">
            Vinh Danh Phái Đẹp
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#30252B] leading-tight mb-4">
            Những điều tuyệt vời mang tên nàng
          </h2>
          <p className="text-base text-[#6B5E66] leading-relaxed max-w-xl">
            Mỗi người phụ nữ mang đến một màu sắc riêng, một cách tử tế riêng và
            một nguồn cảm hứng rất riêng cho hành trình chung của chúng ta tại
            Global Care.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Art */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-[#F8D7E0] min-h-[360px] lg:min-h-full group">
            <Image
              src="/images/appreciation_women.jpg"
              alt="Women of Global Care in modern creative workplace"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#30252B]/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1.5">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#FEF08A]">
                  Global Care Culture
                </p>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Tôn trọng · Bình đẳng · Đồng hành
                </h3>
                <p className="text-xs text-white/80">
                  Nơi mỗi tài năng nữ đều có không gian để cất cánh và ghi dấu ấn.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Thoughtful short statements */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border border-[#F8D7E0] hover:border-[#F45B8A] transition-all duration-300 hover:shadow-md flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-white shadow-sm ${item.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-[#30252B]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#4D3A44] leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F8D7E0]/40 flex items-center justify-between text-[11px] text-[#8C7A83]">
                    <span>#GlobalCare2010</span>
                    <span className="font-semibold text-[#D9365E]">Trân trọng</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
