import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">
                CyberOptics
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              The future of eyewear is here. Experience personalized frames with AI-powered recommendations and AR try-on technology.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:shadow-neon-glow transition-all duration-300">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:shadow-neon-glow transition-all duration-300">
                <span className="text-xs font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:shadow-neon-glow transition-all duration-300">
                <span className="text-xs font-bold">i</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Shop Frames
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Frame Finder Quiz
                </Link>
              </li>
              <li>
                <Link href="/try-on" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  AR Try-On
                </Link>
              </li>
              <li>
                <Link href="/prescription" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Prescription Upload
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-gray-300 text-sm">hello@cyberoptics.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-gray-300 text-sm">1-800-CYBER-OPT</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-gray-300 text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 CyberOptics. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
