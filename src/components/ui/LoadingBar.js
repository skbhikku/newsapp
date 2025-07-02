import React from 'react';
import { motion } from 'framer-motion';

const LoadingBar = ({ progress }) => {
  if (progress === 0 || progress === 100) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40">
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;