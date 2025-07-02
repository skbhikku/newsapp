import React from 'react';
import { motion } from 'framer-motion';
import { User, ExternalLink, Clock, Sparkles } from 'lucide-react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, category }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return "Stay informed with the latest news updates...";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      general: 'from-blue-500 to-purple-600',
      business: 'from-green-500 to-emerald-600',
      entertainment: 'from-pink-500 to-rose-600',
      health: 'from-red-500 to-pink-600',
      science: 'from-purple-500 to-violet-600',
      sports: 'from-orange-500 to-yellow-600',
      technology: 'from-indigo-500 to-blue-600'
    };
    return gradients[category] || 'from-blue-500 to-purple-600';
  };

  const defaultImage = "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800";

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden border border-white/20"
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <motion.img
          src={imageUrl || defaultImage}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Source Badge */}
        {source && (
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-black/60 backdrop-blur-lg text-white text-xs font-bold px-3 py-2 rounded-full border border-white/20">
              {source}
            </span>
          </motion.div>
        )}

        {/* Premium Badge */}
        <motion.div 
          className="absolute top-4 right-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`bg-gradient-to-r ${getCategoryGradient(category)} p-2 rounded-full shadow-lg`}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              initial={{ 
                x: Math.random() * 300, 
                y: Math.random() * 200,
                scale: 0 
              }}
              animate={{ 
                y: [null, -50],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Title */}
        <motion.h2 
          className="font-bold text-white text-xl leading-tight mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {truncateText(title, 80)}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {truncateText(description, 120)}
        </motion.p>

        {/* Meta Information */}
        <motion.div 
          className="flex items-center justify-between text-xs text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            {author && (
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span className="truncate max-w-24">{author}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(date)}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Read More Button */}
        <motion.a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getCategoryGradient(category)} text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span>Read Full Article</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
        </motion.a>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getCategoryGradient(category)} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
    </motion.article>
  );
};

export default NewsItem;