import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { currancyFormatter } from "@/app/lib/formatters";
import AddToCartBtn from "@/components/common/AddToCartBtn";
import { CartProductsType } from "@/app/lib/definitions";

const Product = ({ product }: { product: CartProductsType }) => {
  const { id, name, description, price, image, sizes } = product;
  const defaultSize = sizes[1]?.name || sizes[0]?.name;

  return (
    <div className="w-full p-3 sm:p-4 border rounded-xl group shadow-sm bg-white dark:bg-zinc-800 hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${id}`} className="space-y-2 block">
        {/* Image container */}
        <div className="aspect-square relative w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain mx-auto group-hover:scale-95 transition-transform duration-300"
          />
        </div>

        {/* Product name */}
        <h1 className="font-semibold text-base sm:text-lg">{name}</h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <span className="font-bold text-sm sm:text-base inline-block mt-1">
          {currancyFormatter(Number(price))}
        </span>
      </Link>

      {/* Add to cart */}
      <div className="mt-3 sm:mt-4">
        <AddToCartBtn productId={id} size={defaultSize} quantity={1} />
      </div>
    </div>
  );
};

export default Product;
