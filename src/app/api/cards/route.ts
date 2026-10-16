import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkContentAppropriate, sanitizeText } from "@/lib/moderation";
import { randomBytes } from "crypto";

// Allowed themes
const ALLOWED_THEMES = ["bloom", "joy", "minimal", "celebration"];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
    const theme = searchParams.get("theme");

    const whereClause: {
      status: string;
      cardTheme?: string;
    } = {
      status: "published",
    };

    if (theme && ALLOWED_THEMES.includes(theme)) {
      whereClause.cardTheme = theme;
    }

    const [total, cards] = await Promise.all([
      prisma.greetingCard.count({ where: whereClause }),
      prisma.greetingCard.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
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
      }),
    ]);

    return NextResponse.json({
      cards,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách lời chúc từ máy chủ." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, senderName, senderDepartment, cardTheme, imageUrl, agreedToPublish } = body;

    if (!agreedToPublish) {
      return NextResponse.json(
        { error: "Vui lòng đồng ý chia sẻ lời chúc công khai trên Wish Wall." },
        { status: 400 }
      );
    }

    // Validate message
    const moderation = checkContentAppropriate(message);
    if (!moderation.isAppropriate) {
      return NextResponse.json(
        { error: moderation.reason || "Nội dung lời chúc không hợp lệ." },
        { status: 400 }
      );
    }

    // Validate theme
    const theme = ALLOWED_THEMES.includes(cardTheme) ? cardTheme : "bloom";

    // Sanitize optional fields (mặc định 'Đồng nghiệp' nếu không nhập)
    const sanitizedSender = senderName && senderName.trim() ? sanitizeText(senderName).slice(0, 50) : "Đồng nghiệp";
    const sanitizedDept = senderDepartment ? sanitizeText(senderDepartment).slice(0, 50) : null;
    const sanitizedMessage = sanitizeText(message).slice(0, 500);

    // Validate imageUrl if present (Cloudinary secure_url or external image url)
    let sanitizedImageUrl: string | null = null;
    if (typeof imageUrl === "string" && imageUrl.trim().startsWith("http")) {
      sanitizedImageUrl = imageUrl.trim();
    }

    // Generate unique short publicId
    const publicId = randomBytes(6).toString("base64url");

    const newCard = await prisma.greetingCard.create({
      data: {
        publicId,
        message: sanitizedMessage,
        senderName: sanitizedSender,
        senderDepartment: sanitizedDept,
        cardTheme: theme,
        imageUrl: sanitizedImageUrl,
        status: "published",
      },
    });

    return NextResponse.json(
      {
        success: true,
        card: {
          id: newCard.id,
          publicId: newCard.publicId,
          message: newCard.message,
          senderName: newCard.senderName,
          senderDepartment: newCard.senderDepartment,
          cardTheme: newCard.cardTheme,
          imageUrl: newCard.imageUrl,
          createdAt: newCard.createdAt,
        },
        shareUrl: `/card/${newCard.publicId}`,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating greeting card:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi lưu thiệp chúc. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
