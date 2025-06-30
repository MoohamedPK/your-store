"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewProduct } from "@/app/actions/admin/newProduct/createProduct";
import { Category, ProductSizes } from "@prisma/client";
import { NewProductSchema } from "@/zod/newProduct";
import { redirect } from "next/navigation";
import { toast } from "sonner";


    type NewProductFormData = z.infer<typeof NewProductSchema>;

    const NewProductForm = ({categories}: {categories: Category[]}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm<NewProductFormData>({
        resolver: zodResolver(NewProductSchema),
        defaultValues: {
        name: "",
        description: "",
        sizes: [] as ProductSizes[],
        stock: 0,
        price: 0,
        sortOrder: 0,
        image: "",
        categoryId: ""
        }
    });

    const selectedSizes = watch("sizes");
    
    const sizes = ["SMALL", "MEDIUM", "LARGE"] as const;

    const toggleSize = (size: typeof sizes[number]) => {
        const newSizes = selectedSizes.includes(size)
        ? selectedSizes.filter(s => s !== size)
        : [...selectedSizes, size];
        setValue("sizes", newSizes);
    };

    const onSubmit = async (data: NewProductFormData) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price.toString());
            formData.append("stock", data.stock.toString());
            formData.append("categoryId", data.categoryId);
            formData.append("image", data.image);
            formData.append("sortOrder", data.sortOrder.toString());
            data.sizes.forEach(size => formData.append("sizes", size));
        
            const result = await createNewProduct(formData);
            
            if (result?.success === false) {
              alert(result.message || "Failed to create product");
            }

            reset()
            toast.success("Product Created Succssfully")
            redirect("/admin/products")
          } catch (error) {
            console.error("Error submitting form:", error);
            alert("An unexpected error occurred");
          }
        };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-bold mb-8 text-gray-800">
            <h1>Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Details Section */}
            <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Product Name
                </label>
                <input
                {...register("name")}
                id="name"
                className={`px-4 py-2 border rounded-lg  ${
                    errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Luxury Gold Pendant"
                />
                {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
                </label>
                <textarea
                {...register("description")}
                id="description"
                rows={4}
                className={`px-4 py-2 border rounded-lg ${
                    errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Detailed product description..."
                />
                {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price (MAD)
                </label>
                <input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
                step="0.01"
                min="0"
                className={`px-4 py-2 border rounded-lg  ${
                    errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
                />
                {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
            </div>
            </div>

            {/* Inventory Section */}
            <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Available Sizes</label>
                <div className="flex space-x-3">
                {sizes.map((size) => (
                    <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedSizes.includes(size)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                    }`}
                    >
                    {size}
                    </button>
                ))}
                </div>
                {errors.sizes && (
                <p className="text-red-500 text-sm">{errors.sizes.message}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="stock" className="text-sm font-medium text-gray-700">
                Stock Quantity
                </label>
                <input
                {...register("stock", { valueAsNumber: true })}
                id="stock"
                type="number"
                min="0"
                className={`px-4 py-2 border rounded-lg ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                }`}
                />
                {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
                </label>
                <select
                {...register("categoryId")}
                id="category"
                className={`px-4 py-2 border rounded-lg ${
                    errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
                >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option className="capitalize" key={category.id} value={category.id}>
                    {category.name}
                    </option>
                ))}
                </select>
                {errors.categoryId && (
                <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
                )}
            </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
                Add Product
            </button>
            </div>
        </form>
        </div>
    );
};

export default NewProductForm;