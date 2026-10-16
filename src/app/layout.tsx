import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Care — Gửi Nàng Một Điều Tử Tế | 20.10.2026",
  description:
    "Chào mừng Ngày Phụ nữ Việt Nam 20/10/2026 cùng Global Care. Gửi một lời thương, trao ngàn điều tử tế tới những người phụ nữ tuyệt vời đang làm nên điều khác biệt mỗi ngày.",
  keywords: [
    "Global Care",
    "Globalcare",
    "20/10/2026",
    "Ngày Phụ Nữ Việt Nam",
    "Gửi nàng một điều tử tế",
    "Wish Wall",
    "Thiệp chúc 20/10",
  ],
  authors: [{ name: "Global Care" }],
  openGraph: {
    title: "Global Care — Gửi Nàng Một Điều Tử Tế | 20.10.2026",
    description:
      "20/10 — Gửi một lời thương, trao ngàn điều tử tế. Tạo và gửi thiệp chúc mừng đến các nữ cán bộ nhân viên Global Care.",
    url: "https://globalcare.com.vn",
    siteName: "Global Care Women's Day 2026",
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#F45B8A]/20 selection:text-[#D9365E]">
        {children}
      </body>
    </html>
  );
}
