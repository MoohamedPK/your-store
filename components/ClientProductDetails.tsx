"use client";

import Image from "next/image";
import AddToCartBtn from "@/components/common/AddToCartBtn";
import { currancyFormatter } from "@/app/lib/formatters";
import { Product, Size, ProductSizes } from "@prisma/client";
import { useState } from "react";

type Props = {
  product: Product & { sizes: Size[] };
};

const ClientProductDetails = ({ product }: Props) => {
  // Default to first available size or fallback to a safe value
  const [selectedSize, setSelectedSize] = useState<ProductSizes>(
    product.sizes?.[0]?.name || "M"
  );

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value as ProductSizes);
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
        {/* Image Section */}
        <div className="left">
          <Image
            src={product?.image || "/placeholder.png"}
            alt={product?.name || "product image"}
            width={500}
            height={500}
            className="object-contain rounded-md"
            priority
          />
        </div>

        {/* Details Section */}
        <div className="right space-y-8">
          <h1 className="text-4xl md:text-5xl font-semibold">{product?.name}</h1>
          <p className="leading-relaxed font-medium text-gray-700">{product?.description}</p>

          <div className="flex justify-between items-center space-x-4">
            <span className="border border-black px-6 py-2 font-bold text-lg text-black rounded-md">
              {currancyFormatter(Number(product.price))}
            </span>

            <AddToCartBtn productId={product.id} quantity={1} size={selectedSize} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-5">
            <label htmlFor="size-select" className="text-gray-600 text-sm font-medium">
              Choose size
            </label>
            <select
              id="size-select"
              name="size"
              onChange={handleSize}
              value={selectedSize}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {product?.sizes.map((size: Size) => (
                <option value={size.name} key={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientProductDetails;
