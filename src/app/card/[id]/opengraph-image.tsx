import { ImageResponse } from "next/og";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const alt = "Thiệp mừng 20/10 — Global Care";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let message = "Chúc mừng Ngày Phụ Nữ Việt Nam 20/10!";
  let sender = "Đồng nghiệp";

  try {
    const card = await prisma.greetingCard.findFirst({
      where: { publicId: id, status: "published" },
      select: { message: true, senderName: true },
    });
    if (card) {
      message = card.message;
      if (card.senderName) sender = card.senderName;
    }
  } catch (e) {
    console.error(e);
  }

  const truncatedMessage =
    message.length > 180 ? `${message.slice(0, 180)}...` : message;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FFF3F6 0%, #FFE6ED 50%, #FFD6E2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          border: "16px solid #F45B8A",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #F8C3D2",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 20,
                color: "#D9365E",
                fontWeight: "bold",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              20.10.2026 · VIETNAMESE WOMEN&apos;S DAY
            </span>
            <span style={{ fontSize: 16, color: "#785C66", marginTop: 4 }}>
              Global Care — Gửi nàng một điều tử tế
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1A437E",
              letterSpacing: 1,
            }}
          >
            GLOBAL CARE
          </div>
        </div>

        {/* Message */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "30px 0",
          }}
        >
          <p
            style={{
              fontSize: 32,
              lineHeight: 1.5,
              color: "#30252B",
              fontWeight: 500,
            }}
          >
            &ldquo;{truncatedMessage}&rdquo;
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #F8C3D2",
            paddingTop: "24px",
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "#D9365E",
              fontWeight: "bold",
            }}
          >
            {sender}
          </span>
          <span
            style={{
              fontSize: 18,
              color: "#785C66",
            }}
          >
            globalcare.com.vn
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
