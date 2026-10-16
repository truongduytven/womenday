import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sanitizeText } from "@/lib/moderation";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { reason, details } = body;

    if (!reason || typeof reason !== "string") {
      return NextResponse.json(
        { error: "Vui lòng chọn lý do báo cáo." },
        { status: 400 }
      );
    }

    // Verify card exists
    const card = await prisma.greetingCard.findFirst({
      where: { publicId: id },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Không tìm thấy thiệp cần báo cáo." },
        { status: 404 }
      );
    }

    // Save report
    const report = await prisma.greetingReport.create({
      data: {
        greetingCardId: card.id,
        reason: sanitizeText(reason).slice(0, 100),
        details: details ? sanitizeText(details).slice(0, 300) : null,
        status: "pending",
      },
    });

    // Check report count: If a card receives 3+ pending reports, automatically set status to 'pending_review'
    const reportCount = await prisma.greetingReport.count({
      where: { greetingCardId: card.id },
    });

    if (reportCount >= 3) {
      await prisma.greetingCard.update({
        where: { id: card.id },
        data: { status: "pending_review" },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã gửi phản hồi. Ban quản trị sẽ rà soát nội dung này.",
      reportId: report.id,
    });
  } catch (error: unknown) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Không thể gửi báo cáo vào lúc này. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
