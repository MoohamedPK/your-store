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
    <div className="w-full p-4 sm:p-5 border border-gray-200 rounded-none group bg-white hover:bg-gray-50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
  <Link href={`/products/${id}`} className="space-y-3 sm:space-y-4 block">
    {/* Image container with enhanced styling */}
    <div className="aspect-square relative w-full bg-gray-50 group-hover:bg-white transition-colors duration-300 overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
    </div>

    {/* Content container */}
    <div className="space-y-2 sm:space-y-3">
      {/* Product name with elegant typography */}
      <h1 className="font-medium text-sm sm:text-base text-gray-900 leading-tight tracking-tight line-clamp-2 group-hover:text-black transition-colors">
        {name}
      </h1>

      {/* Description with refined styling */}
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Price with prominent styling */}
      <div className="flex items-center justify-between pt-2">
        <span className="font-bold text-base sm:text-lg text-black">
          {currancyFormatter(Number(price))}
        </span>
        
        {/* Subtle indicator */}
        <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-black transition-colors duration-300"></div>
      </div>
    </div>
  </Link>

  {/* Add to cart button section */}
  <div className="mt-4 sm:mt-5 pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
    <AddToCartBtn productId={id} size={defaultSize} quantity={1} />
  </div>
</div>
  );
};

export default Product;
