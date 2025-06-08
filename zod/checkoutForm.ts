import z from "zod";

export const checkoutFormSchema = z.object({
    name: z.string().min(1, "Please Add a Valid Name"),
    email: z.string().email("Invalid Email Address"),
    city: z.string().min(2, "Please Add a Valid City"),
    address: z.string().min(5, "Please Enter a Valide Address"),
    phone: z.string().min(10, "Please Enter a Valid Phone Number"),
})