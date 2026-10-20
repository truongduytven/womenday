import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CardDetailClient from "./CardDetailClient";

export const dynamic = "force-dynamic";

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  const { id } = await params;
  const card = await prisma.greetingCard.findFirst({
    where: { publicId: id, status: "published" },
    select: { message: true, senderName: true, cardTheme: true },
  });

  if (!card) {
    return {
      title: "Thiệp chúc mừng không tồn tại | Global Care",
    };
  }

  const sender = card.senderName ? `từ ${card.senderName}` : "từ đồng nghiệp";
  const snippet =
    card.message.length > 80 ? `${card.message.slice(0, 80)}...` : card.message;

  // Lấy URL thực tế từ domain đang truy cập (hoặc NEXT_PUBLIC_APP_URL) để link chia sẻ mở được chính xác
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (host ? `${proto}://${host}` : "");
  const cardUrl = baseUrl ? `${baseUrl.replace(/\/$/, "")}/card/${id}` : `/card/${id}`;

  return {
    metadataBase: baseUrl ? new URL(baseUrl) : new URL("http://localhost:5173"),
    title: `Thiệp chúc 20/10 ${sender} — Global Care`,
    description: snippet,
    openGraph: {
      title: `Thiệp chúc mừng 20/10 gửi phái đẹp Global Care`,
      description: snippet,
      url: cardUrl,
      siteName: "Global Care Women's Day 2026",
      type: "website",
    },
  };
}

export default async function CardDetailPage({ params }: CardPageProps) {
  const { id } = await params;

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
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFF3F6] flex flex-col justify-between py-10 px-4 sm:px-6 selection:bg-[#F45B8A]/20 selection:text-[#D9365E]">
      {/* Top bar with logo and back link */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-28 relative">
            <Image
              src="/globalcare-logo.webp"
              alt="Global Care"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <span className="text-xs text-[#8A7982] hidden sm:inline">
            · 20/10/2026
          </span>
        </Link>

        <Link
          href="/#wishwall"
          className="text-xs font-semibold text-[#D9365E] hover:underline"
        >
          ← Xem tất cả trên Wish Wall
        </Link>
      </header>

      {/* Main Card Detail Content (Interactive client component for PNG download & share) */}
      <main className="max-w-xl mx-auto w-full">
        <CardDetailClient card={card} />
      </main>

      {/* Footer */}
      <footer className="text-center pt-10 text-xs text-[#A08E97]">
        <p>© 2026 Global Care Corporation. Kỷ niệm Ngày Phụ Nữ Việt Nam 20.10.2026.</p>
      </footer>
    </div>
  );
}
