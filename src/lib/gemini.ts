import { GoogleGenAI } from "@google/genai";

export type SuggestionTone = "chan-thanh" | "vui-tuoi" | "truyen-cam-hung" | "hai-huoc" | "ngan-gon";

export interface TonePreset {
  id: SuggestionTone;
  label: string;
  description: string;
  fallbackSuggestions: string[];
}

export const TONE_PRESETS: Record<SuggestionTone, TonePreset> = {
  "chan-thanh": {
    id: "chan-thanh",
    label: "Chân thành & Trân trọng",
    description: "Ấm áp, biết ơn những nỗ lực thầm lặng mỗi ngày",
    fallbackSuggestions: [
      "Nhân ngày Phụ nữ Việt Nam 20/10, tôi xin gửi lời chúc an lành và hạnh phúc nhất đến toàn thể các chị em Global Care. Cảm ơn mọi người vì sự tận tâm, chu đáo và nguồn năng lượng tích cực luôn lan tỏa khắp công ty mỗi ngày!",
      "Anh em Global Care chúc các bóng hồng một ngày 20/10 ngập tràn niềm vui, hoa và những nụ cười rạng rỡ. Cảm ơn sự đồng hành và những đóng góp thầm lặng của các bạn cho sự phát triển của công ty chúng ta.",
      "Tôi thương chúc các chị em đồng nghiệp một mùa 20/10 thật ấm áp, an yên. Chúc mọi người luôn tìm thấy niềm hứng khởi trong công việc và trọn vẹn hạnh phúc bên gia đình.",
    ],
  },
  "vui-tuoi": {
    id: "vui-tuoi",
    label: "Vui tươi & Trẻ trung",
    description: "Tươi tắn, rạng rỡ và tràn ngập niềm vui",
    fallbackSuggestions: [
      "20/10 anh em Global Care chúc các chị em luôn xinh đẹp rạng ngời, việc gì cũng hanh thông, KPI chạy phà phà và lúc nào cũng ngập tràn trà sữa cùng quà cáp nhé!",
      "Tôi chúc các nữ thần Global Care một ngày 20/10 cười thả ga, ăn ngon không lo béo, ví luôn rủng rỉnh và ngày nào đi làm cũng tràn đầy năng lượng tích cực!",
      "Anh em chúng tôi xin gửi ngàn đóa hoa tươi thắm đến phái đẹp Global Care! Chúc các bạn luôn tươi trẻ như hoa mùa xuân, luôn là nguồn năng lượng sáng bừng văn phòng mỗi sáng!",
    ],
  },
  "truyen-cam-hung": {
    id: "truyen-cam-hung",
    label: "Truyền cảm hứng",
    description: "Tự tin, bản lĩnh và tỏa sáng theo cách riêng",
    fallbackSuggestions: [
      "Đối với anh em Global Care, mỗi người phụ nữ tại công ty đều là một đóa hoa độc bản với tài năng và bản lĩnh riêng. Chúc các bạn luôn tự tin tỏa sáng trên hành trình chinh phục những mục tiêu lớn!",
      "Tôi chúc các chị em luôn kiên định với ước mơ, tự hào về những giá trị mình tạo ra và không ngừng bứt phá. Các bạn chính là nguồn cảm hứng tuyệt vời cho toàn thể anh em đồng nghiệp!",
      "Sự nhạy bén, kiên nhẫn và tinh tế của các chị em chính là sức mạnh tuyệt vời tại Global Care. Anh em chúc các bạn một ngày 20/10 thật tự hào và nhiều niềm tin bước tiếp!",
    ],
  },
  "hai-huoc": {
    id: "hai-huoc",
    label: "Hài hước tinh tế",
    description: "Dí dỏm, văn minh công sở, mang lại tiếng cười",
    fallbackSuggestions: [
      "Hôm nay 20/10, toàn bộ anh em Global Care xin phép nhận hết mọi việc nặng nhọc, chị em chỉ việc xinh đẹp nhận hoa quà và thưởng thức trà sữa ngon nhất quả đất thôi!",
      "20/10 này tôi xin chúc các chị em: Bug tự động biến mất, task tự động hoàn thành, deadline lùi xa vô tận và sếp duyệt claim nhanh như chớp mắt!",
      "Anh em chúng tôi chúc phái đẹp Global Care nhan sắc ngày càng thăng hạng, số dư tài khoản tăng liên tục và lúc nào cũng có người tranh nhau order trà sữa tặng!",
    ],
  },
  "ngan-gon": {
    id: "ngan-gon",
    label: "Ngắn gọn ý nghĩa",
    description: "Súc tích, cô đọng nhưng trọn vẹn tình cảm",
    fallbackSuggestions: [
      "Tôi xin chúc toàn thể phái đẹp Global Care ngày 20/10 thật nhiều niềm vui, sức khỏe và luôn rạng ngời hạnh phúc!",
      "Anh em Global Care chúc các chị em 20/10 an vui, thành công và mãi luôn tươi trẻ!",
      "Gửi trọn điều tử tế và lời chúc tốt lành nhất từ anh em đồng nghiệp đến những đóa hoa xinh đẹp của Global Care!",
    ],
  },
};

export async function generateSuggestionsWithGemini(
  tone: SuggestionTone,
  senderName?: string,
  department?: string
): Promise<{ suggestions: string[]; fromAI: boolean; error?: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    // Return curated presets if key is not configured
    const preset = TONE_PRESETS[tone] || TONE_PRESETS["chan-thanh"];
    return {
      suggestions: preset.fallbackSuggestions,
      fromAI: false,
      error: "Chưa cấu hình GEMINI_API_KEY. Đang sử dụng các gợi ý chọn lọc có sẵn.",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const effectiveSender = senderName && senderName.trim() ? senderName.trim() : "Đồng nghiệp";

    const prompt = `Bạn là trợ lý viết lời chúc Ngày Phụ nữ Việt Nam 20/10/2026 cho cán bộ nhân viên nam tại công ty công nghệ bảo hiểm Global Care (https://globalcare.com.vn/).
Hãy viết 3 gợi ý lời chúc 20/10 gửi tặng toàn thể các chị em phụ nữ đồng nghiệp tại Global Care.

Thông tin người gửi:
- Chủ thể người gửi (Sender): ${effectiveSender}
${department ? `- Phòng ban: ${department}` : ""}
- Tông giọng mong muốn: ${TONE_PRESETS[tone]?.label || "Chân thành & Ấm áp"} (${TONE_PRESETS[tone]?.description || ""}).

QUY TẮC BẮT BUỘC VỀ NGÔI KỂ & NGƯỜI GỬI:
1. NGÔI XƯNG: Người gửi là ĐỒNG NGHIỆP viết cho đồng nghiệp nữ. Bắt buộc xưng hô theo góc nhìn cá nhân hoặc tập thể anh em:
   - Nếu có tên riêng ("${senderName || ''}"): xưng tên hoặc "tôi/mình".
   - Nếu không có tên riêng: xưng là "Tôi", "Mình", hoặc "Anh em Global Care" (ví dụ: "Nhân ngày 20/10, tôi xin gửi lời chúc...", "Anh em Global Care chúc các chị em...", "Thay mặt anh em trong team, mình chúc các bạn...").
2. TUYỆT ĐỐI KHÔNG XƯNG LÀ "GLOBAL CARE": Không bao giờ viết "Global Care xin chúc...", "Công ty Global Care tự hào...", "Global Care xin gửi...". Global Care là tên công ty, không phải là người gửi lời chúc.
3. Người nhận: Gửi chung đến tập thể "các chị em", "các bóng hồng", "phái đẹp Global Care".
4. Tinh thần: Tử tế, biết ơn, đồng nghiệp trân trọng nhau, văn minh nơi công sở.
5. Không sến sẩm, không lãng mạn tình cảm đôi lứa, không định kiến giới tính.
6. Mỗi lời chúc từ 40 đến 80 từ tiếng Việt chuẩn xác dấu câu.
7. Trả về đúng định dạng JSON là một mảng chuỗi 3 phần tử: ["Lời chúc 1", "Lời chúc 2", "Lời chúc 3"]. Không thêm bất kỳ text nào ngoài JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "";
    // Extract JSON array
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return {
          suggestions: parsed.slice(0, 3).map((s: unknown) => String(s).trim()),
          fromAI: true,
        };
      }
    }

    // Fallback if parsing fails
    const fallback = TONE_PRESETS[tone]?.fallbackSuggestions || TONE_PRESETS["chan-thanh"].fallbackSuggestions;
    return {
      suggestions: fallback,
      fromAI: false,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI service unavailable";
    console.warn("Gemini API call failed, falling back to curated presets:", message);
    const fallback = TONE_PRESETS[tone]?.fallbackSuggestions || TONE_PRESETS["chan-thanh"].fallbackSuggestions;
    return {
      suggestions: fallback,
      fromAI: false,
      error: `Không thể kết nối dịch vụ AI (${message}). Đang dùng gợi ý chọn lọc có sẵn.`,
    };
  }
}
