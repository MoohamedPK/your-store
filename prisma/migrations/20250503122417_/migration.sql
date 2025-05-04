-- CreateEnum
CREATE TYPE "ProductSizes" AS ENUM ('SAMLL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sizes" (
    "id" SERIAL NOT NULL,
    "name" "ProductSizes" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "Sizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
