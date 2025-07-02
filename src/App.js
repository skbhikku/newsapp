import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import News from './components/news/News';
import LoadingBar from './components/ui/LoadingBar';
import Footer from './components/layout/Footer';
import Hero from './components/layout/Hero';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState('in');
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  // Check if API key is configured
  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl text-center border border-white/20">
          <div className="text-6xl mb-4 animate-bounce">🔑</div>
          <h2 className="text-2xl font-bold text-white mb-4">API Key Required</h2>
          <p className="text-gray-200 mb-6">
            Please set up your NewsAPI key to use this application.
          </p>
          <div className="text-left bg-black/20 p-4 rounded-lg mb-4 backdrop-blur-sm">
            <p className="text-sm text-gray-200 mb-2">
              <strong>Steps to set up:</strong>
            </p>
            <ol className="text-sm text-gray-300 space-y-1">
              <li>1. Get a free API key from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">newsapi.org</a></li>
              <li>2. Create a .env file in your project root</li>
              <li>3. Add: REACT_APP_NEWS_API_KEY=your_actual_api_key</li>
              <li>4. Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar setCountry={setCountry} country={country} />
        <LoadingBar progress={progress} />
        
        <main className="pt-20">
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Hero />
                  <News setProgress={setProgress} apiKey={apiKey} pageSize={12} country={country} category="general" />
                </>
              }
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