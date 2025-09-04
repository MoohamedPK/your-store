import { getProductById } from "@/app/actions/admin/products/getOrderById";
import { ProductAndSizes } from "@/app/lib/definitions";
import { prisma } from "@/app/lib/prisma"
import BackButton from "@/components/adminCompo/orders/BackButton";
import UpdateProductForm from "@/components/adminCompo/product/UpdateProductForm"
import { notFound } from "next/navigation";

const page = async ({params}: {params: Promise<{id: string}>}) => {

    const productId = (await params).id
    const categories = await prisma.category.findMany({
        orderBy: {name: "asc"},
        select: {
            id: true,
            name: true,
            slug: true
        }
    });
    const product = await getProductById(productId) as ProductAndSizes

    if (!product) return notFound();

  return (
    <div>
        <div className="my-5">
            <BackButton/>
        </div>

        <UpdateProductForm categories={categories} product={product}/>
    </div>
) 
    
}

export default page