import { NextRequest, NextResponse } from "next/server";
import { uploadImageBufferToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Vui lòng chọn tệp hình ảnh hợp lệ." },
        { status: 400 }
      );
    }

    // Check mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Định dạng tệp không được hỗ trợ. Vui lòng tải lên ảnh (JPG, PNG, WEBP, v.v.)." },
        { status: 400 }
      );
    }

    // Check size limit: 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Dung lượng ảnh không được vượt quá 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageBufferToCloudinary(buffer, "womenday");

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Không thể tải ảnh lên lúc này. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
