import { lazy,  Suspense } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';

const LoginPage = lazy(() => import('./pages/LoginPage'))
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'))

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/crypto-quotes" element={<SubscriptionPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
