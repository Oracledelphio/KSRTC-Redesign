"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ksrtc_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("ksrtc_user", JSON.stringify(data.user));
      router.push("/bookings");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }
  };

  // Register function
  const register = async (formData: RegisterFormData) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Registration failed");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("ksrtc_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
