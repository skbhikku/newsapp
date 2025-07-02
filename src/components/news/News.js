import React, { useEffect, useState } from 'react';
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

  const updateNews = async () => {
    try {
      setProgress(10);
      setError(null);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=1&pageSize=${pageSize}`;
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
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} News - NewsKnow`;
    updateNews();
  }, [country, category]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{error}</p>
          {error.includes('API key') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Need help with your API key?</strong><br/>
                1. Get a free key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">newsapi.org</a><br/>
                2. Update the REACT_APP_NEWS_API_KEY in your .env file<br/>
                3. Restart the development server
              </p>
            </div>
          )}
          <button
            onClick={updateNews}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-4xl">{getCategoryIcon(category)}</span>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            {capitalizeFirstLetter(category)} News
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Stay updated with the latest {category} headlines from around the world
        </p>
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
              className="text-center py-8"
            >
              <p className="text-gray-500 text-lg">🎉 You've reached the end!</p>
              <p className="text-gray-400">No more articles to load</p>
            </motion.div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={`${article.url}-${index}`}
                initial={{ opacity: 0, y: 20 }}
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
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h2>
          <p className="text-gray-600">Try selecting a different category or country</p>
        </motion.div>
      )}
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