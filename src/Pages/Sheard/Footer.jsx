import React from 'react';
import { 
  Heart, 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-12 pb-6 border-t border-amber-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                <span className="font-bold text-xl">IS</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  Innovate Solution
                </h2>
                <p className="text-sm text-gray-400">Client Excellence Platform</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transforming client management with cutting-edge technology and innovative solutions for businesses worldwide.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-amber-600 rounded-lg transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-l-4 border-amber-500 pl-3">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-3"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/all-clients" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-3"></span>
                  All Clients
                </a>
              </li>
              <li>
                <a href="/add-client" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-3"></span>
                  Add New Client
                </a>
              </li>
              <li>
                <a href="/communications" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-3"></span>
                  Communications
                </a>
              </li>
              <li>
                <a href="/settings" className="text-gray-300 hover:text-amber-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-3"></span>
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-l-4 border-amber-500 pl-3">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Innovation Street<br />
                  Tech City, TC 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <a href="tel:+8801712345678" className="text-gray-300 hover:text-amber-400 transition-colors">
                  +880 1712 345 678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <a href="mailto:info@innovatesolution.com" className="text-gray-300 hover:text-amber-400 transition-colors">
                  info@innovatesolution.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-amber-400" />
                <a href="https://www.inovatesolution.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
                  innovatesolution.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-l-4 border-amber-500 pl-3">Business Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center pb-2 border-b border-gray-700">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-amber-400 font-medium">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-gray-700">
                <span className="text-gray-300">Saturday</span>
                <span className="text-amber-400 font-medium">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Sunday</span>
                <span className="text-red-400 font-medium">Closed</span>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-700/30 rounded-xl p-4 mt-4">
              <p className="text-sm text-gray-300">
                <span className="text-amber-400 font-medium">24/7 Support:</span> Emergency technical support available
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} Innovate Solution. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Designed with <Heart className="inline w-3 h-3 text-red-500" /> and <Code className="inline w-3 h-3 text-blue-500" />
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-amber-400 transition-colors">
              Cookie Policy
            </a>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            <span className="text-white font-medium">Back to Top</span>
            <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* System Status */}
        {/* <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">System Status: All Systems Operational</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Version 2.1.0 • Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;