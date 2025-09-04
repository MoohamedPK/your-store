/*
  Warnings:

  - A unique constraint covering the columns `[name,productId]` on the table `Size` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Size_name_key";

-- DropIndex
DROP INDEX "Size_price_key";

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_productId_key" ON "Size"("name", "productId");
