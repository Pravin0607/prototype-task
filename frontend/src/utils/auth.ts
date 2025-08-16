import axios from 'axios';
import { store } from '../state/store';
import { login, logout } from '../state/sessionSlice';
import { BASE_URL } from '@/lib/constants';
import { toast } from 'react-hot-toast';

// Function to initialize auth state from localStorage
export const initializeAuth = () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const userEmail = localStorage.getItem('user_email');
  
  if (accessToken && refreshToken && userEmail) {
    // Set authorization header for all future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    // Dispatch login action to update Redux store
    store.dispatch(login({ 
      accessToken, 
      user: { email: userEmail } 
    }));
    
    // Set up token refresh mechanism
    setupTokenRefresh();
  }
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!refreshToken) {
    // No refresh token available, logout user
    handleLogout();
    return null;
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken
    });
    
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
    
    // Update axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    
    return newAccessToken;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Refresh token is invalid or expired
    handleLogout();
    return null;
  }
};

// Function to setup token refresh
export const setupTokenRefresh = () => {
  // JWT tokens typically expire after a certain time
  // We'll set a timer to refresh the token before it expires
  // For example, if token expires in 30 minutes, refresh after 25 minutes
  const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes
  
  // Clear any existing refresh timer
  if (window.tokenRefreshTimer) {
    clearTimeout(window.tokenRefreshTimer);
  }
  
  // Set new refresh timer
  window.tokenRefreshTimer = setTimeout(async () => {
    await refreshAccessToken();
    // Setup the next refresh cycle
    setupTokenRefresh();
  }, REFRESH_INTERVAL);
};

// Function to handle logout
export const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_email');
  
  // Clear the auth header
  delete axios.defaults.headers.common['Authorization'];
  
  // Clear token refresh timer
  if (window.tokenRefreshTimer) {
    clearTimeout(window.tokenRefreshTimer);
  }
  
  // Update Redux store
  store.dispatch(logout());
};

// Updated axios interceptor to logout user if token is expired and show a toast
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 Unauthorized and not from a token refresh request
    if (error.response?.status === 401 && 
        originalRequest.url !== `${BASE_URL}/api/token/refresh/`) {
      // Logout the user if token is expired
      handleLogout();

      // Show a toast notification
      toast.error('Session expired. You have been logged out.');

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Declare the global timer variable
declare global {
  interface Window {
    tokenRefreshTimer: NodeJS.Timeout | undefined;
  }
}
