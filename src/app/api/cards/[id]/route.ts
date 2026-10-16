import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Thiếu mã định danh thiệp." }, { status: 400 });
    }

    const card = await prisma.greetingCard.findFirst({
      where: {
        publicId: id,
        status: "published",
      },
      select: {
        id: true,
        publicId: true,
        message: true,
        senderName: true,
        senderDepartment: true,
        cardTheme: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Không tìm thấy thiệp chúc mừng hoặc thiệp đã bị gỡ." },
        { status: 404 }
      );
    }

    return NextResponse.json({ card });
  } catch (error: unknown) {
    console.error("Error fetching single card:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi tải thông tin thiệp." },
      { status: 500 }
    );
  }
}
