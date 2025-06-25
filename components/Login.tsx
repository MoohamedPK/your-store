"use client"
import { loginSchema } from "@/zod/loginSchema"
import {useForm, SubmitHandler} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {signIn} from "next-auth/react"
import { store } from "@/redux/store"
import { setCart } from "@/redux/cart/cartSlice"

type FormInputsType = z.infer<typeof loginSchema> 

const Login = () => {

    const router = useRouter();
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<FormInputsType>({resolver: zodResolver(loginSchema)});
    const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
        try {
            const response = await signIn("credentials", {
              redirect: false,
              email: data.email,
              password: data.password
            })
            console.log(response)
            if (!response || response.error) {
                throw new Error("Incorrect username or password")
            }

            const state = store.getState();
            const guestItems = state.cart.items;

            if (guestItems.length > 0 ) {
              const res = await fetch("/api/cart/merge", {
                method: "POST",
                headers: {
                  "Content-Type" : "application/json",
                },
                body: JSON.stringify({guestItems})
              })

              const result = await res.json();

              if (result.cart.items) {
                store.dispatch(setCart(result.cart.items))
              }
            }

            // after registration redirect user to home page
            router.push('/');
        } catch (error) {
            setError('root', {type: "manual", message: error instanceof Error ? error.message : "Registration faild"})
        }
    };

  return (
    <div className="w-1/3 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Server Error Message */}
        {errors.root && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">
            {errors.root.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`button-hover cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Login in..." : "Sign in"}
        </button>

        <div className="text-center text-sm text-gray-600">
          do not have an account ?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login