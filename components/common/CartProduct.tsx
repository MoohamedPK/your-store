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
    <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6">
      {/* Left Side: Image and Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1 capitalize">
        <div className="relative w-40 h-40 flex-shrink-0">
          <Image src={image} alt={name} fill className="object-contain rounded-lg" />
        </div>

        <div className="space-y-4 w-full sm:w-auto">
          <h1 className="font-semibold text-lg sm:text-xl">{name}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label htmlFor={`size-select-${productId}`} className="font-medium mb-1 sm:mb-0">
              Choose size:
            </label>
            <select
              id={`size-select-${productId}`}
              name="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as ProductSizes)}
              className="border rounded-md px-3 py-1 text-sm w-full sm:w-auto"
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
      <div className="flex flex-col justify-between items-center space-y-6 min-w-[160px]">
        <DeleteProduct currentQuantity={quantity} size={selectedSize} productId={productId} />

        <div className="space-y-4 w-full">
          <div className="quantity text-center">
            <span className="text-sm text-neutral-600 block mb-1">Quantity</span>
            <QuantityController quantity={quantity} size={selectedSize} productId={productId} />
          </div>

          <div className="price font-semibold py-1 px-3 border border-black text-center">
            <span>MAD {Number(price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CartProduct.displayName = "CartProduct";

export default CartProduct;
