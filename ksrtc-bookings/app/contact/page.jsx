"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
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
      <main className="flex-1">
        <div className="relative h-64 md:h-80 bg-[#1A237E]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A237E] to-[#2E7D32] opacity-80"></div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              className="text-white bg-[#1A237E]/50 backdrop-blur-sm p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">Contact Us</h1>
              <p className="text-lg md:text-xl max-w-2xl text-white drop-shadow-md">
                We're here to help. Reach out to us with any questions or feedback.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="container mx-auto px-4 py-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#2E7D32]/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Head Office</h3>
                      <p className="text-gray-600 mt-1">
                        Transport Bhavan, Fort P.O
                        <br />
                        Thiruvananthapuram, Kerala
                        <br />
                        PIN: 695023
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#2E7D32]/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600 mt-1">1800-599-1234 (Toll Free)</p>
                      <p className="text-gray-600">+91-471-2471011</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#2E7D32]/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600 mt-1">info@keralartc.com</p>
                      <p className="text-gray-600">support@keralartc.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#2E7D32]/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Working Hours</h3>
                      <p className="text-gray-600 mt-1">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#1A237E] mb-6">Send us a Message</h2>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your message has been sent successfully. We'll get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleSelectChange("subject", value)}
                        >
                          <SelectTrigger className="select-trigger">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent className="select-content">
                            <SelectItem className="select-item" value="general">General Inquiry</SelectItem>
                            <SelectItem className="select-item" value="booking">Booking Issue</SelectItem>
                            <SelectItem className="select-item" value="feedback">Feedback</SelectItem>
                            <SelectItem className="select-item" value="complaint">Complaint</SelectItem>
                            <SelectItem className="select-item" value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="bg-[#2E7D32] hover:bg-[#1B5E20]" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-12">
            <h2 className="text-2xl font-bold text-[#1A237E] mb-6 text-center">Find Us</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8988118461!2d76.94580731478252!3d8.500285193884901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb3d1f5b5e5%3A0x5c2a88a0d7a2d0c7!2sKerala%20State%20Road%20Transport%20Corporation!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}