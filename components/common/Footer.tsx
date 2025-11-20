import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, User, Truck, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
  {/* Main Footer Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      
      {/* Company Information */}
      <div className="space-y-6">
        <h3 className="text-2xl font-light tracking-tight text-white">ShopHub</h3>
        <p className="text-gray-400 text-sm leading-relaxed tracking-wide">
          Your one-stop destination for quality products. We bring you the best selection 
          with exceptional service and competitive prices.
        </p>
        <div className="flex space-x-5">
          <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 p-2 border border-gray-600 hover:border-white">
            <Facebook size={18} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 p-2 border border-gray-600 hover:border-white">
            <Twitter size={18} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 p-2 border border-gray-600 hover:border-white">
            <Instagram size={18} />
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-6">
        <h4 className="text-sm font-medium text-white uppercase tracking-wider">Quick Links</h4>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Products
            </Link>
          </li>
          <li>
            <Link href="/cart" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/checkout" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Checkout
            </Link>
          </li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="space-y-6">
        <h4 className="text-sm font-medium text-white uppercase tracking-wider">Customer Service</h4>
        <ul className="space-y-4">
          <li>
            <Link href="/profile" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              My Account
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Size Guide
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Shipping Info
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide border-b border-transparent hover:border-white pb-1">
              Returns
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h4 className="text-sm font-medium text-white uppercase tracking-wider">Contact Us</h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-400 text-sm tracking-wide leading-relaxed">123 Commerce St, City, State 12345</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-400 text-sm tracking-wide">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-400 text-sm tracking-wide">support@shophub.com</span>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="border-t border-gray-800 mt-16 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 border border-gray-700">
            <Truck size={20} className="text-white" />
          </div>
          <div>
            <h5 className="font-medium text-sm text-white uppercase tracking-wide">Free Shipping</h5>
            <p className="text-gray-400 text-xs tracking-wide mt-1">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="p-3 border border-gray-700">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h5 className="font-medium text-sm text-white uppercase tracking-wide">Secure Payment</h5>
            <p className="text-gray-400 text-xs tracking-wide mt-1">100% secure checkout</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="p-3 border border-gray-700">
            <User size={20} className="text-white" />
          </div>
          <div>
            <h5 className="font-medium text-sm text-white uppercase tracking-wide">24/7 Support</h5>
            <p className="text-gray-400 text-xs tracking-wide mt-1">Always here to help</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Footer */}
  <div className="border-t border-gray-800 bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-gray-400 text-sm tracking-wide">
          © 2024 ShopHub. All rights reserved.
        </div>
        <div className="flex space-x-8 text-sm">
          <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 tracking-wide border-b border-transparent hover:border-white pb-1">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 tracking-wide border-b border-transparent hover:border-white pb-1">
            Terms of Service
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 tracking-wide border-b border-transparent hover:border-white pb-1">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;