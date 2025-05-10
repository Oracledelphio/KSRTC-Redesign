"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Sample user data
const sampleUser = {
  id: "user123",
  name: "Arun Kumar",
  email: "arun.kumar@example.com",
  phone: "9876543210",
  profilePic: "/images/profile-pic.jpg",
  address: "123 Main Street, Kochi, Kerala",
}

// Create context with default values to prevent undefined errors
const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  updateProfile: () => Promise.resolve(),
  deleteAccount: () => Promise.resolve(),
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    try {
      const storedUser = localStorage.getItem("ksrtc_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock login - in a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "demo@example.com" && password === "password") {
          setUser(sampleUser)
          try {
            localStorage.setItem("ksrtc_user", JSON.stringify(sampleUser))
          } catch (error) {
            console.error("Error saving user to localStorage:", error)
          }
          resolve(sampleUser)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  const register = (userData) => {
    // Mock registration - in a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, validate and save user data
        const newUser = {
          ...userData,
          id: `user${Math.floor(Math.random() * 1000)}`,
          profilePic: "/images/default-avatar.jpg",
        }
        setUser(newUser)
        try {
          localStorage.setItem("ksrtc_user", JSON.stringify(newUser))
        } catch (error) {
          console.error("Error saving user to localStorage:", error)
        }
        resolve(newUser)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("ksrtc_user")
    } catch (error) {
      console.error("Error removing user from localStorage:", error)
    }
  }

  const updateProfile = (updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...updatedData }
        setUser(updatedUser)
        try {
          localStorage.setItem("ksrtc_user", JSON.stringify(updatedUser))
        } catch (error) {
          console.error("Error updating user in localStorage:", error)
        }
        resolve(updatedUser)
      }, 1000)
    })
  }

  const deleteAccount = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null)
        try {
          localStorage.removeItem("ksrtc_user")
        } catch (error) {
          console.error("Error removing user from localStorage:", error)
        }
        resolve(true)
      }, 1000)
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
