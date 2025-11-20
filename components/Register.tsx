"use client"

import { registerSchema } from "@/zod/registerSchema"
import {useForm, SubmitHandler} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

type FormInputsType = z.infer<typeof registerSchema> 

const Register = () => {

    const router = useRouter();
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<FormInputsType>({resolver: zodResolver(registerSchema)});
    const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
        try {
            const response = await fetch('/api/register', {
                method:"POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed")
            }

            const result = await signIn("credentials", {
              email: data.email,
              password: data.password,
              redirect: false
            })

            if (result && result.error) throw new Error(result.error);

            //after registration redirect user to home page
            router.push('/profile');
        } catch (error) {
            setError('root', {type: "manual", message: error instanceof Error ? error.message : "Registration faild"})
        }
    };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 flex items-center justify-center py-12">
  <div className="w-full max-w-md">
    <div className="p-8 bg-white border border-gray-200 rounded-none shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-2">Create Account</h1>
        <p className="text-gray-600 text-sm tracking-wide">Join us to start shopping</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 uppercase tracking-wide">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 border border-gray-300 rounded-none bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-sm text-red-600 font-medium mt-1">{errors.name.message}</p>
          )}
        </div>

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
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 font-medium mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 uppercase tracking-wide">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full px-4 py-3 border border-gray-300 rounded-none bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 font-medium mt-1">{errors.confirmPassword.message}</p>
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
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm tracking-wide">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="font-medium text-black hover:text-gray-700 underline transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Register