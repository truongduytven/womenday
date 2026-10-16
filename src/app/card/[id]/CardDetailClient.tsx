"use client";

import React, { useRef, useState } from "react";
import GreetingCard, { CardData } from "@/components/GreetingCard";
import ReportModal from "@/components/ReportModal";
import { Download, Copy, Share2, Check, Loader2, Sparkles, Flag } from "lucide-react";
import { toPng } from "html-to-image";
import Link from "next/link";

interface CardDetailClientProps {
  card: CardData;
}

export default function CardDetailClient({ card }: CardDetailClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `thiep-20-10-globalcare-${card.publicId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image:", err);
      alert("Không thể xuất file ảnh. Bạn có thể chụp lại màn hình thiệp!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Thiệp chúc mừng 20/10 — Global Care",
          text: `Một lời chúc 20/10 ấm áp gửi tặng phái đẹp Global Care!`,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-6">
      {/* The Printable Card View */}
      <div ref={cardRef} className="rounded-3xl shadow-2xl overflow-hidden">
        <GreetingCard card={card} />
      </div>

      {/* Action Controls */}
      <div className="p-6 rounded-3xl bg-white border border-[#F8D7E0] shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs text-[#8A7982] border-b border-[#F8D7E0] pb-3">
          <span>Liên kết chia sẻ thiệp này</span>
          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Báo cáo</span>
          </button>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleDownloadPNG}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#D9365E] text-[#D9365E] hover:bg-[#FFF0F4] font-bold text-xs transition-all disabled:opacity-60"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Tải thiệp PNG</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#30252B] font-bold text-xs transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Đã chép link</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#F45B8A] to-[#D9365E] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Chia sẻ thiệp</span>
          </button>
        </div>

        {/* Navigation bottom links */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F8D7E0] text-xs">
          <Link
            href="/#wishwall"
            className="text-[#6B5E66] hover:text-[#D9365E] font-medium"
          >
            ← Bảng Wish Wall
          </Link>

          <Link
            href="/#composer"
            className="text-[#D9365E] font-bold hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tự tạo lời chúc của bạn</span>
          </Link>
        </div>
      </div>

      {showReportModal && (
        <ReportModal
          cardPublicId={card.publicId || ""}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}
