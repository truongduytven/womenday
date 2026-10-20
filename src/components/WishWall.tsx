"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  Camera,
  Flower2,
  Maximize2,
  X,
} from "lucide-react";

export interface WishCardData {
  id?: string;
  publicId: string;
  message: string;
  senderName?: string | null;
  senderDepartment?: string | null;
  cardTheme: string;
  imageUrl?: string | null;
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
      className="absolute -top-[33px] left-1/2 z-30 pointer-events-none group-hover:scale-110 transition-transform duration-300"
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

// Default high-resolution theme floral photography (fallback when user did not upload a photo)
const DEFAULT_THEME_IMAGES: Record<
  string,
  { src: string; alt: string; label: string }
> = {
  bloom: {
    src: "/images/floral_bloom.jpg",
    alt: "Đóa hoa hồng & mẫu đơn rực rỡ sắc thắm",
    label: "Sắc hoa Bloom",
  },
  joy: {
    src: "/images/floral_joy.jpg",
    alt: "Hoa mao lương & phong lữ tràn đầy niềm vui",
    label: "Sắc hoa Joy",
  },
  minimal: {
    src: "/images/floral_minimal.jpg",
    alt: "Đóa phong lan trắng thanh tao, trang nhã",
    label: "Sắc hoa Minimal",
  },
  celebration: {
    src: "/images/floral_celebration.jpg",
    alt: "Vườn hoa dạ yến cẩm tú cầu tôn vinh phái đẹp",
    label: "Sắc hoa Celebration",
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

  // Active Image & Card Lightbox Preview Modal
  const [previewCard, setPreviewCard] = useState<WishCardData | null>(null);

  // All published cards for Mobile Flashcard Infinite Loop (Gọi lên toàn bộ cho mobile)
  const [allMobileCards, setAllMobileCards] = useState<WishCardData[]>([]);

  // Mobile Flashcard Deck Active Index & Direction
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<number>(1);

  // Display list for mobile: ưu tiên danh sách gọi hết allMobileCards
  const displayMobileCards = allMobileCards.length > 0 ? allMobileCards : cards;

  // Lặp vô tận (Loop) khi chuyển thiệp trên mobile
  const handleNextMobileCard = () => {
    if (displayMobileCards.length === 0) return;
    setSwipeDirection(1);
    setActiveMobileIndex((prev) => (prev + 1) % displayMobileCards.length);
  };

  const handlePrevMobileCard = () => {
    if (displayMobileCards.length === 0) return;
    setSwipeDirection(-1);
    setActiveMobileIndex((prev) => (prev - 1 + displayMobileCards.length) % displayMobileCards.length);
  };

  // Gọi tất cả lời chúc cho mobile flashcard loop
  const fetchAllMobileCards = useCallback(async () => {
    try {
      const res = await fetch(`/api/cards?all=true`);
      const data = await res.json();
      if (res.ok && data.cards) {
        setAllMobileCards(data.cards);
      }
    } catch {
      // Ignored
    }
  }, []);

  useEffect(() => {
    fetchAllMobileCards();
  }, [fetchAllMobileCards, refreshTrigger]);

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

  // Close preview modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewCard(null);
      }
    };
    if (previewCard) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [previewCard]);

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

    // Luôn sao chép link trước để đảm bảo có sẵn link mở được trong bộ nhớ tạm
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(publicId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignored
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Thiệp chúc 20/10 — Global Care",
          text: `Gửi tặng các chị em Global Care thiệp chúc mừng 20/10!\n${url}`,
          url,
        });
      } catch {
        // Ignored
      }
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
              <>
                {/* ============================================================ */}
                {/* MOBILE VIEW: SWIPABLE INTERACTIVE FLASHCARD DECK (LOOP VÔ TẬN) */}
                {/* ============================================================ */}
                <div className="block md:hidden pt-1 pb-3">
                  {/* Header with Card Counter & Swipe Hint */}
                  <div className="flex items-center justify-between mb-3 px-1 text-xs">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#F8D7E0] shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#D9365E] animate-pulse" />
                      <span className="font-bold text-[#30252B]">
                        Thư {activeMobileIndex + 1}
                      </span>
                      <span className="text-[#8A7781]">/ {displayMobileCards.length}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#8A7781] text-[11px] font-medium">
                      <span>Vuốt để xem tiếp</span>
                      <span className="animate-bounce">👉</span>
                    </div>
                  </div>

                  {/* Flashcard Deck Container */}
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto min-h-[460px] flex items-center justify-center">
                    {/* Background Stack Illusion Cards (Tạo hiệu ứng tập flashcard dày dặn, sang trọng) */}
                    {displayMobileCards.length > 2 && (
                      <div
                        className="absolute inset-x-5 top-5 bottom-0 rounded-3xl bg-white/50 border border-[#F8D7E0]/60 shadow-xs transform scale-[0.88] translate-y-4 pointer-events-none transition-all duration-300"
                        aria-hidden="true"
                      />
                    )}
                    {displayMobileCards.length > 1 && (
                      <div
                        className="absolute inset-x-2.5 top-2.5 bottom-0 rounded-3xl bg-white/75 border border-[#F8D7E0]/80 shadow-md transform scale-[0.94] translate-y-2 pointer-events-none transition-all duration-300"
                        aria-hidden="true"
                      />
                    )}

                    {/* Active Animated Flashcard */}
                    <AnimatePresence initial={false} custom={swipeDirection} mode="wait">
                      {(() => {
                        const card = displayMobileCards[activeMobileIndex] || displayMobileCards[0];
                        if (!card) return null;

                        const style = NOTE_THEME_STYLES[card.cardTheme] || NOTE_THEME_STYLES.bloom;
                        const formattedDate = card.createdAt
                          ? new Date(card.createdAt).toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                            })
                          : "20/10";

                        const cleanSenderName = card.senderName?.trim() || "";
                        const cleanDepartment = card.senderDepartment?.trim() || "";
                        const isGenericName =
                          !cleanSenderName || cleanSenderName.toLowerCase() === "đồng nghiệp";
                        const hasCustomSender = !isGenericName || Boolean(cleanDepartment);
                        const primarySignature = !isGenericName
                          ? cleanSenderName
                          : cleanSenderName || cleanDepartment;
                        const secondarySignature =
                          primarySignature !== cleanDepartment && cleanDepartment
                            ? cleanDepartment
                            : null;

                        const hasCustomPhoto = Boolean(
                          card.imageUrl && card.imageUrl.trim() !== ""
                        );
                        const themeFloral =
                          DEFAULT_THEME_IMAGES[card.cardTheme] || DEFAULT_THEME_IMAGES.bloom;
                        const displayImage = hasCustomPhoto
                          ? card.imageUrl!.trim()
                          : themeFloral.src;
                        const imageAlt = hasCustomPhoto
                          ? "Ảnh kỷ niệm đính kèm lời chúc"
                          : themeFloral.alt;
                        const imageBadgeLabel = hasCustomPhoto
                          ? "Ảnh kỷ niệm"
                          : themeFloral.label;

                        return (
                          <motion.div
                            key={card.id || card.publicId}
                            custom={swipeDirection}
                            variants={{
                              enter: (dir: number) => ({
                                x: dir > 0 ? 220 : -220,
                                opacity: 0,
                                scale: 0.92,
                                rotate: dir > 0 ? 4 : -4,
                              }),
                              center: {
                                x: 0,
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                                transition: {
                                  x: { type: "spring", stiffness: 320, damping: 28 },
                                  opacity: { duration: 0.2 },
                                  scale: { duration: 0.2 },
                                },
                              },
                              exit: (dir: number) => ({
                                x: dir > 0 ? -240 : 240,
                                opacity: 0,
                                scale: 0.9,
                                rotate: dir > 0 ? -8 : 8,
                                transition: {
                                  x: { type: "spring", stiffness: 320, damping: 28 },
                                  opacity: { duration: 0.18 },
                                },
                              }),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragDirectionLock
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.65}
                            onDragEnd={(e, { offset, velocity }) => {
                              const swipe = Math.abs(offset.x) * velocity.x;
                              if (swipe < -6000 || offset.x < -50) {
                                handleNextMobileCard();
                              } else if (swipe > 6000 || offset.x > 50) {
                                handlePrevMobileCard();
                              }
                            }}
                            className="touch-pan-y relative w-full rounded-3xl cursor-pointer select-none"
                            onClick={() => setPreviewCard(card)}
                          >
                            {/* Card Content styled as a rich, neat postcard/flashcard */}
                            <div
                              className={`relative rounded-3xl p-4.5 ${style.bg} border-2 ${style.border} shadow-[0_12px_32px_rgba(217,54,94,0.18)] flex flex-col justify-between overflow-hidden min-h-[370px]`}
                            >
                              {/* Top Washi Tape Strip */}
                              <div
                                className={`absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/95 backdrop-blur-xs border-y border-dashed ${style.tapeBorder} shadow-xs pointer-events-none rounded-xs flex items-center justify-center z-10`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3D2E37]/35 shadow-inner" />
                              </div>

                              {/* Photo Area */}
                              <div
                                className="relative mt-2 mb-3 rounded-2xl overflow-hidden bg-white/90 p-1.5 shadow-sm border border-black/5 cursor-pointer"
                                onClick={() => setPreviewCard(card)}
                                title="Nhấn để xem ảnh phóng to"
                              >
                                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-stone-100">
                                  <Image
                                    src={displayImage}
                                    alt={imageAlt}
                                    fill
                                    sizes="(max-width: 640px) 340px, 400px"
                                    className="object-cover"
                                    priority
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                                  {/* Badge */}
                                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#2E2429] text-[10px] font-semibold shadow-xs">
                                    {hasCustomPhoto ? (
                                      <>
                                        <Camera className="w-3 h-3 text-[#D9365E]" />
                                        <span>Ảnh kỷ niệm</span>
                                      </>
                                    ) : (
                                      <>
                                        <Flower2 className="w-3 h-3 text-[#D9365E]" />
                                        <span>{imageBadgeLabel}</span>
                                      </>
                                    )}
                                  </div>

                                  {/* Tap to expand hint */}
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/45 text-white backdrop-blur-sm text-[10px] flex items-center gap-1 font-medium">
                                    <Maximize2 className="w-3 h-3" />
                                    <span>Mở to</span>
                                  </div>
                                </div>
                              </div>

                              {/* Message Content */}
                              <div
                                className="py-2 px-1 flex-1 flex flex-col justify-between cursor-pointer"
                                onClick={() => setPreviewCard(card)}
                              >
                                <div className="relative">
                                  <Quote
                                    className="w-5 h-5 absolute -top-2.5 -left-1 opacity-20 pointer-events-none"
                                    style={{ color: style.accent }}
                                  />
                                  <p className="text-base text-[#2E2429] leading-relaxed italic font-serif pl-4 line-clamp-5 [text-wrap:pretty]">
                                    &ldquo;{card.message}&rdquo;
                                  </p>
                                </div>

                                {/* Sender signature & Date */}
                                <div className="pt-3 mt-3 border-t border-[#30252B]/8 flex items-baseline justify-between text-xs">
                                  {hasCustomSender ? (
                                    <div>
                                      <span className="font-bold text-sm text-[#2E2429]">
                                        — {primarySignature}
                                      </span>
                                      {secondarySignature && (
                                        <span className="text-[11px] text-[#7A6672] ml-1.5 font-medium">
                                          ({secondarySignature})
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-[#8A7781] italic">
                                      — Đồng nghiệp
                                    </span>
                                  )}
                                  <span className="text-[11px] text-[#8A7781] font-mono shrink-0">
                                    {formattedDate}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Pushpin rendered at top center */}
                            <PushPin index={activeMobileIndex} />
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>

                  {/* Flashcard Navigation Controls: Prev / Next Buttons & Loop indicators (Không phân trang trên mobile) */}
                  <div className="flex flex-col items-center gap-3 mt-4">
                    <div className="flex items-center justify-between w-full max-w-[340px] px-2">
                      <button
                        type="button"
                        onClick={handlePrevMobileCard}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-[#F8D7E0] text-xs font-semibold text-[#4D3A44] shadow-xs active:scale-95 hover:bg-[#FFF0F4] hover:text-[#D9365E] transition-all"
                        aria-label="Thư trước đó (loop)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Thư trước</span>
                      </button>

                      {/* Dots if <= 8 cards, or sleek progress bar if > 8 cards */}
                      {displayMobileCards.length <= 8 ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#F8D7E0] shadow-2xs">
                          {displayMobileCards.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setSwipeDirection(i > activeMobileIndex ? 1 : -1);
                                setActiveMobileIndex(i);
                              }}
                              aria-label={`Chuyển tới thư ${i + 1}`}
                              className={`transition-all duration-200 rounded-full ${
                                i === activeMobileIndex
                                  ? "w-4 h-2 bg-gradient-to-r from-[#F45B8A] to-[#D9365E]"
                                  : "w-2 h-2 bg-[#E8D1D8] hover:bg-[#D9365E]/50"
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#F8D7E0] shadow-2xs">
                          <div className="w-20 h-1.5 bg-[#F8D7E0] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#F45B8A] to-[#D9365E] rounded-full transition-all duration-300"
                              style={{
                                width: `${((activeMobileIndex + 1) / displayMobileCards.length) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-[#8A7781] font-mono leading-none">
                            {activeMobileIndex + 1} / {displayMobileCards.length}
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleNextMobileCard}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#D9365E] to-[#F45B8A] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
                        aria-label="Thư tiếp theo (loop)"
                      >
                        <span>Thư sau</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ============================================================ */}
                {/* DESKTOP VIEW: ENLARGED STICKY NOTES WITH PIN ON BULLETIN BOARD */}
                {/* ============================================================ */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 pt-9 pb-4 sm:pt-10 sm:pb-6 items-stretch">
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

                  const cleanSenderName = card.senderName?.trim() || "";
                  const cleanDepartment = card.senderDepartment?.trim() || "";
                  const isGenericName =
                    !cleanSenderName ||
                    cleanSenderName.toLowerCase() === "đồng nghiệp";
                  const hasCustomSender =
                    !isGenericName || Boolean(cleanDepartment);

                  const primarySignature = !isGenericName
                    ? cleanSenderName
                    : cleanSenderName || cleanDepartment;

                  const secondarySignature =
                    primarySignature !== cleanDepartment && cleanDepartment
                      ? cleanDepartment
                      : null;

                  const hasCustomPhoto = Boolean(
                    card.imageUrl && card.imageUrl.trim() !== ""
                  );
                  const themeFloral =
                    DEFAULT_THEME_IMAGES[card.cardTheme] ||
                    DEFAULT_THEME_IMAGES.bloom;

                  const displayImage = hasCustomPhoto
                    ? card.imageUrl!.trim()
                    : themeFloral.src;
                  const imageAlt = hasCustomPhoto
                    ? "Ảnh kỷ niệm đính kèm lời chúc"
                    : themeFloral.alt;
                  const imageBadgeLabel = hasCustomPhoto
                    ? "Ảnh kỷ niệm"
                    : themeFloral.label;

                  return (
                    <div
                      key={card.id || card.publicId}
                      onClick={() => setPreviewCard(card)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPreviewCard(card);
                        }
                      }}
                      className={`relative group transform ${rotation} hover:rotate-0 hover:scale-[1.03] hover:z-30 transition-all duration-300 flex flex-col cursor-pointer select-none`}
                      title="Nhấn để mở xem chi tiết và tương tác"
                    >
                      {/* Sticky Note Paper */}
                      <div
                        className={`relative rounded-2xl p-4 sm:p-5 md:p-5.5 ${style.bg} border ${style.border} shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_16px_36px_rgba(217,54,94,0.18)] transition-all duration-300 flex flex-col justify-between flex-1 min-h-[400px] sm:min-h-[440px]`}
                      >
                        {/* Washi Tape Strip at top - Đè lên mép trên ảnh như dán ảnh thật vào note */}
                        <div
                          className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5.5 bg-white/90 backdrop-blur-xs border-y border-dashed ${style.tapeBorder} shadow-xs pointer-events-none rotate-[-1deg] rounded-xs flex items-center justify-center z-10`}
                        >
                          {/* Puncture hole where pin needle penetrates */}
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3D2E37]/35 shadow-inner mt-1" />
                        </div>

                        {/* Prominent Photo / Theme Flower Header */}
                        <div className="relative mt-1 mb-3.5 group/photo">
                          {/* White Polaroid/Matting Frame */}
                          <div className="p-1.5 sm:p-2 bg-white/95 rounded-xl sm:rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.07)] border border-[#30252B]/8 ring-1 ring-white/80">
                            <div className="relative block w-full h-48 sm:h-52 md:h-56 rounded-lg sm:rounded-xl overflow-hidden bg-stone-100 text-left">
                              <Image
                                src={displayImage}
                                alt={imageAlt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover/photo:scale-108 group-hover:scale-105 transition-transform duration-700 ease-out"
                              />

                              {/* Subtle artistic vignette gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                              {/* Badge on Photo (Ảnh kỷ niệm hoặc Đóa hoa theo Theme) */}
                              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2E2429] text-[10px] sm:text-[11px] font-semibold shadow-xs">
                                {hasCustomPhoto ? (
                                  <>
                                    <Camera className="w-3.5 h-3.5 text-[#D9365E]" />
                                    <span>Ảnh kỷ niệm</span>
                                  </>
                                ) : (
                                  <>
                                    <Flower2 className="w-3.5 h-3.5 text-[#D9365E]" />
                                    <span>{imageBadgeLabel}</span>
                                  </>
                                )}
                              </div>

                              {/* Click expand hint indicator */}
                              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Maximize2 className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Note Body (Lời chúc chân thành - To, rõ nét, dễ đọc) */}
                        <div className="pt-1 pb-3 flex-1 flex flex-col justify-center">
                          <div className="relative">
                            <Quote
                              className="w-5 h-5 absolute -top-2.5 -left-1 opacity-20 pointer-events-none"
                              style={{ color: style.accent }}
                            />
                            <p className="text-sm sm:text-[15px] md:text-base text-[#2E2429] leading-[1.7] italic font-serif [text-wrap:pretty] pl-3 line-clamp-5">
                              &ldquo;{card.message}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* Bottom: Phần bên dưới của note chỉ để tên người gửi thôi */}
                        {hasCustomSender && (
                          <div className="pt-2.5 border-t border-[#30252B]/8 leading-tight">
                            <span className="text-xs sm:text-[13px] font-bold text-[#2E2429] block truncate">
                              — {primarySignature}
                            </span>
                            {secondarySignature && (
                              <span className="text-[10px] sm:text-[11px] text-[#7A6672] block truncate font-medium mt-0.5">
                                {secondarySignature}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Realistic 3D Angled Pushpin with Needle tip pointing into the white tape - Rendered ON TOP */}
                      <PushPin index={idx} />
                    </div>
                  );
              })}
              </div>
              </>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DOTS PAGINATION (DOT BÊN DƯỚI ĐỂ DI CHUYỂN GIỮA PHÂN TRANG) */}
        {/* ============================================================ */}
        {totalPages > 1 && (
          <div className="hidden md:flex flex-col items-center justify-center pt-8 gap-3">
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
            fetchAllMobileCards();
          }}
        />
      )}

      {/* Lightbox Preview Modal for Enlarged Photo & Note with Animation & All Actions */}
      {previewCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-md animate-modal-backdrop"
          onClick={() => setPreviewCard(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 md:p-7 shadow-[0_25px_60px_-15px_rgba(217,54,94,0.35)] border border-white/50 flex flex-col gap-4 max-h-[92vh] overflow-y-auto animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const isCustom = Boolean(
                previewCard.imageUrl && previewCard.imageUrl.trim() !== ""
              );
              const fallback =
                DEFAULT_THEME_IMAGES[previewCard.cardTheme] ||
                DEFAULT_THEME_IMAGES.bloom;
              const imgSrc = isCustom ? previewCard.imageUrl!.trim() : fallback.src;
              const imgAlt = isCustom ? "Ảnh kỷ niệm đính kèm" : fallback.alt;
              const imgLabel = isCustom ? "Ảnh kỷ niệm" : fallback.label;

              const modalFormattedDate = previewCard.createdAt
                ? new Date(previewCard.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "20/10/2026";

              return (
                <>
                  {/* Modal Header: Badge, Date & Close Button */}
                  <div className="flex items-center justify-between gap-3 pb-1 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] text-[#D9365E] text-xs font-semibold border border-[#F8D7E0]">
                        {isCustom ? (
                          <Camera className="w-3.5 h-3.5 text-[#D9365E]" />
                        ) : (
                          <Flower2 className="w-3.5 h-3.5 text-[#D9365E]" />
                        )}
                        <span>{imgLabel}</span>
                      </span>
                      <span className="text-xs text-[#8A7781] font-mono select-none">
                        {modalFormattedDate}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewCard(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-[#4D3A44] flex items-center justify-center transition-colors"
                      title="Đóng xem chi tiết (Esc)"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Photo Container */}
                  <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden bg-stone-100 shadow-inner border border-black/5">
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Note Wish Content */}
                  <div className="space-y-3 pt-1">
                    <div className="relative pl-4 border-l-2 border-[#D9365E]">
                      <p className="text-base sm:text-lg text-[#2E2429] leading-relaxed italic font-serif [text-wrap:pretty]">
                        &ldquo;{previewCard.message}&rdquo;
                      </p>
                    </div>

                    {/* Sender & Department if present */}
                    {(previewCard.senderName || previewCard.senderDepartment) && (
                      <div className="pt-1 text-xs text-[#7A6672]">
                        {previewCard.senderName && (
                          <span className="font-bold text-sm text-[#2E2429] block">
                            — {previewCard.senderName}
                          </span>
                        )}
                        {previewCard.senderDepartment && (
                          <span className="text-xs text-[#7A6672] font-medium block mt-0.5">
                            {previewCard.senderDepartment}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Toolbar (Tất cả các thao tác đưa lên modal) */}
                    <div className="pt-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Copy Link Button */}
                        <button
                          type="button"
                          onClick={() => handleCopyCardLink(previewCard.publicId)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-[#FFF0F4] hover:text-[#D9365E] text-xs font-semibold text-[#30252B] transition-all hover:scale-[1.02] active:scale-95"
                          title="Sao chép liên kết thư"
                        >
                          {copiedId === previewCard.publicId ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Đã chép link!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#7A6672]" />
                              <span>Sao chép link</span>
                            </>
                          )}
                        </button>

                        {/* Native Share Button */}
                        <button
                          type="button"
                          onClick={() => handleNativeShare(previewCard.publicId)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-[#FFF0F4] hover:text-[#D9365E] text-xs font-semibold text-[#30252B] transition-all hover:scale-[1.02] active:scale-95"
                          title="Chia sẻ bức thư"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#7A6672]" />
                          <span>Chia sẻ</span>
                        </button>

                        {/* Report Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const pid = previewCard.publicId;
                            setPreviewCard(null);
                            setReportingPublicId(pid);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-red-50 text-xs font-medium text-red-500 transition-all hover:scale-[1.02] active:scale-95"
                          title="Báo cáo nội dung không phù hợp"
                        >
                          <Flag className="w-3 h-3" />
                          <span>Báo cáo</span>
                        </button>
                      </div>

                      {/* View Full Card Page (Primary CTA) */}
                      <a
                        href={`/card/${previewCard.publicId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9365E] to-[#F45B8A] hover:brightness-105 text-white font-semibold text-xs shadow-md shadow-[#D9365E]/20 transition-all hover:scale-[1.02] active:scale-95 ml-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mở trang thiệp</span>
                      </a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
