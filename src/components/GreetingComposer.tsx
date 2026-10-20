"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import GreetingCard, { CardData } from "./GreetingCard";
import {
  Sparkles,
  Bot,
  Copy,
  Share2,
  Download,
  RotateCcw,
  Check,
  AlertCircle,
  Loader2,
  Palette,
  Send,
  ExternalLink,
  Camera,
  UploadCloud,
  Trash2,
  ImageIcon,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";

// Preset Templates
interface TemplateItem {
  id: string;
  category: string;
  text: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: "t1",
    category: "Chân thành & Trân trọng",
    text: "Chúc các chị em Globalcare luôn rạng rỡ, tự tin và gặp thật nhiều điều tốt đẹp. Cảm ơn mọi người vì đã làm cho mỗi ngày đi làm trở nên nhiều cảm hứng hơn. Chúc mừng Ngày Phụ Nữ Việt Nam 20/10!",
  },
  {
    id: "t2",
    category: "Vui vẻ & Dí dỏm",
    text: "Chúc toàn thể bóng hồng Global Care ngày 20/10: Nhận quà mỏi tay, hoa ngập lối về, trà sữa ngập bàn và nụ cười luôn nở trên môi! Các chị em mãi là điều tuyệt vời nhất của văn phòng!",
  },
  {
    id: "t3",
    category: "Truyền cảm hứng",
    text: "Mỗi người phụ nữ tại Global Care đều sở hữu bản lĩnh và ánh sáng riêng biệt. Cảm ơn bạn vì sự kiên cường và những cống hiến âm thầm nhưng vĩ đại. Chúc bạn luôn tỏa sáng theo cách của chính mình!",
  },
  {
    id: "t4",
    category: "Hài hước văn minh",
    text: "20/10 này chúc các chị em: Bug tự động biến mất, hợp đồng ký mỏi tay, deadline tự động lùi xa và luôn xinh đẹp tuyệt trần trong mắt anh em Global Care!",
  },
  {
    id: "t5",
    category: "Ngắn gọn ý nghĩa",
    text: "Nhân ngày 20/10, xin gửi ngàn điều tử tế và lời chúc bình an, hạnh phúc nhất đến những người phụ nữ tuyệt vời của Global Care!",
  },
];

const THEMES = [
  {
    id: "bloom",
    name: "Bloom",
    desc: "Hoa nở & Tinh tế",
    previewColor: "bg-[#FFF0F4] border-[#F8C3D2]",
    image: "/images/floral_bloom.jpg",
  },
  {
    id: "joy",
    name: "Joy",
    desc: "Vui tươi & Trẻ trung",
    previewColor: "bg-[#FFEFEA] border-[#FDC0B0]",
    image: "/images/floral_joy.jpg",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Hiện đại & Tối giản",
    previewColor: "bg-white border-[#E8DFE3]",
    image: "/images/floral_minimal.jpg",
  },
  {
    id: "celebration",
    name: "Celebration",
    desc: "Sang trọng & Rực rỡ",
    previewColor: "bg-[#8A1835] border-[#EAB308]",
    image: "/images/floral_celebration.jpg",
  },
];

interface GreetingComposerProps {
  onCardPublished?: (newCard: CardData) => void;
}

export default function GreetingComposer({ onCardPublished }: GreetingComposerProps) {
  // Form State
  const [message, setMessage] = useState(
    "Chúc các chị em Globalcare luôn rạng rỡ, tự tin và gặp thật nhiều điều tốt đẹp. Cảm ơn mọi người vì đã làm cho mỗi ngày đi làm trở nên nhiều cảm hứng hơn..."
  );
  const [senderName, setSenderName] = useState("");
  const [senderDepartment, setSenderDepartment] = useState("");
  const [cardTheme, setCardTheme] = useState("bloom");
  const [agreedToPublish, setAgreedToPublish] = useState(true);

  // AI Modal / State
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiTone, setAiTone] = useState("chan-thanh");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Publishing State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [publishedCard, setPublishedCard] = useState<CardData | null>(null);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Custom Photo Upload (Cloudinary)
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ref for card preview image export
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  // Handle Photo File Selection & Immediate Cloudinary Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Dung lượng ảnh tối đa là 10MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WEBP...).");
      return;
    }

    setUploadError(null);
    setIsUploadingImage(true);

    // Instant local preview for immediate visual feedback
    const localUrl = URL.createObjectURL(file);
    setCustomImageUrl(localUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể tải ảnh lên máy chủ lúc này.");
      }

      // Set permanent Cloudinary secure URL
      setCustomImageUrl(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tải ảnh lên thất bại.";
      setUploadError(msg);
      // Keep local preview so user still sees their photo in browser
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveCustomImage = () => {
    setCustomImageUrl(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Step 1: Select template
  const handleSelectTemplate = (templateText: string) => {
    setMessage(templateText);
  };

  // Step 3: Call AI
  const handleFetchAiSuggestions = async (tone = aiTone) => {
    setIsAiLoading(true);
    setAiNotice(null);
    try {
      const res = await fetch("/api/ai-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tone,
          senderName: senderName || undefined,
          department: senderDepartment || undefined,
        }),
      });
      const data = await res.json();
      if (data.suggestions && data.suggestions.length > 0) {
        setAiSuggestions(data.suggestions);
      }
      if (data.error) {
        setAiNotice(data.error);
      }
    } catch {
      setAiNotice("Không thể kết nối máy chủ AI. Đang hiển thị các mẫu gợi ý.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleOpenAI = () => {
    setShowAIModal(true);
    if (aiSuggestions.length === 0) {
      handleFetchAiSuggestions(aiTone);
    }
  };

  // Step 6: Publish card
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!message || message.trim().length < 5) {
      setSubmitError("Vui lòng nhập lời chúc có ít nhất 5 ký tự.");
      return;
    }

    if (message.length > 500) {
      setSubmitError("Lời chúc không được vượt quá 500 ký tự.");
      return;
    }

    if (!agreedToPublish) {
      setSubmitError("Vui lòng xác nhận đồng ý chia sẻ lời chúc công khai.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          senderName: senderName.trim() || null,
          senderDepartment: senderDepartment.trim() || null,
          cardTheme,
          imageUrl: customImageUrl || null,
          agreedToPublish,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Không thể gửi thiệp lúc này.");
      }

      setPublishedCard(data.card);
      const fullUrl = `${window.location.origin}${data.shareUrl}`;
      setShareUrl(fullUrl);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F45B8A", "#D9365E", "#FFD166", "#06D6A0"],
      });

      if (onCardPublished) {
        onCardPublished(data.card);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download Card as PNG
  const handleDownloadPNG = async () => {
    if (!cardPreviewRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardPreviewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `thiep-20-10-globalcare-${publishedCard?.publicId || "card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image:", err);
      alert("Không thể tạo file ảnh lúc này. Bạn có thể chụp màn hình thiệp!");
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy share link
  const handleCopyLink = () => {
    const targetUrl = shareUrl || (publishedCard ? `${window.location.origin}/card/${publishedCard.publicId}` : "");
    if (!targetUrl) return;
    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Native share - sử dụng chính xác link của sao chép link
  const handleNativeShare = async () => {
    const targetUrl = shareUrl || (publishedCard ? `${window.location.origin}/card/${publishedCard.publicId}` : "");
    if (!targetUrl) return;

    // Luôn sao chép link vào clipboard để đảm bảo người dùng có sẵn link mở được
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Ignored
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Thiệp chúc 20/10 — Global Care",
          text: `Gửi tặng các chị em Global Care thiệp chúc mừng Ngày Phụ Nữ Việt Nam!\n${targetUrl}`,
          url: targetUrl,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  // Reset composer
  const handleResetComposer = () => {
    setPublishedCard(null);
    setMessage(
      "Chúc các chị em Globalcare luôn rạng rỡ, tự tin và gặp thật nhiều điều tốt đẹp. Cảm ơn mọi người vì đã làm cho mỗi ngày đi làm trở nên nhiều cảm hứng hơn..."
    );
    setSenderName("");
    setSenderDepartment("");
    setCustomImageUrl(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const previewData: CardData = {
    message,
    senderName: senderName.trim() || "Đồng nghiệp",
    senderDepartment: senderDepartment.trim() || null,
    cardTheme,
    imageUrl: customImageUrl,
  };

  return (
    <section id="composer" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FFF8FA] to-[#FFFFFF] border-b border-[#F5CAD6] shadow-[inset_0_1px_3px_rgba(217,54,94,0.02)]">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F45B8A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D9365E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F4] border border-[#F8D7E0] text-xs font-bold tracking-widest text-[#D9365E] uppercase shadow-xs mb-5">
            Tạo Thiệp Điện Tử
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-[#30252B] leading-tight mb-4">
            Để hôm nay, lời chúc được nói thành lời
          </h2>
          <p className="text-base text-[#6B5E66] leading-relaxed max-w-xl">
            Không cần lời hoa mỹ. Chỉ cần một chút chân thành, và một điều tốt đẹp
            bạn muốn gửi đến các chị em Globalcare.
          </p>
        </div>

        {/* Composer & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form & Tools */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#F8D7E0] space-y-6">
            {/* Step 1: Template selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#30252B]">
                  Bước 1: Chọn lời chúc mẫu có sẵn
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tpl.text)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#D9365E] hover:bg-[#F45B8A] hover:text-white transition-all font-medium border border-[#F8D7E0]"
                  >
                    {tpl.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Message editor & AI Assistant button */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="greeting-message"
                  className="text-xs font-bold uppercase tracking-wider text-[#30252B]"
                >
                  Bước 2: Viết lời chúc của bạn
                </label>

                {/* AI Assistant Button */}
                <button
                  type="button"
                  onClick={handleOpenAI}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#D9365E] to-[#F45B8A] text-white shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Gợi ý cùng AI</span>
                </button>
              </div>

              <div className="relative">
                <textarea
                  id="greeting-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  rows={5}
                  placeholder="Chúc các chị em Globalcare luôn rạng rỡ, tự tin và gặp thật nhiều điều tốt đẹp..."
                  className="w-full p-4 rounded-2xl border border-[#F8D7E0] focus:border-[#F45B8A] focus:ring-2 focus:ring-[#F45B8A]/20 outline-none text-sm leading-relaxed text-[#30252B] placeholder:text-[#A0939A] transition-all resize-none"
                />
                <div className="flex items-center justify-between mt-1.5 text-xs text-[#8A7982]">
                  <button
                    type="button"
                    onClick={() => setMessage("")}
                    className="hover:text-[#D9365E] transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Làm mới lời chúc</span>
                  </button>
                  <span
                    className={
                      message.length >= 480
                        ? "text-red-500 font-semibold"
                        : "text-[#8A7982]"
                    }
                  >
                    {message.length}/500 ký tự
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Card Theme */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#30252B] block mb-2.5">
                Bước 3: Chọn phong cách thiệp
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {THEMES.map((theme) => {
                  const isSelected = cardTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setCardTheme(theme.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-[#D9365E] bg-[#FFF0F4] shadow-sm ring-2 ring-[#D9365E]/20"
                          : "border-[#F8D7E0] hover:border-[#F45B8A] bg-white"
                      }`}
                    >
                      <div className="relative w-full h-12 rounded-xl mb-2 overflow-hidden border border-[#F8D7E0] shadow-sm">
                        <Image
                          src={theme.image}
                          alt={theme.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="font-bold text-xs text-[#30252B]">
                        {theme.name}
                      </p>
                      <p className="text-[10px] text-[#806D76]">{theme.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Add Card Photo (Optional - User Custom Upload to Cloudinary or Theme Default) */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#30252B] flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#D9365E]" />
                  <span>Bước 4: Thêm ảnh cho thiệp (tùy chọn)</span>
                </label>

                {customImageUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveCustomImage}
                    className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Dùng ảnh mặc định</span>
                  </button>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                id="card-photo-input"
              />

              {!customImageUrl ? (
                /* Empty State: Upload Dropzone */
                <label
                  htmlFor="card-photo-input"
                  className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border-2 border-dashed border-[#F8D2DD] hover:border-[#D9365E] bg-[#FFFBFD] hover:bg-[#FFF0F4]/60 transition-all cursor-pointer group text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] group-hover:bg-white text-[#D9365E] flex items-center justify-center mb-3 shadow-xs transition-colors">
                    <UploadCloud className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#30252B] mb-1">
                    Tải ảnh kỷ niệm từ thiết bị của bạn
                  </p>
                  <p className="text-[11px] text-[#78656F] max-w-sm leading-relaxed mb-2">
                    Ảnh chân dung, ảnh chụp cùng đồng nghiệp, kỷ niệm đáng nhớ... (JPG, PNG, WEBP tối đa 10MB).
                  </p>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#F8D7E0] text-[11px] font-semibold text-[#D9365E] shadow-2xs group-hover:bg-[#D9365E] group-hover:text-white transition-all">
                    <Sparkles className="w-3 h-3" />
                    <span>Chọn tệp ảnh</span>
                  </span>
                  <p className="text-[10px] text-[#A08E97] mt-2 italic">
                    * Nếu không tải ảnh, thiệp sẽ tự động dùng ảnh mặc định của phong cách đã chọn ở Bước 3.
                  </p>
                </label>
              ) : (
                /* Uploaded State */
                <div className="p-4 rounded-2xl border border-[#F8D7E0] bg-[#FFFBFD] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-[#D9365E] shadow-sm shrink-0">
                      <Image
                        src={customImageUrl}
                        alt="Ảnh thiệp đã tải"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                        {isUploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D9365E]" />
                            <span className="text-[#D9365E]">Đang tải lên Cloudinary...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã tải ảnh lên thành công!</span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-[#705E67] mt-0.5 truncate">
                        Ảnh đã hiển thị to & rõ ràng trên thiệp xem trước bên phải.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <label
                      htmlFor="card-photo-input"
                      className="px-3 py-1.5 rounded-xl border border-[#F8D7E0] bg-white hover:bg-[#FFF0F4] text-xs font-semibold text-[#30252B] cursor-pointer transition-all shadow-2xs"
                    >
                      Đổi ảnh
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveCustomImage}
                      title="Xóa ảnh và dùng ảnh mặc định"
                      className="p-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-red-500 font-medium mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {uploadError}
                </p>
              )}
            </div>

            {/* Step 5: Sender Info (Optional) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#30252B] block mb-2.5">
                Bước 5: Thông tin người gửi (tùy chọn)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sender-name"
                    className="block text-xs font-semibold text-[#4D3A44] mb-1.5"
                  >
                    Tên hoặc Biệt danh (không bắt buộc)
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    maxLength={50}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="VD: Tuấn Nguyễn... (để trống: Đồng nghiệp)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F8D7E0] focus:border-[#F45B8A] focus:ring-2 focus:ring-[#F45B8A]/20 outline-none text-xs text-[#30252B] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sender-dept"
                    className="block text-xs font-semibold text-[#4D3A44] mb-1.5"
                  >
                    Phòng ban / Đội ngũ (không bắt buộc)
                  </label>
                  <input
                    id="sender-dept"
                    type="text"
                    maxLength={50}
                    value={senderDepartment}
                    onChange={(e) => setSenderDepartment(e.target.value)}
                    placeholder="VD: Khối Công Nghệ, Ban Kinh Doanh..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F8D7E0] focus:border-[#F45B8A] focus:ring-2 focus:ring-[#F45B8A]/20 outline-none text-xs text-[#30252B] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Public Confirmation Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={agreedToPublish}
                  onChange={(e) => setAgreedToPublish(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 border-2 ${
                    agreedToPublish
                      ? "bg-gradient-to-tr from-[#F45B8A] to-[#E93B67] border-[#E93B67] text-white shadow-md shadow-[#E93B67]/30 scale-100"
                      : "bg-white border-[#F8B4C6] group-hover:border-[#F45B8A]"
                  }`}
                >
                  {agreedToPublish && (
                    <Check className="w-4 h-4 stroke-[3] animate-in zoom-in-75 text-white" />
                  )}
                </div>
                <span className="text-xs text-[#5C4D55] leading-relaxed group-hover:text-[#30252B] transition-colors">
                  Tôi đồng ý hiển thị công khai thiệp chúc này trên bảng Wish Wall
                  dành tặng toàn thể nữ cán bộ nhân viên Global Care.
                </span>
              </label>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F45B8A] to-[#D9365E] text-white text-base font-bold shadow-lg shadow-[#D9365E]/25 hover:shadow-xl hover:shadow-[#D9365E]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang lưu và tạo thiệp...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Tạo thiệp và gửi lời chúc</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Live Card Preview & Share Actions */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#30252B]">
                <Palette className="w-4 h-4 text-[#D9365E]" />
                <span>Xem trước thiệp trực tiếp</span>
              </div>
              <span className="text-[11px] text-[#8C7A83] italic">
                Cập nhật tức thì theo nội dung
              </span>
            </div>

            {/* The Actual Rendered Card */}
            <div ref={cardPreviewRef} className="rounded-3xl overflow-hidden shadow-2xl">
              <GreetingCard card={previewData} />
            </div>

            {/* Published Success Dialog / Card Actions */}
            {publishedCard && (
              <div className="p-6 rounded-3xl bg-white border border-[#F8D7E0] shadow-xl space-y-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-2 text-[#059669] font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </span>
                  <span>Thiệp chúc mừng đã được gửi thành công!</span>
                </div>

                <p className="text-xs text-[#6B5E66]">
                  Thiệp của bạn đã xuất hiện trên Wish Wall và có link chia sẻ riêng:
                </p>

                {/* Share Link Input */}
                <div className="flex items-center gap-2 bg-[#FFF0F4] p-2 rounded-xl border border-[#F8D7E0]">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="bg-transparent text-xs text-[#30252B] w-full outline-none px-1"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-[#D9365E] text-white text-xs font-semibold shrink-0 hover:bg-[#B52246] transition-all flex items-center gap-1"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadPNG}
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#D9365E] text-[#D9365E] hover:bg-[#FFF0F4] text-xs font-bold transition-all disabled:opacity-60"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>Tải thiệp PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F45B8A] to-[#D9365E] text-white text-xs font-bold hover:shadow-md transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F8D7E0] text-xs">
                  <a
                    href={`/card/${publishedCard.publicId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A437E] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Mở trang thiệp riêng</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={handleResetComposer}
                    className="text-[#8A7982] hover:text-[#D9365E] transition-colors"
                  >
                    Viết thêm thiệp khác
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Suggestions Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#F8D7E0] space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#F8D7E0]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-gradient-to-br from-[#D9365E] to-[#F45B8A] text-white">
                  <Bot className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-[#30252B]">
                    Gợi ý lời chúc cùng AI
                  </h3>
                  <p className="text-xs text-[#806D76]">
                    Chọn tông giọng phù hợp để nhận cảm hứng viết thiệp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAIModal(false)}
                className="p-1 rounded-full text-[#806D76] hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#30252B]">
                Chọn tông giọng:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "chan-thanh", label: "Chân thành" },
                  { id: "vui-tuoi", label: "Vui tươi" },
                  { id: "truyen-cam-hung", label: "Truyền cảm hứng" },
                  { id: "hai-huoc", label: "Hài hước tinh tế" },
                  { id: "ngan-gon", label: "Ngắn gọn" },
                ].map((tone) => (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => {
                      setAiTone(tone.id);
                      handleFetchAiSuggestions(tone.id);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                      aiTone === tone.id
                        ? "bg-[#D9365E] text-white shadow-sm"
                        : "bg-[#FFF0F4] text-[#D9365E] hover:bg-[#F45B8A] hover:text-white"
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notice if any */}
            {aiNotice && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{aiNotice}</span>
              </div>
            )}

            {/* Suggestions list */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {isAiLoading ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-[#D9365E] animate-spin mx-auto" />
                  <p className="text-xs text-[#806D76]">
                    Đang tạo các gợi ý lời chúc 20/10...
                  </p>
                </div>
              ) : (
                aiSuggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F8D7E0] hover:border-[#D9365E] transition-all space-y-2 group"
                  >
                    <p className="text-xs sm:text-sm text-[#30252B] leading-relaxed">
                      &ldquo;{sug}&rdquo;
                    </p>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setMessage(sug);
                          setShowAIModal(false);
                        }}
                        className="text-xs font-bold text-[#D9365E] group-hover:underline flex items-center gap-1"
                      >
                        <span>Sử dụng lời chúc này</span>
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#F8D7E0]">
              <button
                type="button"
                onClick={() => setShowAIModal(false)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#4D3A44] transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
