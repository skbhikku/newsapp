import React from 'react';
import { motion } from 'framer-motion';

const LoadingBar = ({ progress }) => {
  if (progress === 0 || progress === 100) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-40">
      <div className="h-1 bg-black/20 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        {/* Simple animated glow without problematic keyframes */}
        <motion.div
          className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
          animate={{ 
            x: [0, 200, 400, 600, 800, 1000],
            opacity: [0, 1, 1, 1, 1, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;