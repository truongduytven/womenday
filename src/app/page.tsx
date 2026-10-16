"use client";

import React, { useState } from "react";
import CampaignHeader from "@/components/CampaignHeader";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import WishWall from "@/components/WishWall";
import GreetingComposer from "@/components/GreetingComposer";
import CampaignFooter from "@/components/CampaignFooter";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCardPublished = () => {
    // Increment trigger to refresh Wish Wall
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF3F6] selection:bg-[#F45B8A]/20 selection:text-[#D9365E]">
      {/* SECTION A: Header */}
      <CampaignHeader />

      <main className="flex-1">
        {/* SECTION B: Hero with 3-Letter Carousel */}
        <HeroSection />

        {/* SECTION: Dedicated Cinematic Video Showcase */}
        <VideoSection />

        {/* SECTION C: Public Wish Wall (Thay thế section Vinh Danh Phái Đẹp) */}
        <WishWall refreshTrigger={refreshTrigger} />

        {/* SECTION D: Greeting Card Creator */}
        <GreetingComposer onCardPublished={handleCardPublished} />
      </main>

      {/* SECTION E: Closing & Footer */}
      <CampaignFooter />
    </div>
  );
}
