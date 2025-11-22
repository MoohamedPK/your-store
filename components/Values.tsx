import { Award, Leaf, Truck } from "lucide-react"
import HeadingTitle from "./animatedComponent/HeadingTitle"

const Values = () => {
return (
    <section className="w-full bg-white py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadingTitle title="Why Us ?"/>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pt-20">
    <div className="text-center">
        <div className="w-16 h-16 bg-black rounded-none flex items-center justify-center mx-auto mb-4">
        <Leaf size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-medium mb-3">Ethically Sourced</h3>
        <p className="text-gray-600">Sustainable materials and fair labor practices</p>
    </div>
    <div className="text-center">
        <div className="w-16 h-16 bg-black rounded-none flex items-center justify-center mx-auto mb-4">
        <Award size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-medium mb-3">Quality Crafted</h3>
        <p className="text-gray-600">Built to last with attention to detail</p>
    </div>
    <div className="text-center">
        <div className="w-16 h-16 bg-black rounded-none flex items-center justify-center mx-auto mb-4">
        <Truck size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-medium mb-3">Free Shipping</h3>
        <p className="text-gray-600">On all orders over $50</p>
    </div>
    </div>
    </div>
    </section>
)
}

export default Values