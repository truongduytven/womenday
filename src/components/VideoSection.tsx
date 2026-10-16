"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-white border-b border-[#F5CAD6] shadow-[inset_0_1px_3px_rgba(217,54,94,0.03)]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-[#F45B8A]/15 via-[#FFF0F4]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with generous spacing */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F4] border border-[#F8D7E0] text-xs font-bold tracking-widest text-[#D9365E] uppercase shadow-xs mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#D9365E]" />
            <span>Thước Phim Tri Ân</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#30252B] leading-tight mb-4">
            Khoảnh khắc tôn vinh phái đẹp
          </h2>
          <p className="text-base sm:text-lg text-[#6B5E66] leading-relaxed max-w-xl">
            Từng cánh hoa nở rộ đọng sương mai như nét đẹp dịu dàng nhưng tràn đầy
            bản lĩnh của những người phụ nữ Global Care đang cùng nhau làm nên
            điều khác biệt mỗi ngày.
          </p>
        </div>

        {/* Cinematic Video Showcase Banner - Enlarged */}
        <div className="relative max-w-6xl mx-auto">
          {/* Ambient Glowing Backlight */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#F45B8A]/35 via-[#D9365E]/25 to-[#FF9E80]/30 rounded-[42px] blur-2xl -z-10 animate-pulse-subtle" />

          {/* Video Container (16:9 widescreen) */}
          <div className="relative aspect-[16/9] w-full rounded-[36px] overflow-hidden border-2 border-white/95 shadow-2xl bg-[#FFEAEF] group">
            <video
              src="/video_womenday.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controls={false}
              className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
            />

            {/* Subtle cinematic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

            {/* Top Glass Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-xs font-bold text-[#D9365E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D9365E] animate-pulse" />
              <span>20.10.2026 · Global Care Celebration</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex items-center justify-between text-white text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-[#F45B8A] text-[#F45B8A]" />
                <span className="font-semibold drop-shadow-md">
                  Gửi một lời thương, trao ngàn điều tử tế
                </span>
              </div>
              <span className="text-[11px] font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 hidden sm:inline-block">
                #GlobalCareWomen2010
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
