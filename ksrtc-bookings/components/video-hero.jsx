"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CalendarIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function VideoHero() {
  const [date, setDate] = useState()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set video loaded after a short delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVideoLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    if (origin && destination && date) {
      // Pass search parameters to the bookings page
      const searchParams = new URLSearchParams({
        origin,
        destination,
        date: date.toISOString(),
      }).toString()

      router.push(`/bookings?${searchParams}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`object-cover w-full h-full transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-70" : "opacity-0"
          }`}
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/videos/kerala-landscape.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4">
            Explore Kerala's Beauty
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Travel through God's Own Country with comfort and reliability
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">From</label>
                <Select onValueChange={setOrigin}>
                  <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                    <SelectItem value="kochi">Kochi</SelectItem>
                    <SelectItem value="kozhikode">Kozhikode</SelectItem>
                    <SelectItem value="kollam">Kollam</SelectItem>
                    <SelectItem value="thrissur">Thrissur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">To</label>
                <Select onValueChange={setDestination}>
                  <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                    <SelectItem value="kochi">Kochi</SelectItem>
                    <SelectItem value="kozhikode">Kozhikode</SelectItem>
                    <SelectItem value="kollam">Kollam</SelectItem>
                    <SelectItem value="thrissur">Thrissur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white/20 border-white/30 text-white",
                        !date && "text-white/70",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-end">
                <Button
                  className="w-full bg-[#FFB300] hover:bg-[#FFA000] text-black font-medium h-10"
                  onClick={handleSearch}
                  disabled={!origin || !destination || !date}
                >
                  Search Buses
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex justify-center space-x-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-[#FFB300]" />
              <span className="text-sm md:text-base">45+ Districts</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2 text-[#FFB300]"
              >
                <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M12 18h.01" />
              </svg>
              <span className="text-sm md:text-base">Online Booking</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2 text-[#FFB300]"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-sm md:text-base">Secure Payment</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-sm mb-2">Scroll to explore</span>
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
            className="text-white h-6 w-6"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
