// src/App.js
import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState('in');
  const apiKey = process.env.REACT_APP_NEWSAPI;

  return (
    <>
      <Router>
        <Navbar setCountry={setCountry} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <div>
          <Routes>
            <Route
              exact path='/'
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="general" />}
            />
            <Route
              path="/business"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category={'business'} />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="entertainment" />}
            />
            <Route
              path="/general"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="general" />}
            />
            <Route
              path="/health"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="health" />}
            />
            <Route
              path="/science"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="science" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="sports" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={setProgress} apiKey={apiKey} pageSize={6} country={country} category="technology" />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
