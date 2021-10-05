-- CreateTable
CREATE TABLE "Rental" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "propertyType" TEXT,
    "bedRoom" TEXT,
    "furnitureType" TEXT,
    "price" INTEGER,
    "note" TEXT,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);
