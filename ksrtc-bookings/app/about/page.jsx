"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
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
        <div className="relative h-64 md:h-96 bg-[#1A237E]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A237E] to-[#2E7D32] opacity-80"></div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              className="text-white bg-[#1A237E]/50 backdrop-blur-sm p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">About Kerala RTC</h1>
              <p className="text-lg md:text-xl max-w-2xl text-white drop-shadow-md">
                Connecting Kerala with safe, reliable, and comfortable transportation since 1965.
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
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[#1A237E] mb-4">Our History</h2>
              <p className="text-gray-700 mb-4">
                Kerala State Road Transport Corporation (KSRTC) was established in 1965 as a successor to the Travancore
                State Transport Department. Since then, it has grown to become one of the oldest and most extensive
                public transport systems in India.
              </p>
              <p className="text-gray-700">
                With a rich history spanning over five decades, KSRTC has been instrumental in connecting cities, towns,
                and villages across Kerala, contributing significantly to the state's economic and social development.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/ksrtc-history.png" alt="KSRTC History" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">Our Mission & Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#2E7D32]">
                <h3 className="text-xl font-bold text-[#2E7D32] mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To provide safe, reliable, and affordable transportation services to the people of Kerala, connecting
                  every corner of the state with efficiency and comfort. We strive to be the preferred mode of public
                  transport by continuously improving our services and adopting sustainable practices.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#FFB300]">
                <h3 className="text-xl font-bold text-[#FFB300] mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be the leading public transport organization in India, setting benchmarks in service quality,
                  operational efficiency, and environmental sustainability. We aim to transform the public
                  transportation experience by embracing innovation and technology while maintaining our commitment to
                  social responsibility.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">Our Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image src="/images/volvo-bus.png" alt="AC Volvo" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#2E7D32] mb-2">AC Volvo</h3>
                  <p className="text-gray-700">
                    Luxury travel with air conditioning, reclining seats, and entertainment systems for long-distance
                    journeys.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image src="/images/super-deluxe.png" alt="Super Deluxe" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#2E7D32] mb-2">Super Deluxe</h3>
                  <p className="text-gray-700">
                    Comfortable seating with extra legroom and amenities for a pleasant journey between major cities.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <Image src="/images/non-ac-bus.png" alt="Super Fast" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#2E7D32] mb-2">Super Fast</h3>
                  <p className="text-gray-700">
                    Economical and efficient transportation connecting all districts and major towns across Kerala.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">Key Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#2E7D32] mb-2">5,000+</div>
                <div className="text-gray-700">Buses</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#2E7D32] mb-2">15,000+</div>
                <div className="text-gray-700">Employees</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#2E7D32] mb-2">1.5M+</div>
                <div className="text-gray-700">Daily Passengers</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#2E7D32] mb-2">93</div>
                <div className="text-gray-700">Depots</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}