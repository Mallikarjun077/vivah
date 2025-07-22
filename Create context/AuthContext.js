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
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("📦 Token loaded from storage:", parsedUser.access);
          const isValid = await validateToken(parsedUser.access);
          if (isValid) {
            setUser(parsedUser);
          } else {
            await clearUser();
          }
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
    console.log("✅ Token saved to AsyncStorage:", userData.access);
  };

  const clearUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    console.log("🚫 Token cleared");
  };

  const register = async (email, username, password) => {
    try {
      const res = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      if (res.ok && data.access) {
        console.log("✅ Registration successful");
        const userData = { email: data.email, access: data.access };
        await saveUser(userData);
        return true;
      } else {
        console.log("❌ Registration failed:", data);
        alert('❌ Registration failed');
        return false;
      }
    } catch (err) {
      console.log('❌ Registration error:', err.message);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.access) {
        const userData = { email: data.email, access: data.access };
        await saveUser(userData);
        console.log("🔐 Token after login:", data.access);
        return true;
      } else {
        console.log("❌ Login failed:", data);
        alert("❌ Login failed");
        return false;
      }
    } catch (err) {
      console.log('❌ Login error:', err.message);
      return false;
    }
  };

  const validateToken = async (token) => {
    console.log("🔐 Token being sent for validation:", token);
    try {
      const res = await fetch(`${API_URL}/profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        console.log("✅ Token is valid");
        return true;
      } else {
        console.log("❌ Invalid token");
        return false;
      }
    } catch (err) {
      console.error("❌ Token validation error:", err);
      return false;
    }
  };

  const logout = async () => {
    await clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.access || null,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
