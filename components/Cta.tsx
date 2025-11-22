import Link from 'next/link'
import React from 'react'

const Cta = () => {
  return (
    <section className="w-full bg-black py-20 sm:py-28">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
      Ready to Shop with Intention?
    </h2>
    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Join thousands of customers who&apos;ve found their perfect style with ShopHub
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/products">
        <button className="px-8 py-4 bg-white text-black font-medium uppercase tracking-wide rounded-none hover:bg-gray-100 transition-all duration-300 border border-white cursor-pointer button-hover">
          Shop Collection
        </button>
      </Link>
      <Link href="/about">
        <button className="px-8 py-4 border border-white text-white font-medium uppercase tracking-wide rounded-none hover:bg-white hover:text-black transition-all duration-300 cursor-pointer button-hover">
          Our Story
        </button>
      </Link>
    </div>
  </div>
</section>
  )
}

export default Cta