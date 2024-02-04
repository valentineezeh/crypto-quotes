import { lazy,  Suspense, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import './App.css';
import { PageLoader } from './pages/PageLoader'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'))

const checkAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? true : false;
};

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    const isAuthenticated = checkAccessToken()
    setIsAuthenticated(isAuthenticated)
  },[])

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader/>}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to='/crypto-quotes' replace />
            : <LoginPage />}
            />
          <Route
            path="/crypto-quotes"
            element={isAuthenticated ? <SubscriptionPage /> : <Navigate to='/' replace/>}
            />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
