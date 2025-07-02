import React from 'react';
import { Heart, Github, Twitter, Linkedin, Sparkles, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "#", color: "hover:text-gray-300" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-500" }
  ];

  const categories = ['Business', 'Technology', 'Sports', 'Health', 'Science', 'Entertainment'];
  const aboutLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ];

  const handleLinkClick = (path) => {
    // For now, just scroll to top or handle navigation as needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10 mt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
              y: Math.random() * 400,
              scale: 0 
            }}
            animate={{ 
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-white m-0.5" />
                </motion.div>
              </motion.div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  NewsKnow
                </span>
                <div className="text-xs text-gray-400 font-medium">Premium News Platform</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Experience the future of news with our cutting-edge platform. Real-time updates, global coverage, and premium quality journalism delivered with stunning design.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className={`p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/20`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Categories</span>
            </h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <motion.li 
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button 
                    onClick={() => handleLinkClick(`/${category.toLowerCase()}`)}
                    className="text-gray-400 hover:text-white transition-all duration-200 flex items-center space-x-2 group text-left"
                  >
                    <motion.div
                      className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-200"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{category}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>About</span>
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button 
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-400 hover:text-white transition-all duration-200 flex items-center space-x-2 group text-left"
                  >
                    <motion.div
                      className="w-1 h-1 bg-pink-500 rounded-full group-hover:w-2 transition-all duration-200"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 NewsKnow. All rights reserved. Powered by cutting-edge technology.
          </p>
          <motion.p 
            className="text-gray-400 text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            Made with <Heart className="w-4 h-4 text-red-500 mx-2 animate-pulse" /> for news enthusiasts worldwide
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;