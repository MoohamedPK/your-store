
const Testimonials = () => {
    return (
        <section className="w-full bg-white py-16 sm:py-24 lg:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Loved by Customers
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto tracking-wide">
            Discover why thousands of customers choose ShopHub for their everyday style
        </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Testimonial 1 */}
        <div className="bg-white border border-gray-200 p-6 lg:p-8 rounded-none group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center mr-4">
                <span className="text-lg font-medium text-gray-900">SR</span>
            </div>
            <div>
                <h4 className="font-medium text-gray-900 text-lg">Sarah M.</h4>
                <p className="text-gray-500 text-sm">Verified Customer</p>
            </div>
            </div>
            <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            ))}
            </div>
            <p className="text-gray-700 leading-relaxed tracking-wide">
            &quot;The quality is exceptional. I&apos;ve been wearing the same sweater for months and it still looks brand new. Exactly what I was looking for - timeless pieces that last.&quot;
            </p>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white border border-gray-200 p-6 lg:p-8 rounded-none group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center mr-4">
                <span className="text-lg font-medium text-gray-900">JK</span>
            </div>
            <div>
                <h4 className="font-medium text-gray-900 text-lg">James K.</h4>
                <p className="text-gray-500 text-sm">Frequent Shopper</p>
            </div>
            </div>
            <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            ))}
            </div>
            <p className="text-gray-700 leading-relaxed tracking-wide">
            &quot;Finally, a brand that gets it. The curation is spot-on - every piece works together. I&apos;ve completely transformed my wardrobe with intentional, quality purchases.&quot;
            </p>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white border border-gray-200 p-6 lg:p-8 rounded-none group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-none flex items-center justify-center mr-4">
                <span className="text-lg font-medium text-gray-900">EP</span>
            </div>
            <div>
                <h4 className="font-medium text-gray-900 text-lg">Emma P.</h4>
                <p className="text-gray-500 text-sm">Style Enthusiast</p>
            </div>
            </div>
            <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            ))}
            </div>
            <p className="text-gray-700 leading-relaxed tracking-wide">
            &quot;The shop with intention philosophy really resonates. I&apos;m buying less but loving everything I own. The pieces are versatile and always get compliments.&quot;
            </p>
        </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Happy Customers</div>
            </div>
            <div>
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Average Rating</div>
            </div>
            <div>
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">98%</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Recommend Us</div>
            </div>
            <div>
            <div className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Cities Served</div>
            </div>
        </div>
        </div>
    </div>
    </section>

    )
}

export default Testimonials