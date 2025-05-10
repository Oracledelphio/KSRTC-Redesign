"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AppPromotion() {
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
    <section className="py-16 bg-gradient-to-r from-[#1A237E] to-[#2E7D32]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Download the KSRTC Mobile App
            </motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1 bg-[#FFB300] mb-6 rounded-full"></motion.div>
            <motion.p variants={itemVariants} className="text-white/90 mb-6">
              Experience the convenience of booking tickets, tracking buses, and managing your trips on the go with our
              user-friendly mobile application.
            </motion.p>

            <motion.ul variants={containerVariants} className="space-y-4 mb-8">
              <motion.li variants={itemVariants} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-3 text-[#FFB300]"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span>Quick and easy ticket booking</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-3 text-[#FFB300]"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span>Real-time bus tracking</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-3 text-[#FFB300]"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span>Manage your booking history</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-3 text-[#FFB300]"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span>Exclusive mobile-only offers</span>
              </motion.li>
            </motion.ul>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2 h-14 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.9 2.318A5.3 5.3 0 0 1 22.6 7.6v8.9a5.3 5.3 0 0 1-4.7 5.2h-11a5.3 5.3 0 0 1-5.3-5.2V7.6a5.3 5.3 0 0 1 5.3-5.3h11Zm-5.6 16.5v-2.4h-1.3v-1.5h1.3v-1.5h-1.3v-1.5h1.3v-1.4h-1.3v-1.5h1.3v-1.5h-1.3v-1.5h1.3V4.518h-3.6a3.8 3.8 0 0 0-3.8 3.8v7.4a3.8 3.8 0 0 0 3.8 3.8h3.6v-.7Zm5.6-14.9h-4.1v14.2h4.1a3.8 3.8 0 0 0 3.8-3.8v-6.6a3.8 3.8 0 0 0-3.8-3.8Zm-1.5 7.9a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
              <Button className="bg-black hover:bg-gray-900 text-white flex items-center gap-2 h-14 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42Zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.82 3.28-.82 2 .82 3.3.79 2.22-1.23 3.06-2.44a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.05Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative mx-auto w-64 md:w-80">
              <Image
                src="/images/app-mockup.png"
                alt="KSRTC Mobile App"
                width={320}
                height={640}
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-[#FFB300]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-[#2E7D32]/20 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
