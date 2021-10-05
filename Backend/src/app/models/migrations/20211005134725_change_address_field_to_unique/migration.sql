/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Rental` will be added. If there are existing duplicate values, this will fail.
  - Made the column `address` on table `Rental` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "address" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rental_address_key" ON "Rental"("address");
