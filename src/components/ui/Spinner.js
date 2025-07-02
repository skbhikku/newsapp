import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Spinner;