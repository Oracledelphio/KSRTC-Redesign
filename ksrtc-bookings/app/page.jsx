"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { CalendarIcon, MapPin, Clock, Award, Headphones, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <VideoHero />
        <PopularRoutes />
        <ServiceFeatures />
        <Testimonials />
        <AppPromotion />
      </main>
      <Footer />
    </div>
  )
}

function VideoHero() {
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
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/kerala-vid.mp4" type="video/mp4" />
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
            className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
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
              <span className="text-sm md:text-base">14 Districts</span>
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

function PopularRoutes() {
  const router = useRouter()

  const popularRoutes = [
    {
      id: 1,
      from: "Thiruvananthapuram",
      to: "Kochi",
      image: "/images/kochi.jpg",
      price: "₹750",
      duration: "6h 00m",
    },
    {
      id: 2,
      from: "Kochi",
      to: "Kozhikode",
      image: "/images/kozhikode.jpg",
      price: "₹850",
      duration: "6h 30m",
    },
    {
      id: 3,
      from: "Thiruvananthapuram",
      to: "Munnar",
      image: "/images/munnar.jpg",
      price: "₹950",
      duration: "8h 15m",
    },
    {
      id: 4,
      from: "Kochi",
      to: "Alappuzha",
      image: "/images/alappuzha.jpg",
      price: "₹350",
      duration: "2h 30m",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E7D32]">Popular Routes</h2>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most popular routes across Kerala with comfortable buses and convenient schedules
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {popularRoutes.map((route) => (
            <motion.div
              key={route.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="relative h-48">
                <Image
                  src={route.image || "/placeholder.svg?height=200&width=300"}
                  alt={`${route.from} to ${route.to}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <p className="text-sm font-medium opacity-90">From</p>
                  <h3 className="text-lg font-bold">{route.from}</h3>
                </div>
                <div className="absolute bottom-0 right-0 p-4 text-white text-right">
                  <p className="text-sm font-medium opacity-90">To</p>
                  <h3 className="text-lg font-bold">{route.to}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-xl font-bold text-[#2E7D32]">{route.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{route.duration}</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-[#1A237E] hover:bg-[#0D1B60] text-white"
                  onClick={() => router.push("/bookings")}
                >
                  View Schedules
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white"
            onClick={() => router.push("/bookings")}
          >
            View All Routes
          </Button>
        </div>
      </div>
    </section>
  )
}

function ServiceFeatures() {
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

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Menon",
      location: "Kochi",
      image: "/images/testimonial-1.jpg",
      rating: 5,
      text: "I've been using KSRTC services for years, and the recent improvements in the booking system have made it even better. The buses are clean, punctual, and the staff is always helpful.",
    },
    {
      id: 2,
      name: "Rahul Nair",
      location: "Thiruvananthapuram",
      image: "/images/testimonial-2.jpg",
      rating: 4,
      text: "The online booking system is very convenient. I can easily book tickets for my weekly trips between Thiruvananthapuram and Kochi. The Super Deluxe buses are comfortable for long journeys.",
    },
    {
      id: 3,
      name: "Anjali Thomas",
      location: "Kozhikode",
      image: "/images/testimonial-3.jpg",
      rating: 5,
      text: "As a frequent traveler, I appreciate the reliability of KSRTC services. The new AC Volvo buses are excellent, and the online booking system saves me a lot of time.",
    },
    {
      id: 4,
      name: "Mohammed Salim",
      location: "Thrissur",
      image: "/images/testimonial-4.jpg",
      rating: 4,
      text: "The city circular service is a blessing for daily commuters like me. The buses are regular and the routes cover all major landmarks in the city.",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E7D32]">What Our Passengers Say</h2>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied passengers about their experience with KSRTC services
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-[#F5F5F5] rounded-xl p-8 shadow-md">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                          <Image
                            src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-[#FFB300] fill-[#FFB300]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                        <h4 className="font-bold text-[#1A237E]">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full bg-white shadow-md border-gray-200 hover:bg-gray-100"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full bg-white shadow-md border-gray-200 hover:bg-gray-100"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? "bg-[#2E7D32]" : "bg-gray-300"}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AppPromotion() {
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
                src="/placeholder.svg?height=640&width=320"
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
