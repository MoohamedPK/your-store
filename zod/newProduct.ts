import {z} from "zod";

export const NewProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  price: z.number().min(1, "Price must be at least 1"),
  sizes: z.array(z.enum(["SMALL", "MEDIUM", "LARGE"])).min(1, "Select at least one size"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().optional().default(""),
  sortOrder: z.number().optional().default(0),
  stock: z.number().optional().default(0)
});