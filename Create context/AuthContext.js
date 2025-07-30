import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://backend-1-hccr.onrender.com/api';

  useEffect(() => {
    const loadUser = async () => {
      try {
        await Font.loadAsync({ ...Ionicons.font });
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Load user error:', err);
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

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  const isValidUsername = (username) =>
    /^[a-zA-Z0-9_]{3,}$/.test(username);

  // ✅ REGISTER + PROFILE COMBINED
 // AuthContext.js or wherever your register function is
const register = async (email, username, password, preProfile) => {
  try {
    const response = await fetch(`${API_URL}/register_with_profile/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password,
        pre_profile: preProfile,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("❌ Register failed", errorData);
      return false;
    }

    return true;
  } catch (err) {
    console.error("❌ Register error", err);
    return false;
  }
};


  const login = async (email, password) => {
  if (!isValidEmail(email)) return alert('❌ Invalid email') || false;
  if (!isValidPassword(password)) return alert('❌ Invalid password') || false;

  try {
    const res = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      await saveUser({
        access: data.access,
        email,
      });
      await AsyncStorage.setItem("token", data.access); // ✅ ADD THIS
      return true;
    } else {
      alert('❌ Login failed: ' + (data.detail || JSON.stringify(data)));
      return false;
    }
  } catch (err) {
    alert('❌ Login error: ' + err.message);
    return false;
  }
};
const logout = async () => {
  await clearUser();
  await AsyncStorage.removeItem("token"); // ✅ cleanup
};


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
        alert('❌ Reset failed: ' + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      alert('❌ Reset request error: ' + err.message);
      return false;
    }
  };

  const verifyOtpAndResetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_URL}/password-reset/confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Password has been reset.');
        return true;
      } else {
        alert('❌ OTP verification failed: ' + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      alert('❌ OTP error: ' + err.message);
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
