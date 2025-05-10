"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Award, Headphones } from "lucide-react"

export function ServiceFeatures() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-[#2E7D32]" />,
      title: "Safe Travel",
      description: "Our buses are regularly maintained and driven by experienced professionals for your safety.",
    },
    {
      icon: <Clock className="h-10 w-10 text-[#2E7D32]" />,
      title: "Punctual Service",
      description: "We value your time and ensure our buses depart and arrive as scheduled.",
    },
    {
      icon: <Award className="h-10 w-10 text-[#2E7D32]" />,
      title: "Premium Fleet",
      description: "Travel in comfort with our modern fleet featuring amenities for a pleasant journey.",
    },
    {
      icon: <Headphones className="h-10 w-10 text-[#2E7D32]" />,
      title: "24/7 Support",
      description: "Our customer service team is available round the clock to assist with your queries.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E7D32]">Why Choose KSRTC</h2>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best of public transportation with our commitment to quality, safety, and customer
            satisfaction
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#1A237E]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
