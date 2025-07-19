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
          setUser(JSON.parse(storedUser));
        }
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

  const register = async (email, username, password) => {
    try {
      const res = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(' Registration successful!');
        return true;
      } else {
        alert(' Registration failed: ' + JSON.stringify(data));
        return false;
      }
    } catch (err) {
      console.error('Register error:', err);
      alert(' Register error: ' + err.message);
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

    if (res.ok) {
      await saveUser({
        access: data.access,
        email,
      });
      return true;
    } else {
      alert('Login failed: ' + JSON.stringify(data));
      return false;
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Login error: ' + err.message);
    return false;
  }
};

  const logout = async () => {
    await clearUser();
  };

  const requestResetEmail = async (email,name) => {
    try {
      const res = await fetch(`${API_URL}/password-reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:email, name:name }),
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
      console.error('Reset request error:', err);
      alert('❌ Reset request error: ' + err.message);
      return false;
    }
  };

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
    console.error("OTP reset error:", err);
    alert("❌ Error: " + err.message);
    return false;
  }
};


  // const resetPassword = async (uidb64, token, newPassword) => {
  //   try {
  //     const res = await fetch(
  //       `${API_URL}/password-reset/verify/${uidb64}/${token}/`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ new_password: newPassword }),
  //       }
  //     );

  //     const data = await res.json();

  //     if (res.ok) {
  //       alert('✅ Password has been reset.');
  //       return true;
  //     } else {
  //       alert('❌ Reset failed: ' + JSON.stringify(data));
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error('Password reset error:', err);
  //     alert('❌ Reset error: ' + err.message);
  //     return false;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        requestResetEmail,
        // resetPassword,
        verifyOtpAndResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
