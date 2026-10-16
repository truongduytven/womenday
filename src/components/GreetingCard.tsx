"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Flower2, Award } from "lucide-react";

export interface CardData {
  id?: string;
  publicId?: string;
  message: string;
  senderName?: string | null;
  senderDepartment?: string | null;
  cardTheme: string;
  imageUrl?: string | null;
  createdAt?: string | Date;
}

interface GreetingCardProps {
  card: CardData;
  className?: string;
  isExporting?: boolean;
}

export default function GreetingCard({ card, className = "", isExporting = false }: GreetingCardProps) {
  const { message, senderName, senderDepartment, cardTheme = "bloom", imageUrl } = card;

  // Fallback default floral image per theme if user has not uploaded custom photo
  const defaultThemeImages: Record<string, string> = {
    bloom: "/images/floral_bloom.jpg",
    joy: "/images/floral_joy.jpg",
    minimal: "/images/floral_minimal.jpg",
    celebration: "/images/floral_celebration.jpg",
  };

  const displayImage =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl.trim()
      : defaultThemeImages[cardTheme] || defaultThemeImages.bloom;

  const isCustomUserImage = Boolean(imageUrl && imageUrl.trim() !== "");

  // ==========================================
  // 1. THEME: JOY (Peach Ranunculus, Warm Coral, Friendly & Uplifting)
  // ==========================================
  if (cardTheme === "joy") {
    return (
      <div
        className={`relative overflow-hidden rounded-[28px] p-6 sm:p-7 transition-all duration-300 ${
          isExporting ? "" : "hover:shadow-2xl hover:-translate-y-0.5"
        } theme-joy text-[#352528] flex flex-col justify-between min-h-[400px] h-full ${className}`}
      >
        {/* Soft decorative flower watermark */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full overflow-hidden opacity-20 pointer-events-none blur-[1px]">
          <Image
            src="/images/floral_joy.jpg"
            alt="Peach Flowers"
            fill
            className="object-cover"
          />
        </div>

        {/* Inner Card Frame */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top Bar: Brand Logo & Occasion Badge */}
          <div className="flex items-center justify-between gap-3 border-b border-[#F5B8A8]/60 pb-3 mb-4">
            <div className="h-6 w-24 relative shrink-0">
              <Image
                src="/globalcare-logo.webp"
                alt="Global Care"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#FDC0B0] text-[11px] font-bold text-[#E04877] shadow-sm whitespace-nowrap shrink-0">
              <Sparkles className="w-3 h-3 text-[#FF9E80] fill-[#FF9E80]" />
              <span>20.10.2026 · Joyful Day</span>
            </div>
          </div>

          {/* Photo Showcase Banner (To, rõ, dễ nhìn cho ảnh người dùng hoặc ảnh phong cách) */}
          <div className="flex items-center gap-4 mb-4 bg-white/70 p-3 sm:p-3.5 rounded-2xl border border-white/90 shadow-sm backdrop-blur-xs">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md shadow-[#FF9E80]/25 shrink-0 bg-[#FFF5F2]">
              <Image
                src={displayImage}
                alt={isCustomUserImage ? "Ảnh kỷ niệm người gửi" : "Peach Ranunculus"}
                fill
                className="object-cover"
                unoptimized={displayImage.startsWith("http") || displayImage.startsWith("blob:")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-bold text-[#D9365E] uppercase tracking-wide truncate">
                Rạng Rỡ & Yêu Đời
              </p>
              <p className="text-[11px] sm:text-xs text-[#7A5B64] font-medium mt-0.5 truncate">
                Gửi trọn niềm vui đến nàng
              </p>
              {isCustomUserImage && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1.5 rounded-full bg-[#FFF0F4] text-[#D9365E] text-[10px] font-semibold border border-[#F8D7E0]">
                  <Sparkles className="w-2.5 h-2.5" /> Ảnh kỷ niệm
                </span>
              )}
            </div>
          </div>

          {/* Card Message: beautifully balanced text */}
          <div className="my-auto py-2 flex-1 flex items-center">
            <p className="text-[15px] sm:text-base leading-[1.7] font-medium text-[#38262C] whitespace-pre-wrap break-words [text-wrap:pretty]">
              {message || "Lời chúc của bạn sẽ xuất hiện tại đây..."}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-3.5 mt-3.5 border-t border-[#F5B8A8]/60 flex items-end justify-between gap-3 text-xs text-[#7A5B64]">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-[#D9365E] truncate">
                {senderName || "Đồng nghiệp"}
              </p>
              {senderDepartment && (
                <p className="text-[11px] text-[#8C6D76] font-medium mt-0.5 truncate">
                  {senderDepartment}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 text-[#E04877] font-semibold text-[11px] border border-[#FDC0B0]/60 whitespace-nowrap shrink-0">
              <Heart className="h-3 w-3 fill-[#E04877]" />
              <span>Thân tặng Global Care</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. THEME: MINIMAL (Modern Editorial, Pure White Orchid, Warm Gray Slate)
  // ==========================================
  if (cardTheme === "minimal") {
    return (
      <div
        className={`relative overflow-hidden rounded-[28px] p-6 sm:p-7 transition-all duration-300 ${
          isExporting ? "" : "hover:shadow-2xl hover:-translate-y-0.5"
        } theme-minimal text-[#2C2428] flex flex-col justify-between min-h-[400px] h-full ${className}`}
      >
        {/* Subtle Orchid Watermark */}
        <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden opacity-15 pointer-events-none blur-[1px]">
          <Image
            src="/images/floral_minimal.jpg"
            alt="White Orchid"
            fill
            className="object-cover"
          />
        </div>

        {/* Inner Card Frame */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top Bar: Brand Logo & Minimal Edition Badge */}
          <div className="flex items-center justify-between gap-3 border-b border-[#E8DFE3] pb-3 mb-4">
            <div className="h-6 w-24 relative shrink-0">
              <Image
                src="/globalcare-logo.webp"
                alt="Global Care"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#7E6F79] uppercase px-2.5 py-1 rounded bg-[#FAF8F9] border border-[#E8DFE3] whitespace-nowrap shrink-0">
              20.10.2026 · EDITION
            </div>
          </div>

          {/* Photo Showcase Banner (To, rõ, dễ nhìn) */}
          <div className="flex items-center gap-4 mb-4 p-3 rounded-2xl border border-[#E8DFE3] bg-[#FAF8F9]">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#E0D5DA] shadow-xs shrink-0 bg-white">
              <Image
                src={displayImage}
                alt={isCustomUserImage ? "Ảnh kỷ niệm người gửi" : "White Orchid"}
                fill
                className="object-cover"
                unoptimized={displayImage.startsWith("http") || displayImage.startsWith("blob:")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#887882] uppercase truncate">
                GLOBALCARE · WOMEN&apos;S DAY
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#D9365E] tracking-wide mt-0.5 truncate">
                TÔN VINH PHÁI ĐẸP
              </p>
              {isCustomUserImage && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1.5 rounded-full bg-white text-[#55444D] text-[10px] font-semibold border border-[#E0D5DA]">
                  <Sparkles className="w-2.5 h-2.5 text-[#D9365E]" /> Ảnh kỷ niệm
                </span>
              )}
            </div>
          </div>

          {/* Card Message */}
          <div className="my-auto py-2 flex-1 flex items-center">
            <p className="text-[15px] sm:text-base leading-[1.7] text-[#2C2428] font-normal whitespace-pre-wrap break-words [text-wrap:pretty]">
              {message || "Lời chúc của bạn sẽ xuất hiện tại đây..."}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-3.5 mt-3.5 border-t border-[#EAE3E6] flex items-end justify-between gap-3 text-xs">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-[#2C2428] truncate">
                {senderName || "Đồng nghiệp"}
              </p>
              {senderDepartment && (
                <p className="text-[11px] text-[#7F7179] mt-0.5 truncate">{senderDepartment}</p>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#A4969E] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F9] border border-[#E8DFE3] whitespace-nowrap shrink-0">
              #TrânTrọng
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. THEME: CELEBRATION (Velvet Red Roses & Gilded Gold Frame)
  // ==========================================
  if (cardTheme === "celebration") {
    return (
      <div
        className={`relative overflow-hidden rounded-[28px] p-6 sm:p-7 transition-all duration-300 ${
          isExporting ? "" : "hover:shadow-2xl hover:-translate-y-0.5"
        } theme-celebration text-white flex flex-col justify-between min-h-[400px] h-full ${className}`}
      >
        {/* Real Red Roses Watermark in corner */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full overflow-hidden opacity-25 pointer-events-none blur-[1px]">
          <Image
            src="/images/floral_celebration.jpg"
            alt="Red Roses"
            fill
            className="object-cover"
          />
        </div>

        {/* Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#FBBF24]/30 to-transparent pointer-events-none" />

        {/* Inner Card Frame */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top Bar: Brand Logo & Celebration Badge */}
          <div className="flex items-center justify-between gap-3 border-b border-white/20 pb-3 mb-4">
            <div className="h-6 w-24 relative brightness-0 invert opacity-95 shrink-0">
              <Image
                src="/globalcare-logo.webp"
                alt="Global Care"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-[#FDE047]/50 text-[11px] font-bold text-[#FEF08A] shadow-xs whitespace-nowrap shrink-0">
              <Award className="h-3.5 w-3.5 text-[#FEF08A]" />
              <span>Celebration · 20.10</span>
            </div>
          </div>

          {/* Photo Showcase Banner (To, rõ, dễ nhìn) */}
          <div className="flex items-center gap-4 mb-4 p-3 rounded-2xl bg-black/25 border border-white/15 backdrop-blur-xs">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#FEF08A] shadow-md shadow-black/40 shrink-0 bg-black/40">
              <Image
                src={displayImage}
                alt={isCustomUserImage ? "Ảnh kỷ niệm người gửi" : "Velvet Red Roses"}
                fill
                className="object-cover"
                unoptimized={displayImage.startsWith("http") || displayImage.startsWith("blob:")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-extrabold text-[#FEF08A] uppercase tracking-wide truncate">
                Tri Ân Đặc Biệt
              </p>
              <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 truncate">
                Ngày Phụ Nữ Việt Nam 20.10
              </p>
              {isCustomUserImage && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1.5 rounded-full bg-white/15 text-[#FEF08A] text-[10px] font-semibold border border-white/20">
                  <Sparkles className="w-2.5 h-2.5" /> Ảnh kỷ niệm
                </span>
              )}
            </div>
          </div>

          {/* Card Message */}
          <div className="my-auto py-2 flex-1 flex items-center">
            <p className="text-[15px] sm:text-base leading-[1.7] text-white font-medium whitespace-pre-wrap break-words [text-wrap:pretty]">
              {message || "Lời chúc của bạn sẽ xuất hiện tại đây..."}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-3.5 mt-3.5 border-t border-white/20 flex items-end justify-between gap-3 text-xs text-white/90">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-[#FEF08A] truncate">
                {senderName || "Đồng nghiệp"}
              </p>
              {senderDepartment && (
                <p className="text-[11px] text-white/80 mt-0.5 truncate">{senderDepartment}</p>
              )}
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[10px] font-bold tracking-wider uppercase border border-white/25 whitespace-nowrap shrink-0">
              Global Care 2026
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 4. THEME: BLOOM (DEFAULT - Pink Peonies, Soft Roses, Dew Drops)
  // ==========================================
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] p-6 sm:p-7 transition-all duration-300 ${
        isExporting ? "" : "hover:shadow-2xl hover:-translate-y-0.5"
      } theme-bloom text-[#33222A] flex flex-col justify-between min-h-[400px] h-full ${className}`}
    >
      {/* Soft Pink Peonies Watermark */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full overflow-hidden opacity-20 pointer-events-none blur-[1px]">
        <Image
          src="/images/floral_bloom.jpg"
          alt="Pink Peonies"
          fill
          className="object-cover"
        />
      </div>

      {/* Inner Card Frame */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Bar: Brand Logo & Occasion Badge */}
        <div className="flex items-center justify-between gap-3 border-b border-[#F7C6D4] pb-3 mb-4">
          <div className="h-6 w-24 relative shrink-0">
            <Image
              src="/globalcare-logo.webp"
              alt="Global Care"
              fill
              className="object-contain object-left"
              unoptimized
            />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#F8C3D2] text-[11px] font-bold text-[#D9365E] shadow-sm whitespace-nowrap shrink-0">
            <Flower2 className="h-3 w-3 text-[#D9365E]" />
            <span>20.10.2026</span>
          </div>
        </div>

        {/* Photo Showcase Banner (To, rõ, dễ nhìn cho ảnh tải lên hoặc hoa Peony) */}
        <div className="flex items-center gap-4 mb-4 bg-white/70 p-3 sm:p-3.5 rounded-2xl border border-white/90 shadow-sm backdrop-blur-xs">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md shadow-[#F45B8A]/25 shrink-0 bg-[#FFF3F6]">
            <Image
              src={displayImage}
              alt={isCustomUserImage ? "Ảnh kỷ niệm người gửi" : "Real Pink Peonies"}
              fill
              className="object-cover"
              unoptimized={displayImage.startsWith("http") || displayImage.startsWith("blob:")}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-bold text-[#D9365E] uppercase tracking-wide truncate">
              Gửi Nàng Một Điều Tử Tế
            </p>
            <p className="text-[11px] sm:text-xs text-[#785C66] font-medium mt-0.5 truncate">
              Thương gửi phái đẹp Global Care
            </p>
            {isCustomUserImage && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1.5 rounded-full bg-[#FFF0F4] text-[#D9365E] text-[10px] font-semibold border border-[#F8D7E0]">
                <Sparkles className="w-2.5 h-2.5" /> Ảnh kỷ niệm
              </span>
            )}
          </div>
        </div>

        {/* Card Message: Elegant Serif */}
        <div className="my-auto py-2 flex-1 flex items-center">
          <p className="text-[15px] sm:text-base leading-[1.7] font-serif text-[#302229] whitespace-pre-wrap break-words [text-wrap:pretty]">
            {message || "Lời chúc của bạn sẽ xuất hiện tại đây..."}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3.5 mt-3.5 border-t border-[#F7C6D4] flex items-end justify-between gap-3 text-xs text-[#785C66]">
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-[#D9365E] truncate">
              {senderName || "Đồng nghiệp"}
            </p>
            {senderDepartment && (
              <p className="text-[11px] text-[#8A6E78] font-medium mt-0.5 truncate">
                {senderDepartment}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-[#D9365E] font-semibold text-[11px] px-2.5 py-1 rounded-full bg-white/70 border border-[#F8C3D2]/60 whitespace-nowrap shrink-0">
            <Heart className="h-3 w-3 fill-[#D9365E]" />
            <span>Trân quý từng khoảnh khắc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
