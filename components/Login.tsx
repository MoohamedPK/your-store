"use client"

import { loginSchema } from "@/zod/loginSchema"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { store } from "@/redux/store"
import { setCart } from "@/redux/cart/cartSlice"

type FormInputsType = z.infer<typeof loginSchema>

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormInputsType>({ resolver: zodResolver(loginSchema) })

  const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if (!response || response.error) {
        throw new Error("Incorrect username or password")
      }

      const state = store.getState()
      const guestItems = state.cart.items

      if (guestItems.length > 0) {
        const res = await fetch("/api/cart/merge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ guestItems })
        })

        const result = await res.json()

        if (result.cart.items) {
          store.dispatch(setCart(result.cart.items))
        }
      }

      router.push("/")
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "Login failed"
      })
    }
  }

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 flex items-center justify-center py-12">
  <div className="w-full max-w-md">
    <div className="p-8 bg-white border border-gray-200 rounded-none shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm tracking-wide">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 uppercase tracking-wide">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-300 rounded-none bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-600 font-medium mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-900 uppercase tracking-wide">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-4 py-3 border border-gray-300 rounded-none bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 font-medium mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Server Error Message */}
        {errors.root && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-none text-sm font-medium">
            {errors.root.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 bg-black text-white font-medium uppercase tracking-wide rounded-none hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 border border-black ${
            isSubmitting ? "opacity-50 cursor-not-allowed hover:bg-black" : ""
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Register Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm tracking-wide">
            Don&#39;t have an account?{" "}
            <Link 
              href="/register" 
              className="font-medium text-black hover:text-gray-700 underline transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login
