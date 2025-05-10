"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Mail, Phone, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms and Conditions")
      return
    }

    setIsLoading(true)

    try {
      await register(formData)
      router.push("/profile")
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    // In a real app, this would integrate with Google OAuth
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, we'll just register with a demo account
      register({
        name: "Demo User",
        email: "demo@example.com",
        phone: "9876543210",
      })
        .then(() => router.push("/profile"))
        .catch((err) => setError(err.message))
    }, 1500)
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
            <h1 className="text-3xl font-bold text-[#1A237E]">Create Account</h1>
            <p className="text-gray-600 mt-2">Join Kerala RTC for a seamless travel experience</p>
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={setAgreeTerms}
                  className="data-[state=checked]:bg-[#2E7D32] data-[state=checked]:border-[#2E7D32]"
                />
                <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#2E7D32] hover:underline">
                    Terms and Conditions
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] h-11" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or register with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleRegister}
                disabled={isLoading}
              >
                <Image src="/images/google-logo.png" alt="Google" width={20} height={20} className="mr-2" />
                Sign up with Google
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#2E7D32] hover:underline font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
