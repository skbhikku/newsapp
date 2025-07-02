import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import NewsItem from './NewsItem';
import Spinner from '../ui/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

const News = ({ apiKey, setProgress, pageSize = 12, country = 'in', category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  // Use the API key directly if not provided via props
  const actualApiKey ="dedf46d1b5a74e18a6561995789c2b7f";

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      general: '📰',
      business: '💼',
      entertainment: '🎬',
      health: '🏥',
      science: '🔬',
      sports: '⚽',
      technology: '💻'
    };
    return icons[category] || '📰';
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      general: 'from-blue-600 via-purple-600 to-pink-600',
      business: 'from-green-500 to-emerald-600',
      entertainment: 'from-pink-500 to-rose-600',
      health: 'from-red-500 to-pink-600',
      science: 'from-purple-500 to-violet-600',
      sports: 'from-orange-500 to-yellow-600',
      technology: 'from-indigo-500 to-blue-600'
    };
    return gradients[category] || 'from-blue-600 via-purple-600 to-pink-600';
  };

  const getErrorMessage = (status, message) => {
    switch (status) {
      case 426:
        return 'API key issue: Please check if your NewsAPI key is valid and supports requests from this domain. If running locally, ensure your key supports localhost requests.';
      case 401:
        return 'Invalid API key: Please check your NewsAPI key in the .env file.';
      case 429:
        return 'Rate limit exceeded: You have made too many requests. Please try again later.';
      case 500:
        return 'Server error: NewsAPI is experiencing issues. Please try again later.';
      default:
        return message || 'An unexpected error occurred while fetching news.';
    }
  };

  const updateNews = useCallback(async () => {
    try {
      setProgress(10);
      setError(null);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      
      const response = await fetch(url);
      setProgress(30);
      
      if (!response.ok) {
        const errorMessage = getErrorMessage(response.status);
        throw new Error(errorMessage);
      }
      
      const parsedData = await response.json();
      setProgress(70);
      
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message);
      }
      
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setPage(1);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.message);
      setLoading(false);
      setProgress(100);
    }
  }, [actualApiKey, country, category, pageSize, setProgress]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} News - NewsKnow`;
    updateNews();
  }, [country, category, updateNews]);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
      
      const response = await fetch(url);
      const parsedData = await response.json();
      
      if (parsedData.articles) {
        setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
          >
            <div className="text-8xl mb-6">😞</div>
            <h2 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">{error}</p>
            {error.includes('API key') && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <p className="text-sm text-yellow-200">
                  <strong className="text-yellow-100">Need help with your API key?</strong><br/>
                  1. Get a free key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold">newsapi.org</a><br/>
                  2. Update the REACT_APP_NEWS_API_KEY in your .env file<br/>
                  3. Restart the development server
                </p>
              </div>
            )}
            <motion.button
              onClick={updateNews}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div id="news-section" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div
              className={`w-16 h-16 bg-gradient-to-r ${getCategoryGradient(category)} rounded-2xl flex items-center justify-center shadow-2xl`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl">{getCategoryIcon(category)}</span>
            </motion.div>
            <div>
              <h1 className={`text-5xl md:text-7xl font-black bg-gradient-to-r ${getCategoryGradient(category)} bg-clip-text text-transparent`}>
                {capitalizeFirstLetter(category)}
              </h1>
              <div className="text-white/60 text-lg font-medium">Latest Updates</div>
            </div>
          </div>
          <motion.p 
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Stay updated with the latest <span className={`bg-gradient-to-r ${getCategoryGradient(category)} bg-clip-text text-transparent font-semibold`}>{category}</span> headlines from around the world
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && <Spinner />}

        {/* News Grid */}
        {!loading && articles.length > 0 && (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
            endMessage={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md mx-auto">
                  <p className="text-2xl mb-2">🎉</p>
                  <p className="text-white text-lg font-semibold">You've reached the end!</p>
                  <p className="text-gray-400">No more articles to load</p>
                </div>
              </motion.div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={`${article.url}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsItem
                    title={article.title || ""}
                    description={article.description || ""}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source?.name}
                    category={category}
                  />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-12 border border-white/20 max-w-lg mx-auto">
              <div className="text-8xl mb-6">📰</div>
              <h2 className="text-3xl font-bold text-white mb-4">No articles found</h2>
              <p className="text-gray-300 text-lg">Try selecting a different category or country</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

News.propTypes = {
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string.isRequired,
};

export default News;