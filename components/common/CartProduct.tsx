'use client';

import { NormalizedCartItem } from "@/app/lib/definitions";
import Image from "next/image";
import QuantityController from "./QuantityController";
import DeleteProduct from "./DeleteProduct";
import { useState } from "react";
import { ProductSizes } from "@prisma/client";

const CartProduct = ({ item }: { item: NormalizedCartItem }) => {
  const { productId, name, image, price, sizes, quantity, size } = item;
  const [selectedSize, setSelectedSize] = useState(size);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 border-b border-gray-200 pb-8">
  {/* Left Side: Image and Info */}
  <div className="flex flex-col sm:flex-row items-start gap-6 flex-1">
    {/* Image Container */}
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-gray-50 p-4 border border-gray-200">
      <Image 
        src={image} 
        alt={name} 
        fill 
        className="object-contain" 
      />
    </div>

    {/* Product Details */}
    <div className="space-y-4 flex-1 min-w-0">
      <h1 className="font-medium text-xl text-gray-900 tracking-tight leading-tight">
        {name}
      </h1>

      {/* Size Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label 
          htmlFor={`size-select-${productId}`} 
          className="text-sm font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap"
        >
          Size:
        </label>
        <select
          id={`size-select-${productId}`}
          name="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value as ProductSizes)}
          className="border border-gray-300 rounded-none px-4 py-2 text-gray-900 bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 text-sm min-w-[120px]"
        >
          {sizes?.map((s) => (
            <option value={s.name} key={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>

  {/* Right Side: Actions and Price */}
  <div className="flex flex-col justify-between items-end space-y-6 min-w-[140px]">
    {/* Delete Button */}
    <DeleteProduct currentQuantity={quantity} size={selectedSize} productId={productId} />

    {/* Quantity and Price */}
    <div className="space-y-4 w-full">
      {/* Quantity Controller */}
      <div className="text-center space-y-2">
        <span className="text-xs text-gray-600 uppercase tracking-wide font-medium">Quantity</span>
        <QuantityController quantity={quantity} size={selectedSize} productId={productId} />
      </div>

      {/* Price */}
      <div className="border border-gray-900 bg-white py-2 px-4 text-center">
        <span className="font-bold text-lg text-black">MAD {Number(price)}</span>
      </div>
    </div>
  </div>
</div>
  );
};

CartProduct.displayName = "CartProduct";

export default CartProduct;
