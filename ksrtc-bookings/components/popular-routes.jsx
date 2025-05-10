"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

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

export function PopularRoutes() {
  const router = useRouter()

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
                  src={route.image || "/placeholder.svg"}
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
