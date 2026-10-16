// Basic sensitive/inappropriate Vietnamese words filter
const BANNED_PATTERNS = [
  /đ[ụ|i|m|c|e|é|ệ|k|b|l]/i,
  /v[l|k|c]/i,
  /c[ặ|ù|a|ặ]c/i,
  /l[ồ|o|z]ng/i,
  /ch[ó|o] đ[ẻ|e]/i,
  /đ[i|ĩ] đ[o|õ|õ]a/i,
  /m[ẹ|e] m[à|a]y/i,
  /th[ằ|a]ng kh[ố|o]n/i,
  /con kh[ố|o]n/i,
  /d[â|a]m d[ụ|u]c/i,
  /t[ì|i]nh d[ụ|u]c/i,
  /l[ừ|u]a đ[ả|a]o/i,
  /c[ờ|o] b[ạ|a]c/i,
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
