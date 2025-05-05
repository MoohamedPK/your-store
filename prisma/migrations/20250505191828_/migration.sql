/*
  Warnings:

  - You are about to drop the column `sizeId` on the `Size` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('accessories', 'digital');

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_sizeId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" INTEGER;

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "sizeId",
ADD COLUMN     "productId" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" "Categories"[],

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
