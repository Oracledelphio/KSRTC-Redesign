"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function SchedulesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [routeType, setRouteType] = useState("all")

  const schedules = [
    {
      id: 1,
      route: "Thiruvananthapuram - Kochi",
      type: "Super Fast",
      departureTime: "06:00 AM",
      arrivalTime: "12:00 PM",
      frequency: "Daily",
      stops: "Kollam, Alappuzha",
    },
    {
      id: 2,
      route: "Kochi - Kozhikode",
      type: "Super Deluxe",
      departureTime: "07:30 AM",
      arrivalTime: "02:00 PM",
      frequency: "Daily",
      stops: "Thrissur, Palakkad",
    },
    {
      id: 3,
      route: "Thiruvananthapuram - Kannur",
      type: "AC Volvo",
      departureTime: "08:00 PM",
      arrivalTime: "06:00 AM",
      frequency: "Daily",
      stops: "Kollam, Alappuzha, Kochi, Thrissur, Kozhikode",
    },
    {
      id: 4,
      route: "Kochi - Thiruvananthapuram",
      type: "Super Fast",
      departureTime: "02:30 PM",
      arrivalTime: "08:30 PM",
      frequency: "Daily",
      stops: "Alappuzha, Kollam",
    },
    {
      id: 5,
      route: "Kozhikode - Kochi",
      type: "Super Deluxe",
      departureTime: "09:00 AM",
      arrivalTime: "03:30 PM",
      frequency: "Daily",
      stops: "Palakkad, Thrissur",
    },
    {
      id: 6,
      route: "Kannur - Thiruvananthapuram",
      type: "AC Volvo",
      departureTime: "07:00 PM",
      arrivalTime: "05:00 AM",
      frequency: "Daily",
      stops: "Kozhikode, Thrissur, Kochi, Alappuzha, Kollam",
    },
  ]

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = schedule.route.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = routeType === "all" || schedule.type === routeType
    return matchesSearch && matchesType
  })

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
            <h1 className="text-3xl font-bold text-[#1A237E] mb-6">Bus Schedules</h1>
            <p className="text-gray-600 mb-8">
              Find regular bus schedules for all routes operated by Kerala RTC. Plan your journey in advance.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Routes</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by route (e.g., Kochi - Kozhikode)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Bus Type</Label>
                <Select value={routeType} onValueChange={setRouteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Super Fast">Super Fast</SelectItem>
                    <SelectItem value="Super Deluxe">Super Deluxe</SelectItem>
                    <SelectItem value="AC Volvo">AC Volvo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                  <Search className="h-4 w-4 mr-2" />
                  Search Schedules
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#2E7D32]">Available Schedules</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-[#1A237E]/10">
                  <tr>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Route</th>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Type</th>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Departure</th>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Arrival</th>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Frequency</th>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Major Stops</th>
                    <th className="py-3 px-4 text-left text-[#1A237E] font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map((schedule) => (
                    <tr key={schedule.id} className="border-t border-gray-100">
                      <td className="py-3 px-4 font-medium">{schedule.route}</td>
                      <td className="py-3 px-4">{schedule.type}</td>
                      <td className="py-3 px-4">{schedule.departureTime}</td>
                      <td className="py-3 px-4">{schedule.arrivalTime}</td>
                      <td className="py-3 px-4">{schedule.frequency}</td>
                      <td className="py-3 px-4">{schedule.stops}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10"
                          onClick={() => (window.location.href = "/bookings")}
                        >
                          Book Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
