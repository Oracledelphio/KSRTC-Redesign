"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/profile")
    } catch (err) {
      setError(err.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, we'll just log in with a demo account
      login("demo@example.com", "password")
        .then(() => router.push("/profile"))
        .catch((err) => setError(err.message))
    }, 1500)
  }

  // For demo purposes
  const handleDemoLogin = () => {
    setEmail("demo@example.com")
    setPassword("password")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div className="max-w-md w-full" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1A237E]">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to Kerala RTC</p>
          </motion.div>

          {error && (
            <motion.div variants={itemVariants}>
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-[#2E7D32] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="data-[state=checked]:bg-[#2E7D32] data-[state=checked]:border-[#2E7D32]"
                />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] h-11" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <Image src="/images/google-logo.png" alt="Google" width={20} height={20} className="mr-2" />
                Sign in with Google
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-[#2E7D32] hover:underline font-medium">
                    Sign Up
                  </Link>
                </p>
              </div>

              {/* Demo login helper - remove in production */}
              <div className="text-center mt-4">
                <button type="button" onClick={handleDemoLogin} className="text-xs text-gray-400 hover:text-gray-600">
                  (Use demo account)
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
