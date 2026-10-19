// Basic sensitive/inappropriate Vietnamese words filter
const BANNED_PATTERNS = [
  /\b(đm|đkm|đmm|dcm|đcm|vcl|vcll|vkl)\b/i,
  /\b(đụ|địt|cặc|lồn|buồi)\b/i,
  /\bchó đẻ\b/i,
  /\bđĩ đõa\b/i,
  /\bmẹ mày\b/i,
  /\bthằng khốn\b/i,
  /\bcon khốn\b/i,
  /\bdâm dục\b/i,
  /\blừa đảo\b/i,
  /\bcờ bạc\b/i,
];

export function checkContentAppropriate(text: string): { isAppropriate: boolean; reason?: string } {
  if (!text || typeof text !== "string") {
    return { isAppropriate: false, reason: "Nội dung lời chúc không được để trống." };
  }

  const clean = text.trim();
  if (clean.length < 5) {
    return { isAppropriate: false, reason: "Lời chúc cần có độ dài tối thiểu 5 ký tự." };
  }

  if (clean.length > 500) {
    return { isAppropriate: false, reason: "Lời chúc không được vượt quá 500 ký tự." };
  }

  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(clean)) {
      return {
        isAppropriate: false,
        reason: "Nội dung chứa từ ngữ không phù hợp với văn hóa nội bộ công ty. Vui lòng điều chỉnh lại.",
      };
    }
  }

  return { isAppropriate: true };
}

export function sanitizeText(text?: string | null): string {
  if (!text) return "";
  return text
    .trim()
    .replace(/[<>]/g, ""); // strip raw tags to prevent XSS
}
