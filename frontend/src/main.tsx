
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './state/store';


import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from './routes/LandingPage.tsx';
import LoginPage from './routes/LoginPage.tsx';
import SignupPage from './routes/SignupPage.tsx';
import Dashboard from './routes/Dashboard.tsx';
import PrivateRoute from './routes/PrivateRoute';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <LandingPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <LoginPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <SignupPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
