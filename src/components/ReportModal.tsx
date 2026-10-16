"use client";

import React, { useState } from "react";
import { AlertTriangle, Check, Loader2 } from "lucide-react";

interface ReportModalProps {
  cardPublicId: string;
  onClose: () => void;
  onReportSubmitted?: () => void;
}

const REPORT_REASONS = [
  "Nội dung không phù hợp chuẩn mực công sở",
  "Từ ngữ nhạy cảm hoặc mang tính công kích",
  "Nội dung spam hoặc quảng cáo ngoài luồng",
  "Mạo danh hoặc gây hiểu lầm",
  "Lý do khác",
];

export default function ReportModal({ cardPublicId, onClose, onReportSubmitted }: ReportModalProps) {
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/cards/${cardPublicId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, details: details.trim() || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể gửi báo cáo.");
      }

      setSuccess(true);
      if (onReportSubmitted) {
        onReportSubmitted();
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#F8D7E0] space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#F8D7E0]">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Báo cáo lời chúc không phù hợp</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </span>
            <p className="font-bold text-sm text-[#30252B]">
              Báo cáo đã được ghi nhận!
            </p>
            <p className="text-xs text-[#6B5E66]">
              Cảm ơn bạn đã chung tay gìn giữ môi trường văn hóa tích cực tại Global Care.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[#6B5E66]">
              Nếu lời chúc này vi phạm tiêu chuẩn cộng đồng hoặc chứa nội dung phản cảm, xin vui lòng cho chúng tôi biết:
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#30252B]">Lý do báo cáo:</label>
              <div className="space-y-1.5">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2.5 text-xs text-[#4D3A44] cursor-pointer group py-0.5"
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={r}
                      checked={reason === r}
                      onChange={() => setReason(r)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        reason === r
                          ? "border-[#F45B8A] bg-white"
                          : "border-[#F8B4C6] bg-white group-hover:border-[#F45B8A]"
                      }`}
                    >
                      {reason === r && (
                        <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#F45B8A] to-[#E93B67]" />
                      )}
                    </div>
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#30252B] block mb-1">
                Chi tiết thêm (không bắt buộc):
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 300))}
                rows={3}
                placeholder="Mô tả cụ thể nếu có..."
                className="w-full p-2.5 rounded-xl border border-[#F8D7E0] text-xs outline-none focus:border-[#D9365E] resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F8D7E0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition-all"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-[#D9365E] hover:bg-[#B52246] text-white text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Gửi báo cáo</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
