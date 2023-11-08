// import logo from './logo.svg';
import './App.css'
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        {/* ae01f9231e7d4a54b619e53c75838419 */}

        <Routes>
          <Route
            path={'/' ? '/' : '/General'}
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='general'
                pageSize={6}
                country='in'
                category='general'
              />
            }
          />
          <Route
            path='/Business'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='business'
                pageSize={6}
                country='in'
                category='business'
              />
            }
          />
          <Route
            path='/Entertainment'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='entertainment'
                pageSize={6}
                country='in'
                category='entertainment'
              />
            }
          />
          <Route
            path='/General'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='general'
                pageSize={6}
                country='in'
                category='general'
              />
            }
          />
          <Route
            path='/Health'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='health'
                pageSize={6}
                country='in'
                category='health'
              />
            }
          />
          <Route
            path='/Science'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='science'
                pageSize={6}
                country='in'
                category='science'
              />
            }
          />
          <Route
            path='/Sports'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='sports'
                pageSize={6}
                country='in'
                category='sports'
              />
            }
          />
          <Route
            path='/Technology'
            element={
              <News
                apikey={apiKey}
                setProgress={setProgress}
                key='technology'
                pageSize={6}
                country='in'
                category='technology'
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
