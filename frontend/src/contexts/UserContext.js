import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUserProfile } from '../services/UserService';
import { logout as authLogout } from '../services/AuthService';

// Initial state
const initialState = {
  user: null,
  userProfile: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// Action types
const USER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      };
    case USER_ACTIONS.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        error: null
      };
    case USER_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case USER_ACTIONS.LOGOUT:
      return { ...initialState };
    case USER_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Initialize user from token on app start
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          dispatch({ type: USER_ACTIONS.SET_USER, payload: decoded });

          // Fetch full user profile
          await fetchUserProfile();
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    initializeUser();
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      const profileData = await getUserProfile();
      dispatch({ type: USER_ACTIONS.SET_USER_PROFILE, payload: profileData });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: 'Không thể tải thông tin người dùng' });
    }
  };

  // Login function
  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify(decoded));

      dispatch({ type: USER_ACTIONS.SET_USER, payload: decoded });

      // Fetch full user profile after login
      await fetchUserProfile();
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: 'Đăng nhập thất bại' });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authLogout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: USER_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if server logout fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: USER_ACTIONS.LOGOUT });
    }
  };

  // Update user profile
  const updateUserProfile = (updatedProfile) => {
    dispatch({ type: USER_ACTIONS.SET_USER_PROFILE, payload: updatedProfile });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    logout,
    fetchUserProfile,
    updateUserProfile,
    clearError
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 