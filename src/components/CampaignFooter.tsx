"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";

export default function CampaignFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#FFE6EE] via-[#FFD9E5] to-[#FFCCDC] border-t-2 border-[#F3AFC1] pt-24 pb-14 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/60 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
        {/* Closing Headline & Message */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#F8D7E0] text-xs font-bold text-[#D9365E] shadow-xs mb-5">
            <Heart className="w-3.5 h-3.5 fill-[#D9365E]" />
            <span>Lan Tỏa Yêu Thương</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#30252B] leading-tight mb-4">
            Gửi một lời chúc. Lan tỏa một ngày vui.
          </h2>

          <p className="text-base sm:text-lg text-[#6B5E66] max-w-2xl mx-auto leading-relaxed">
            Chúc tất cả những người phụ nữ của Globalcare luôn được yêu thương,
            được lắng nghe, được trân trọng và luôn tự tin theo đuổi những điều
            mình mong muốn.
          </p>
        </div>

        {/* Closing CTA */}
        <div>
          <a
            href="#composer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F45B8A] to-[#D9365E] text-white font-bold text-sm shadow-lg shadow-[#D9365E]/25 hover:shadow-xl hover:shadow-[#D9365E]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gửi thêm một lời chúc</span>
          </a>
        </div>

        {/* Divider */}
        <div className="pt-10 border-t border-[#F8D7E0]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7882]">
          {/* Logo & Year */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-24 relative">
              <Image
                src="/globalcare-logo.webp"
                alt="Global Care"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-[#8A7882]">·</span>
            <span className="font-semibold text-[#4D3A44]">
              Vietnamese Women&apos;s Day · 20.10.2026
            </span>
          </div>

          {/* Slogan & Official Link */}
          <div className="flex items-center gap-4">
            <p className="hidden md:block italic text-[11px] text-[#A08E97]">
              &ldquo;Technology helps deliver the message, but sincerity is the gift.&rdquo;
            </p>
            <a
              href="https://globalcare.com.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A437E] hover:underline font-semibold"
            >
              Trang chủ Global Care ↗
            </a>
          </div>
        </div>

        <p className="text-[11px] text-[#A898A1] pt-2">
          © 2026 Global Care Corporation. Chiến dịch kỷ niệm nội bộ Ngày Phụ Nữ Việt Nam 20/10.
        </p>
      </div>
    </footer>
  );
}
