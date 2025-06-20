import z from "zod";

export const sizeSchema = z.object({
    name: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    price: z.coerce.number().min(0, "Price must be at least 0"),
});

export const productSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0),
    sortOrder: z.coerce.number().min(0),
    image: z.string().url("Image must be a valid URL"),
    stock: z.coerce.number().min(0),
    categoryId: z.string().min(1),
    sizes: z.array(sizeSchema).nonempty("Select at least one size"),
});

export type ProductFormValues = z.infer<typeof productSchema>
export type SizeFormValues = z.infer<typeof sizeSchema>