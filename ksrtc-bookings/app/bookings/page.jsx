"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"
import { PromotionBanner } from "@/components/promotion-banner"
import { BusListings } from "@/components/bus-listings"
import { motion } from "framer-motion"
import { format, parseISO } from "date-fns"

export default function BookingsPage() {
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: null,
  })

  // Use a ref to track if we've already processed URL params
  const initializedRef = useRef(false)
  const urlSearchParams = useSearchParams()

  // Handle search parameters from URL - only run once
  useEffect(() => {
    // Skip if we've already initialized from URL params
    if (initializedRef.current) return

    const origin = urlSearchParams.get("origin")
    const destination = urlSearchParams.get("destination")
    const dateParam = urlSearchParams.get("date")

    if (origin && destination && dateParam) {
      try {
        const parsedDate = parseISO(dateParam)
        setSearchParams({
          origin,
          destination,
          date: parsedDate,
        })
        setSearchPerformed(true)
        initializedRef.current = true
      } catch (error) {
        console.error("Invalid date format:", error)
      }
    }
  }, [urlSearchParams])

  const handleSearch = (formData) => {
    setSearchParams(formData)
    setSearchPerformed(true)
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
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div className="space-y-8" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-[#1A237E] mb-6">Book Your Journey</h1>
            <BookingForm onSearch={handleSearch} initialValues={searchParams} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <PromotionBanner />
          </motion.div>

          {searchPerformed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">
                Available Buses from {searchParams.origin} to {searchParams.destination}
                {searchParams.date && ` on ${format(searchParams.date, "dd MMM yyyy")}`}
              </h2>
              <BusListings
                origin={searchParams.origin}
                destination={searchParams.destination}
                date={searchParams.date}
              />
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
