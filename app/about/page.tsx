import Link from "next/link";
import Image from "next/image";

const OurStoryPage = () => {
    return (
        <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[100vh] min-h-[500px] flex items-center justify-center bg-black">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <Image
            src="/ourStory.jpg" // Replace with your hero image
            alt="ShopHub Story"
            fill
            className="object-cover"
            priority
            />
            <div className="relative z-20 text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
                Our Story
            </h1>
            <p className="text-xl sm:text-2xl font-light tracking-wide text-gray-200 max-w-2xl mx-auto">
                Where modern finds meet timeless taste, and every piece tells a story
            </p>
            </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 sm:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                <div className="w-16 h-0.5 bg-black mb-8"></div>
                <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-6">
                    Born from Discontent
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed tracking-wide">
                    <p>
                    In 2020, while the world was drowning in fast fashion and fleeting trends, 
                    we found ourselves asking: Where are the pieces that last? Where is the 
                    intentionality in what we wear?
                    </p>
                    <p>
                    ShopHub began as a simple idea—what if shopping felt less like consumption 
                    and more like curation? What if every piece in your wardrobe was chosen 
                    with purpose, built to last, and designed to tell your story?
                    </p>
                    <p>
                    We started with a small collection of essential pieces, each selected for 
                    its quality, versatility, and timeless appeal. Today, that curated approach 
                    remains at the heart of everything we do.
                    </p>
                </div>
                </div>
                <div className="relative h-80 lg:h-96 bg-gray-100 border border-gray-200">
                <Image
                    src="/ourBeginning.jpg" // Replace with your image
                    alt="Our beginnings"
                    fill
                    className="object-cover"
                />
                </div>
            </div>
            </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-4">
                Our Philosophy
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Three principles guide every decision we make
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                <div className="text-center p-8 bg-white border border-gray-200 rounded-none group hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-white">01</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Curated, Not Cluttered</h3>
                <p className="text-gray-600 leading-relaxed">
                    We believe in fewer, better things. Every piece in our collection is 
                    carefully selected for its quality, versatility, and timeless appeal.
                </p>
                </div>

                <div className="text-center p-8 bg-white border border-gray-200 rounded-none group hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-white">02</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Designed to Last</h3>
                <p className="text-gray-600 leading-relaxed">
                    We prioritize quality materials and craftsmanship, creating pieces that 
                    withstand trends and time, becoming favorites for years to come.
                </p>
                </div>

                <div className="text-center p-8 bg-white border border-gray-200 rounded-none group hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-white">03</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Shop with Intention</h3>
                <p className="text-gray-600 leading-relaxed">
                    We encourage mindful consumption. Each purchase should be deliberate, 
                    adding value to your life and wardrobe without clutter.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Sustainability */}
        <section className="py-16 sm:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 lg:order-1">
                <div className="relative h-80 lg:h-96 bg-gray-100 border border-gray-200">
                    <Image
                    src="/sust_material.jpg" // Replace with your image
                    alt="Sustainable practices"
                    fill
                    className="object-cover"
                    />
                </div>
                </div>
                <div className="order-1 lg:order-2">
                <div className="w-16 h-0.5 bg-black mb-8"></div>
                <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-6">
                    Our Commitment
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed tracking-wide">
                    <p>
                    We believe style shouldn&apos;t come at the expense of our planet or people. 
                    That&apos;s why we&apos;re committed to ethical manufacturing, sustainable materials, 
                    and transparent practices.
                    </p>
                    <p>
                    From our organic cotton basics to our recycled packaging, every choice 
                    reflects our dedication to a better fashion industry. We partner with 
                    factories that share our values and prioritize fair wages and safe 
                    working conditions.
                    </p>
                    <p>
                    This is just the beginning of our journey toward complete sustainability, 
                    and we&apos;re committed to continuous improvement.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Team/Founder Note */}
        <section className="py-16 sm:py-24 bg-black text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-8">
                A Note from Our Founder
            </h2>
            <blockquote className="text-xl sm:text-2xl font-light tracking-wide leading-relaxed mb-8 max-w-3xl mx-auto">
                &quot;We started ShopHub not just to sell clothes, but to champion a different way of shopping—one that values quality over quantity, intention over impulse, and stories over trends.&quot;
            </blockquote>
            <div className="mt-12">
                <p className="text-lg font-medium">Alex Morgan</p>
                <p className="text-gray-400">Founder & CEO</p>
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-6">
                Join Our Journey
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover the pieces that are changing how we think about fashion, one intentional choice at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                <button className="px-8 py-4 bg-black text-white font-medium uppercase tracking-wide rounded-none hover:bg-gray-800 transition-all duration-300 border border-black">
                    Explore Collection
                </button>
                </Link>
                <Link href="/contact">
                <button className="px-8 py-4 border border-black text-black font-medium uppercase tracking-wide rounded-none hover:bg-black hover:text-white transition-all duration-300">
                    Get in Touch
                </button>
                </Link>
            </div>
            </div>
        </section>
        </div>
    );
};

export default OurStoryPage;