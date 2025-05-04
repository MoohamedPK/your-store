/*
  Warnings:

  - You are about to drop the `Sizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sizes" DROP CONSTRAINT "Sizes_sizeId_fkey";

-- DropTable
DROP TABLE "Sizes";

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" "ProductSizes" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
