import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCount = await prisma.greetingCard.count();
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} cards, skipping seed.`);
    return;
  }

  const sampleCards = [
    {
      publicId: "bloom-tech-2010",
      message:
        "Chúc toàn thể các chị em phụ nữ Global Care một ngày 20/10 ngập tràn niềm vui, hoa và những nụ cười tươi tắn nhất. Cảm ơn mọi người vì sự kiên nhẫn, sắc sảo và luôn đồng hành biến những dòng code phức tạp thành những giá trị bảo hiểm nhân văn!",
      senderName: "Anh em Khối Công nghệ (Tech Team)",
      senderDepartment: "Technology & Engineering",
      cardTheme: "bloom",
      status: "published",
    },
    {
      publicId: "joy-product-2010",
      message:
        "20/10 chúc phái đẹp Global Care nhan sắc ngày càng thăng hạng, công việc hanh thông, KPI chạy phà phà và lúc nào cũng ngập tràn trà sữa cùng những điều ngọt ngào!",
      senderName: "Product & Design Team",
      senderDepartment: "Product Development",
      cardTheme: "joy",
      status: "published",
    },
    {
      publicId: "minimal-bod-2010",
      message:
        "Mỗi người phụ nữ tại Global Care đều là một bông hoa độc bản với bản lĩnh và tài năng phi thường. Cảm ơn sự cống hiến bền bỉ của các bạn đã và đang tạo nên sự khác biệt to lớn cho hành trình của chúng ta.",
      senderName: "Ban Lãnh Đạo",
      senderDepartment: "Board of Directors",
      cardTheme: "minimal",
      status: "published",
    },
    {
      publicId: "celebrate-business-2010",
      message:
        "Nhân ngày 20/10, xin gửi ngàn lời chúc tử tế và lời tri ân sâu sắc nhất tới tất cả các chị em. Chúc các bạn luôn tự tin, hạnh phúc, tỏa sáng rực rỡ và luôn được yêu thương trọn vẹn mỗi ngày!",
      senderName: "Khối Kinh Doanh & Đối Tác",
      senderDepartment: "Business Development",
      cardTheme: "celebration",
      status: "published",
    },
    {
      publicId: "bloom-cs-2010",
      message:
        "Cảm ơn các chị em luôn là trái tim ấm áp, mang lại sự tận tâm và lắng nghe chân thành nhất đến với khách hàng cũng như mọi đồng nghiệp. Chúc mọi người một ngày 20/10 thật nhiều hoa và quà!",
      senderName: "Khối Vận Hành & CSKH",
      senderDepartment: "Operations & Customer Care",
      cardTheme: "bloom",
      status: "published",
    },
    {
      publicId: "joy-hr-2010",
      message:
        "Chúc các bóng hồng Global Care luôn xinh đẹp rạng ngời, việc gì cũng dễ dàng vượt qua và mỗi ngày đến văn phòng đều là một ngày ngập tràn tiếng cười!",
      senderName: "Đồng nghiệp Global Care",
      senderDepartment: "Finance & Admin",
      cardTheme: "joy",
      status: "published",
    },
  ];

  for (const card of sampleCards) {
    await prisma.greetingCard.create({
      data: card,
    });
  }

  console.log(`Successfully seeded ${sampleCards.length} initial celebration cards.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
