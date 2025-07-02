import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setCountry, country }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const location = useLocation();

  const categories = [
    { name: 'Home', path: '/', icon: '🏠', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Business', path: '/business', icon: '💼', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Entertainment', path: '/entertainment', icon: '🎬', gradient: 'from-pink-500 to-rose-500' },
    { name: 'Health', path: '/health', icon: '🏥', gradient: 'from-red-500 to-pink-500' },
    { name: 'Science', path: '/science', icon: '🔬', gradient: 'from-purple-500 to-violet-500' },
    { name: 'Sports', path: '/sports', icon: '⚽', gradient: 'from-orange-500 to-yellow-500' },
    { name: 'Technology', path: '/technology', icon: '💻', gradient: 'from-indigo-500 to-blue-500' },
  ];

  const countries = [
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  ];

  const handleCountryChange = (countryCode) => {
    setCountry(countryCode);
    setIsCountryOpen(false);
  };

  const currentCountry = countries.find(c => c.code === country);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
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
              <div className="text-xs text-gray-400 font-medium">Premium News</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={category.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 group ${
                    location.pathname === category.path
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {location.pathname === category.path && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-xl opacity-20`}
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="text-lg">{category.icon}</span>
                  <span className="relative z-10">{category.name}</span>
                  {location.pathname === category.path && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Country Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Country Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4 text-gray-300" />
                <span className="text-xl">{currentCountry?.flag}</span>
                <span className="text-sm font-medium text-white hidden sm:block">{currentCountry?.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${isCountryOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isCountryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50"
                  >
                    {countries.map((country, index) => (
                      <motion.button
                        key={country.code}
                        onClick={() => handleCountryChange(country.code)}
                        className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center space-x-3 transition-all duration-200 text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm font-medium">{country.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 py-6"
            >
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={category.path}
                      onClick={() => setIsOpen(false)}
                      className={`relative px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-3 ${
                        location.pathname === category.path
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;