import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { currancyFormatter } from "@/app/lib/formatters";
import AddToCartBtn from "@/components/common/AddToCartBtn";
import { CartProductsType } from "@/app/lib/definitions";

const Product = ({ product }: { product: CartProductsType }) => {
  const { id, name, description, price, image, sizes } = product;
  const defaultSize = sizes[1]?.name || sizes[0]?.name; // fallback in case sizes[1] is undefined

  return (
    <div className="w-full px-4 py-6 default-border rounded-xl group shadow-sm bg-white dark:bg-zinc-800 hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${id}`} key={id} className="space-y-3 block">
        <div className="aspect-square relative w-full">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-contain mx-auto group-hover:scale-95 transition-transform duration-300"
          />
        </div>

        <h1 className="font-semibold text-lg sm:text-xl">{name}</h1>
        <p className="truncate text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <span className="font-bold text-base sm:text-lg inline-block mt-1">
          {currancyFormatter(Number(price))}
        </span>
      </Link>

      <div className="mt-4">
        <AddToCartBtn productId={id} size={defaultSize} quantity={1} />
      </div>
    </div>
  );
};

export default Product;
