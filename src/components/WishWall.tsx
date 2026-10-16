"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ReportModal from "./ReportModal";
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Flag,
  RotateCcw,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Heart,
  Quote,
} from "lucide-react";

export interface WishCardData {
  id?: string;
  publicId: string;
  message: string;
  senderName: string;
  senderDepartment?: string | null;
  cardTheme: string;
  createdAt?: string;
}

interface WishWallProps {
  refreshTrigger?: number;
}

// Real Photographic Blooming Roses & Peonies hugging the 4 Board Corners
function RealFloralCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTopLeft = position === "top-left";
  const isTopRight = position === "top-right";
  const isBottomLeft = position === "bottom-left";

  const posClass = isTopLeft
    ? "-top-5 -left-5 sm:-top-7 sm:-left-7 md:-top-8 md:-left-8"
    : isTopRight
    ? "-top-5 -right-5 sm:-top-7 sm:-right-7 md:-top-8 md:-right-8 scale-x-[-1]"
    : isBottomLeft
    ? "-bottom-5 -left-5 sm:-bottom-7 sm:-left-7 md:-bottom-8 md:-left-8 scale-y-[-1]"
    : "-bottom-5 -right-5 sm:-bottom-7 sm:-right-7 md:-bottom-8 md:-right-8 scale-[-1]";

  return (
    <div
      className={`absolute ${posClass} pointer-events-none z-30 drop-shadow-[0_8px_16px_rgba(217,54,94,0.18)]`}
      aria-hidden="true"
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
        <Image
          src="/images/corner_flower_topleft.png"
          alt="Real blooming floral corner arrangement"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

// Realistic 3D Angled Pushpin with Metallic Needle pointing directly into the white tape
function PushPin({ index = 0 }: { index?: number }) {
  // Alternating tilt angles so each note has an organic, natural pin angle
  const tiltAngles = [-15, 14, -18, 12, -14, 16];
  const tilt = tiltAngles[index % tiltAngles.length];

  // Distinct rich colors for pins
  const pinPalettes = [
    { head: "#F43F5E", body: "#BE123C", base: "#9F1239", highlight: "#FFE4E6" }, // Rose Pink
    { head: "#F59E0B", body: "#D97706", base: "#B45309", highlight: "#FEF3C7" }, // Amber Gold
    { head: "#EC4899", body: "#DB2777", base: "#9D174D", highlight: "#FCE7F3" }, // Bright Pink
    { head: "#A855F7", body: "#9333EA", base: "#6B21A8", highlight: "#F3E8FF" }, // Lilac Violet
    { head: "#10B981", body: "#059669", base: "#047857", highlight: "#D1FAE5" }, // Emerald Sage
    { head: "#E11D48", body: "#BE123C", base: "#881337", highlight: "#FFE4E6" }, // Crimson
  ];
  const colors = pinPalettes[index % pinPalettes.length];

  return (
    <div
      className="absolute -top-[33px] left-1/2 z-20 pointer-events-none group-hover:scale-110 transition-transform duration-300"
      style={{
        transform: `translateX(-50%) rotate(${tilt}deg)`,
        transformOrigin: "18px 41px", // Pivots at the exact needle tip pointing into the white tape!
      }}
      aria-hidden="true"
    >
      <svg
        width="36"
        height="46"
        viewBox="0 0 36 46"
        fill="none"
        className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
      >
        {/* Needle contact shadow on the white tape */}
        <ellipse cx="18" cy="41" rx="6" ry="2" fill="black" fillOpacity="0.3" />

        {/* Steel Needle / Mũi kim cắm vào đoạn màu trắng của note */}
        <path d="M18 28 L18 41" stroke="#64748B" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M17.4 28 L17.4 40.5" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round" />

        {/* Base Flange / Đế ghim */}
        <ellipse cx="18" cy="27" rx="9" ry="3.8" fill={colors.base} />
        <ellipse cx="18" cy="26" rx="8.5" ry="3.3" fill={colors.body} />

        {/* Contoured Waist / Thân ghim thắt eo */}
        <path
          d="M11 15 C12.2 19.5 13.5 24 10.5 26.5 C12.5 27 23.5 27 25.5 26.5 C22.5 24 23.8 19.5 25 15 Z"
          fill={colors.body}
        />
        {/* Waist 3D Highlight Curve */}
        <path
          d="M14.5 16 C15.2 19.5 16 23 14 25.5 C15.5 26 20.5 26 22 25.5 C20 23 20.8 19.5 21.5 16 Z"
          fill={colors.head}
          fillOpacity="0.85"
        />

        {/* Top Dome Head / Chỏm ghim 3D */}
        <ellipse cx="18" cy="15" rx="9.5" ry="4.2" fill={colors.head} />
        <path
          d="M8.5 15 C8.5 8 11.8 3.5 18 3.5 C24.2 3.5 27.5 8 27.5 15 Z"
          fill={colors.head}
        />

        {/* Specular Gloss Highlights / Điểm sáng bóng 3D */}
        <ellipse
          cx="14.5"
          cy="8"
          rx="4"
          ry="2.2"
          fill={colors.highlight}
          fillOpacity="0.9"
        />
        <ellipse
          cx="18"
          cy="14.5"
          rx="7"
          ry="2.4"
          fill={colors.highlight}
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
}

// Soft Pastel Note Styles
const NOTE_THEME_STYLES: Record<
  string,
  {
    bg: string;
    border: string;
    tapeBorder: string;
    accent: string;
  }
> = {
  bloom: {
    bg: "bg-gradient-to-b from-[#FFF5F8] via-[#FFF0F4] to-[#FFEBF1]",
    border: "border-[#FCD3DF]",
    tapeBorder: "border-[#F45B8A]/35",
    accent: "#D9365E",
  },
  joy: {
    bg: "bg-gradient-to-b from-[#FFFDF2] via-[#FFF9E6] to-[#FFF6DA]",
    border: "border-[#FEE8A9]",
    tapeBorder: "border-[#F59E0B]/35",
    accent: "#D97706",
  },
  minimal: {
    bg: "bg-gradient-to-b from-[#FAFAFA] via-[#F7F5F6] to-[#F3F0F2]",
    border: "border-[#E5DFE2]",
    tapeBorder: "border-[#9E8E95]/35",
    accent: "#5C4D55",
  },
  celebration: {
    bg: "bg-gradient-to-b from-[#FAF5FF] via-[#F7EFFF] to-[#F3E8FF]",
    border: "border-[#E9D5FF]",
    tapeBorder: "border-[#A855F7]/35",
    accent: "#7C3AED",
  },
};

// Subtle Rotations for Organic Note Look
const ROTATIONS = [
  "-rotate-1",
  "rotate-1",
  "-rotate-0.5",
  "rotate-1.5",
  "-rotate-1",
  "rotate-0.5",
];

const LIMIT_PER_PAGE = 6;

export default function WishWall({ refreshTrigger = 0 }: WishWallProps) {
  const [cards, setCards] = useState<WishCardData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active Report Modal
  const [reportingPublicId, setReportingPublicId] = useState<string | null>(null);

  // Active Copied State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchCards = useCallback(async (targetPage = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/cards?page=${targetPage}&limit=${LIMIT_PER_PAGE}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Không thể tải lời chúc.");
      }

      setCards(data.cards || []);
      setPage(data.pagination?.page || targetPage);
      setTotalPages(Math.max(1, data.pagination?.totalPages || 1));
      setTotalCards(data.pagination?.total || 0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards(page);
  }, [fetchCards, page, refreshTrigger]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      const el = document.getElementById("wishwall-board");
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 0) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const handleCopyCardLink = (publicId?: string) => {
    if (!publicId) return;
    const url = `${window.location.origin}/card/${publicId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(publicId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleNativeShare = async (publicId?: string) => {
    if (!publicId) return;
    const url = `${window.location.origin}/card/${publicId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Thiệp chúc 20/10 — Global Care",
          text: "Gửi tặng các chị em Global Care thiệp chúc mừng 20/10!",
          url,
        });
      } catch {
        // Ignored
      }
    } else {
      handleCopyCardLink(publicId);
    }
  };

  return (
    <section
      id="wishwall"
      className="py-24 md:py-28 bg-gradient-to-b from-[#FFF2F6] via-[#FFE5EE] to-[#FFDDE8] relative border-b border-[#F4B7CA] scroll-mt-20 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F4] border border-[#F8D7E0] text-xs font-bold tracking-widest text-[#D9365E] uppercase shadow-xs mb-5">
            Bảng Tin Tri Ân 20/10
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#30252B] leading-tight mb-4">
            Wish Wall — Nơi lưu giữ những điều tử tế
          </h2>
          <p className="text-base text-[#6B5E66] leading-relaxed max-w-xl">
            Từng bức thư nhỏ được trân trọng ghim lên bảng như những đóa hoa tinh
            thần gửi đến toàn thể chị em Global Care.
          </p>
        </div>

        {/* ============================================================ */}
        {/* THE DECORATED BULLETIN BOARD (TRANG TRÍ HOA TỰ NHIÊN, NGHỆ THUẬT) */}
        {/* ============================================================ */}
        <div
          id="wishwall-board"
          className="relative bg-gradient-to-br from-[#FFDEE7] via-[#FFD4DF] to-[#FAC2D3] p-4 sm:p-7 md:p-8 rounded-[40px] shadow-[0_20px_50px_rgba(217,54,94,0.15)] border-4 border-[#F5ADC0] ring-4 ring-white/60"
        >
          {/* 4 Real Botanical Blooming Floral Corners */}
          <RealFloralCorner position="top-left" />
          <RealFloralCorner position="top-right" />
          <RealFloralCorner position="bottom-left" />
          <RealFloralCorner position="bottom-right" />

          {/* Fairy String Lights across the board top */}
          <div className="absolute -top-3 left-12 right-12 flex items-center justify-between pointer-events-none z-30 px-3 hidden sm:flex">
            {/* String wire */}
            <div className="absolute top-2.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D9365E]/30 to-transparent" />
            {/* 11 Glowing fairy light bulbs */}
            {[...Array(11)].map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                <div className="w-1 h-1.5 bg-[#8C7A83]/60 rounded-xs" />
                <div
                  className={`w-2 h-2.5 rounded-full ${
                    i % 2 === 0
                      ? "bg-[#FEF08A] shadow-[0_0_8px_#FDE047]"
                      : "bg-[#FDA4AF] shadow-[0_0_8px_#F43F5E]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Board Surface (Warm Cork / Pinboard Linen Texture) */}
          <div
            className="relative rounded-[28px] p-5 sm:p-7 md:p-9 shadow-inner border border-[#F3C4D1]/70 min-h-[440px] overflow-hidden"
            style={{
              backgroundColor: "#FFF9FA",
              backgroundImage:
                "radial-gradient(#F5CDD8 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
            }}
          >
            {/* Mini cute pinned floral tag in top right */}
            <div className="absolute top-4 right-8 pointer-events-none hidden md:flex items-center gap-1 px-3 py-1 rounded-md bg-white/85 border border-[#F8D7E0] shadow-xs rotate-[3deg] text-[11px] font-semibold text-[#D9365E]">
              <span>🌸 20/10 with love</span>
            </div>

            {/* Board Header Plaque with Fresh Floral Wreath Styling */}
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/95 border border-[#F8D7E0] shadow-sm backdrop-blur-xs">
                <span className="text-sm">🌸</span>
                <span className="text-xs font-bold tracking-wider text-[#D9365E] uppercase font-mono">
                  GLOBAL CARE · BẢNG TIN LỜI THƯƠNG
                </span>
                <span className="text-sm">🌸</span>
              </div>
            </div>

            {/* Content Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 py-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-56 rounded-2xl bg-white/80 border border-[#F8D7E0] animate-pulse p-6 flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-gray-200 rounded" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded" />
                      <div className="h-4 w-4/6 bg-gray-200 rounded" />
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              /* Error State */
              <div className="py-16 text-center bg-white/85 rounded-2xl border border-[#F8D7E0] shadow-sm max-w-md mx-auto space-y-4">
                <p className="text-sm text-red-600 font-semibold">{error}</p>
                <button
                  type="button"
                  onClick={() => fetchCards(page)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D9365E] text-white text-xs font-bold hover:bg-[#B52246] transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thử tải lại bảng tin</span>
                </button>
              </div>
            ) : cards.length === 0 ? (
              /* Empty State */
              <div className="py-20 text-center bg-white/85 rounded-2xl border border-[#F8D7E0] shadow-sm max-w-lg mx-auto space-y-4 p-8">
                <div className="w-14 h-14 rounded-full bg-[#FFF0F4] text-[#D9365E] flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-[#30252B]">
                  Bảng tin hiện chưa có lời chúc nào
                </h3>
                <p className="text-xs text-[#6B5E66] max-w-xs mx-auto">
                  Hãy là người đầu tiên ghim những bức thư tử tế lên bảng tin chúc
                  mừng các chị em Global Care!
                </p>
                <a
                  href="#composer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F45B8A] to-[#D9365E] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ghim thư ngay</span>
                </a>
              </div>
            ) : (
              /* ============================================================ */
              /* ENLARGED STICKY NOTES WITH PIN POINTING INTO THE WHITE TAPE */
              /* ============================================================ */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 py-3 items-stretch">
                {cards.map((card, idx) => {
                  const style =
                    NOTE_THEME_STYLES[card.cardTheme] || NOTE_THEME_STYLES.bloom;
                  const rotation = ROTATIONS[idx % ROTATIONS.length];

                  const formattedDate = card.createdAt
                    ? new Date(card.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                      })
                    : "20/10";

                  return (
                    <div
                      key={card.id || card.publicId}
                      className={`relative group transform ${rotation} hover:rotate-0 hover:scale-[1.03] hover:z-30 transition-all duration-300 flex flex-col`}
                    >
                      {/* Realistic 3D Angled Pushpin with Needle tip pointing into the white tape */}
                      <PushPin index={idx} />

                      {/* Sticky Note Paper */}
                      <div
                        className={`relative rounded-2xl p-5 sm:p-6 md:p-7 ${style.bg} border ${style.border} shadow-[0_4px_14px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_28px_rgba(217,54,94,0.18)] transition-all duration-300 flex flex-col justify-between flex-1 min-h-[220px] sm:min-h-[245px]`}
                      >
                        {/* Washi Tape Strip at top - Đoạn màu trắng của note nơi kim đinh ghim cắm vào */}
                        <div
                          className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/90 backdrop-blur-xs border-y border-dashed ${style.tapeBorder} shadow-xs pointer-events-none rotate-[-1deg] rounded-xs flex items-center justify-center`}
                        >
                          {/* Puncture hole where pin needle penetrates */}
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3D2E37]/35 shadow-inner mt-1" />
                        </div>

                        {/* Note Body (Lời chúc chân thành - To, rõ nét, dễ đọc) */}
                        <div className="pt-2 pb-4 flex-1 flex flex-col justify-center">
                          <div className="relative">
                            <Quote
                              className="w-6 h-6 absolute -top-3 -left-1 opacity-20 pointer-events-none"
                              style={{ color: style.accent }}
                            />
                            <p className="text-sm sm:text-[15px] md:text-base text-[#2E2429] leading-[1.75] italic font-serif [text-wrap:pretty] pl-3">
                              &ldquo;{card.message}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* Bottom: Date & Minimal Tool Buttons (Bỏ phần bên trái, nút nhỏ gọn) */}
                        <div className="pt-2 border-t border-[#30252B]/8 flex items-center justify-end gap-1 text-[#8C7A83]">
                          {/* Card Date */}
                          <span className="font-mono text-[11px] text-[#A898A1] mr-1 select-none">
                            {formattedDate}
                          </span>

                          {/* Copy Link */}
                          <button
                            type="button"
                            onClick={() => handleCopyCardLink(card.publicId)}
                            title="Sao chép liên kết thư"
                            className="p-1 rounded-md hover:bg-white/80 hover:text-[#D9365E] transition-colors"
                          >
                            {copiedId === card.publicId ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Native Share */}
                          <button
                            type="button"
                            onClick={() => handleNativeShare(card.publicId)}
                            title="Chia sẻ bức thư"
                            className="p-1 rounded-md hover:bg-white/80 hover:text-[#D9365E] transition-colors"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          {/* View Full Card Page */}
                          <a
                            href={`/card/${card.publicId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Xem trang thiệp riêng"
                            className="p-1 rounded-md hover:bg-white/80 hover:text-[#1A437E] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {/* Report Button */}
                          <button
                            type="button"
                            onClick={() =>
                              setReportingPublicId(card.publicId || null)
                            }
                            title="Báo cáo nội dung không phù hợp"
                            className="p-1 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Flag className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DOTS PAGINATION (DOT BÊN DƯỚI ĐỂ DI CHUYỂN GIỮA PHÂN TRANG) */}
        {/* ============================================================ */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center pt-8 gap-3">
            <div className="flex items-center gap-3">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                aria-label="Trang trước"
                className="w-9 h-9 rounded-full bg-white border border-[#F8D7E0] text-[#4D3A44] flex items-center justify-center hover:bg-[#FFF0F4] hover:text-[#D9365E] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots List */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-[#F8D7E0] shadow-xs">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  const isActive = pageNum === page;

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      aria-label={`Đi tới trang ${pageNum}`}
                      className={`transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-8 h-2.5 bg-gradient-to-r from-[#F45B8A] to-[#D9365E] shadow-sm shadow-[#D9365E]/30"
                          : "w-2.5 h-2.5 bg-[#E8D1D8] hover:bg-[#D9365E]/60"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                aria-label="Trang tiếp theo"
                className="w-9 h-9 rounded-full bg-white border border-[#F8D7E0] text-[#4D3A44] flex items-center justify-center hover:bg-[#FFF0F4] hover:text-[#D9365E] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Subtitle */}
            <p className="text-xs text-[#8A7781] font-medium">
              Trang <span className="font-bold text-[#D9365E]">{page}</span> /{" "}
              <span>{totalPages}</span> · ({totalCards} lời thương đã ghim)
            </p>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {reportingPublicId && (
        <ReportModal
          cardPublicId={reportingPublicId}
          onClose={() => setReportingPublicId(null)}
          onReportSubmitted={() => {
            fetchCards(page);
          }}
        />
      )}
    </section>
  );
}
