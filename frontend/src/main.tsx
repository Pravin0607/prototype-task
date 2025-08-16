

import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "./state/store";
import { StrictMode } from "react";
import LandingPage from "./routes/LandingPage";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import Dashboard from "./routes/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes
          >
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
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
