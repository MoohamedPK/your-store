"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewProduct } from "@/app/actions/admin/products/createProduct";
import { ProductSizes } from "@prisma/client";
import { NewProductSchema } from "@/zod/newProduct";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

type NewProductFormData = z.infer<typeof NewProductSchema>;

const NewProductForm = ({ categories }: {categories: {id: string, name: string, slug: string}[]}) => {

    const [loading, setLoading] = useState<boolean>();
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
        sizes: [] as ProductSizes[],
        sortOrder: 0
        }
    });

    const selectedSizes = watch("sizes");
    const sizes = ["SMALL", "MEDIUM", "LARGE"] as ProductSizes[];

    const toggleSize = (size: typeof sizes[number]) => {
        const newSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];
        setValue("sizes", newSizes);
    };

    const onSubmit = async (data: NewProductFormData) => {
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("stock", data.stock.toString());
        formData.append("categoryId", data.categoryId);
        formData.append("image", data.image);
        formData.append("sortOrder", data.sortOrder.toString());
        data.sizes.forEach((size) => formData.append("sizes", size));

        
        
        try {
            setLoading(true)
            const result = await createNewProduct(formData);
            if (result?.success) {
                reset();
                toast.success("Product Created Successfully");
                redirect("/admin/products")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="mx-auto p-4 sm:p-6 bg-neutral-400/60 rounded-lg shadow-md w-full">
        <div className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            <h1>Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-10">
            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</label>
                <input
                {...register("name")}
                id="name"
                className={`px-4 py-2 border rounded-lg w-full ${
                    errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Luxury Gold Pendant"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">Price (MAD)</label>
                <input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
                step="0.01"
                min="0"
                className={`px-4 py-2 border rounded-lg w-full ${
                    errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            </div>

            <div className="flex flex-col space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <textarea
                {...register("description")}
                id="description"
                rows={4}
                className={`px-4 py-2 border rounded-lg ${
                errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Detailed product description..."
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Sizes */}
            <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Available Sizes</label>
            <div className="flex flex-wrap gap-3">
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
            {errors.sizes && <p className="text-red-500 text-sm">{errors.sizes.message}</p>}
            </div>

            {/* Stock & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
                <label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                {...register("stock", { valueAsNumber: true })}
                id="stock"
                type="number"
                min="0"
                className={`px-4 py-2 border rounded-lg ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                }`}
                />
                {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">sort order</label>
                <input
                {...register("sortOrder", { valueAsNumber: true })}
                id="sortOrder"
                type="number"
                min="0"
                className={`px-4 py-2 border rounded-lg ${
                    errors.sortOrder ? "border-red-500" : "border-gray-300"
                }`}
                />
                {errors.sortOrder && <p className="text-red-500 text-sm">{errors.sortOrder.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
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

            {/* Image Upload */}
            <div>
            <ImageUploader onUploadSuccess={(url) => setValue("image", url)} />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
                {loading ? <Spinner/> : "Add Product"}
            </button>
            </div>
        </form>
        </div>
    );
};

export default NewProductForm;
