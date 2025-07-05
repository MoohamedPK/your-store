import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import DeleteButton from "../../common/DeleteButton"
import { deleteCategory } from "@/app/actions/categories/deleteCategory"

const CategoriesTable = async () => {

    const categories = await prisma.category.findMany({
        orderBy: {name: "asc"},

        select: {
            id: true,
            name: true,
            updatedAt: true,
            products: true,
        }
    })

    return (
    <main className="w-full">

            <div className="p-4 md:p-6 overflow-x-auto">
            <div className="flex justify-between items-center mb-6 mt-3">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Link href="/admin/categories/new" className="bg-zinc-800 text-white px-2 py-1 md:px-4 md:py-2 text-sm rounded hover:bg-zinc-800/85">
                    + Add Category
                </Link>
            </div>
            <table className="w-full min-w-[600px] text-left border-separate border-spacing-y-4">
                <thead>
                <tr className="text-sm text-zinc-800 border-b">
                    <th className="pb-2">Category Name</th>
                    <th className="pb-2">Product Count</th>
                    <th className="pb-2">Last Updated</th>
                    <th className="pb-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr
                    key={category.id}
                    className="border-b text-sm font-medium text-zinc-700"
                    >
                    <td>{category.name}</td>
                    <td>{category.products.length}</td>
                    <td className="text-gray-500">{category.updatedAt.toLocaleDateString()}</td>
                    <td>
                        <div className="flex items-center space-x-3">
                            <DeleteButton id={category.id} action={deleteCategory}/>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </main>
    )
}

export default CategoriesTable