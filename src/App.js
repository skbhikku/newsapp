import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import News from './components/news/News';
import LoadingBar from './components/ui/LoadingBar';
import Footer from './components/layout/Footer';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState('in');
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  // Check if API key is configured
  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-6xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">API Key Required</h2>
          <p className="text-gray-600 mb-6">
            Please set up your NewsAPI key to use this application.
          </p>
          <div className="text-left bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Steps to set up:</strong>
            </p>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Get a free API key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">newsapi.org</a></li>
              <li>2. Replace 'your_newsapi_key_here' in the .env file with your actual API key</li>
              <li>3. Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar setCountry={setCountry} country={country} />
        <LoadingBar progress={progress} />
        
        <main className="pt-20">
          <Routes>
            <Route
              path='/'
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="general" />}
            />
            <Route
              path="/business"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="business" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="entertainment" />}
            />
            <Route
              path="/general"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="general" />}
            />
            <Route
              path="/health"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="health" />}
            />
            <Route
              path="/science"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="science" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="sports" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="technology" />}
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;