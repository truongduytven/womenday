"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Menu, X, Heart } from "lucide-react";

export default function CampaignHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-[#F8D7E0]/60 py-3"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Campaign Tag */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-28 sm:w-32 relative">
              <Image
                src="/globalcare-logo.webp"
                alt="Global Care"
                fill
                priority
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>
          <div className="h-4 w-px bg-[#F45B8A]/30 hidden sm:block" />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF0F4] border border-[#F45B8A]/30 text-[#D9365E] text-xs font-semibold tracking-wide">
            <Heart className="w-3 h-3 fill-[#D9365E]" />
            20.10.2026
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4D3A44]">
          <a
            href="#wishwall"
            className="hover:text-[#D9365E] transition-colors"
          >
            Wish Wall
          </a>
          <a
            href="#composer"
            className="hover:text-[#D9365E] transition-colors"
          >
            Tạo Thiệp Chúc
          </a>
          <a
            href="https://globalcare.com.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#826975] hover:text-[#1A437E] transition-colors"
          >
            Global Care ↗
          </a>
        </nav>

        {/* Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#composer"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#F45B8A] to-[#D9365E] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#D9365E]/20 hover:shadow-lg hover:shadow-[#D9365E]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gửi lời chúc</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4D3A44] hover:text-[#D9365E] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-[#F8D7E0] px-6 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <a
            href="#wishwall"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D3A44] hover:text-[#D9365E]"
          >
            Wish Wall
          </a>
          <a
            href="#composer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D3A44] hover:text-[#D9365E]"
          >
            Tạo Thiệp Chúc
          </a>
          <a
            href="https://globalcare.com.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-xs text-[#826975] hover:text-[#1A437E]"
          >
            Trang chủ Global Care ↗
          </a>
        </div>
      )}
    </header>
  );
}
