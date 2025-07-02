import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import News from './components/news/News';
import LoadingBar from './components/ui/LoadingBar';
import Footer from './components/layout/Footer';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState('in');
  const apiKey = "3dbf68ae503444e08979c32caac0f24f";

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