/*
  Warnings:

  - Changed the type of `name` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `productId` on table `Size` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_productId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "productId" SET NOT NULL;

-- DropEnum
DROP TYPE "Categories";

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
