import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async ({ username, email, password }) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post('https://creozone-backend.onrender.com/api/auth/signup', { password, email, username }, { withCredentials: true })
            set({ isLoading: false })
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Something went Wrong in Signing up', isLoading: false })
            throw error;
        }
    },

    verifyOtp: async ({ email, otp }) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post('https://creozone-backend.onrender.com/api/auth/verify-otp', { email, otp }, { withCredentials: true })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Something went wrong verifying OTP', isLoading: false })
            throw error;
        }
    },

checkAuth: async () => {
  set({ isCheckingAuth: true, error: null });

  try {
    
    const res = await axios.get('https://creozone-backend.onrender.com/api/auth/verify', {
      withCredentials: true,
    });


    set({
      user: res.data.user,
      isCheckingAuth: false,
      isAuthenticated: true,
    });
  } catch (error) {

    if (error.response && error.response.status === 401) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: null, 
      });
      
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: null,
      });
    }
  }
},


    login: async ({ email, password }) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post('https://creozone-backend.onrender.com/api/auth/login', { password, email }, { withCredentials: true })
            
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || 'Something went Wrong while Login ', isLoading: false })
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {

            await axios.post('https://creozone-backend.onrender.com/api/auth/logout', {}, { withCredentials: true });

            set({
                user: null,
                isAuthenticated: false,
                isCheckingAuth: false,
                error: null,
                isLoading: false,
            });

        } catch (error) {
            
            set({
                error: error.response?.data?.message || "Logout failed",
                isAuthenticated: false,
                isCheckingAuth: false,
                isLoading: false,
            });
        }
    }




}))