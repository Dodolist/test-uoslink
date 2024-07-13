import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import Home from './components/Home';
import Mobile from './components/Mobile';
//import libraryIcon from './images/library-icon.svg';
//import mapIcon from './images/map-icon.svg';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const themeObject = {
    light: {
      mode: 'light',
      background: '#e5e6ec',
      foreground: '#f0f1f5',
      titleText: '#3c414c',
      contentText: '#5c5e66',
      subText: '#a9adb9',
      primary: '#408cff',
      secondary: '#98bffa',
      boxShadow: '0 4px 24px 0 #cecece',
    },
    dark: {
      mode: 'dark',
      background: '#1d2128',
      foreground: '#2c3038',
      titleText: '#a0a4b3',
      contentText: '#b4b7c4',
      subText: '#5d616f',
      primary: '#408cff',
      secondary: '#98bffa',
      boxShadow: '0 4px 24px 0 #3c414c',
    }
  };

  const toggleTheme = () => {
    /*
    chrome.history.search({text: '', maxResults: 20}, function(data) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].url);
      }
    });
    */
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };


  return (
    <ThemeProvider theme={themeObject[theme]}>
      <Router basename={process.env.PUBLIC_URL}> 
        <Routes>
          <Route path="/mobile" element={<Home />}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <Route exact path="/" element={<Mobile />}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
