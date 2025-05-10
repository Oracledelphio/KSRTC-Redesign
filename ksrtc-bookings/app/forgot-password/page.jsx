"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
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
          <motion.div variants={itemVariants} className="mb-6">
            <Link
              href="/login"
              className="inline-flex items-center text-[#2E7D32] hover:text-[#1B5E20] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1A237E]">Reset Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button onClick={() => setIsSubmitted(false)} className="text-[#2E7D32] hover:underline">
                    try again
                  </button>
                </p>
                <Link href="/login">
                  <Button variant="outline" className="border-[#2E7D32] text-[#2E7D32]">
                    Return to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

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

                <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] h-11" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
