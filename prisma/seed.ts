import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const timeSlots = [
    { name: "1限" },
    { name: "2限" },
    { name: "昼休" },
    { name: "3限" },
    { name: "4限" },
    { name: "5限" },
    { name: "6限" },
    { name: "夜間1" },
    { name: "夜間2/3" },
  ];

  const alice = await prisma.timeSlot.createMany({
    data: timeSlots,
  });
  console.log({ alice });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
