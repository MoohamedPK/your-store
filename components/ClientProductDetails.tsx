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
    <main className="min-h-screen bg-white py-12">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start px-4 sm:px-6">
    {/* Image Section - Enhanced */}
    <div className="left">
      <div className="bg-gray-50 p-8 rounded-none border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <Image
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "product image"}
          width={600}
          height={600}
          className="object-contain w-full h-auto aspect-square"
          priority
        />
      </div>
    </div>

    {/* Details Section - Refined */}
    <div className="right space-y-8 lg:space-y-10">
      {/* Product Title */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 leading-tight">
          {product?.name}
        </h1>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-gray-700 font-normal tracking-wide">
          {product?.description}
        </p>
      </div>

      {/* Price and Add to Cart - Enhanced Layout */}
      <div className="space-y-6">
        {/* Price Display */}
        <div className="flex items-center justify-between py-4 border-y border-gray-200">
          <span className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            {currancyFormatter(Number(product.price))}
          </span>
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </div>

        {/* Size Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="size-select" className="text-sm font-medium text-gray-900 uppercase tracking-wide">
              Select Size
            </label>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
          <select
            id="size-select"
            name="size"
            onChange={handleSize}
            value={selectedSize}
            className="w-full border border-gray-300 bg-white rounded-none px-4 py-3 text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 appearance-none cursor-pointer"
          >
            {product?.sizes.map((size: Size) => (
              <option value={size.name} key={size.id} className="py-2">
                {size.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-4">
          <AddToCartBtn productId={product.id} quantity={1} size={selectedSize} />
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>✓</span>
          <span>Free shipping on orders over $50</span>
        </div>
      </div>
    </div>
  </div>
</main>
  );
};

export default ClientProductDetails;
