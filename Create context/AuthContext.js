import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://backend-1-hccr.onrender.com/api';

  // ✅ Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Password validation
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  // ✅ Username validation
  const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await Font.loadAsync({ ...Ionicons.font });

        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('📦 Token loaded from storage:', parsedUser.access);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error('❌ Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const saveUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const clearUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  // ✅ Registration
  const register = async (email, username, password) => {
    if (!isValidEmail(email)) {
      alert('❌ Invalid email format.');
      return false;
    }
    if (!isValidUsername(username)) {
      alert('❌ Username must be 3+ characters (letters, numbers, underscores).');
      return false;
    }
    if (!isValidPassword(password)) {
      alert('❌ Password must be 8+ characters (upper, lower, number, special char).');
      return false;
    }

    try {
      const res = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Registration successful!');
        return true;
      } else {
        alert('❌ Registration failed: ' + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      console.error('❌ Register error:', err);
      alert('❌ Register error: ' + err.message);
      return false;
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    if (!isValidEmail(email)) {
      alert('❌ Invalid email.');
      return false;
    }
    if (!isValidPassword(password)) {
      alert('❌ Invalid password.');
      return false;
    }

    try {
      const res = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('🔐 Token received:', data.access);
        await saveUser({ access: data.access, email });
        return true;
      } else {
        alert('❌ Login failed: ' + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      alert('❌ Login error: ' + err.message);
      return false;
    }
  };

  // ✅ Logout
  const logout = async () => {
    await clearUser();
    alert('👋 Logged out successfully!');
  };

  // ✅ Send Password Reset Email
  const requestResetEmail = async (email, name) => {
    try {
      const res = await fetch(`${API_URL}/password-reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('📩 Reset link sent to your email.');
        return true;
      } else {
        alert('❌ Failed: ' + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      console.error('❌ Reset email error:', err);
      alert('❌ Error: ' + err.message);
      return false;
    }
  };

  // ✅ Verify OTP and Reset Password
  const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_URL}/password-reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Password has been reset successfully.");
        return true;
      } else {
        alert("❌ OTP verification failed: " + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      console.error("❌ OTP reset error:", err);
      alert("❌ Error: " + err.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        requestResetEmail,
        verifyOtpAndResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
