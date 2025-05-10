"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Clock, Calendar, Wifi, BatteryCharging, Coffee, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SeatSelector } from "@/components/seat-selector"
import { useRouter } from "next/navigation"

// Sample bus data - moved outside component to prevent recreation
const allBusData = [
  {
    id: 1,
    type: "AC Volvo",
    route: "Thiruvananthapuram to Kochi",
    origin: "thiruvananthapuram",
    destination: "kochi",
    departureTime: "07:30 AM",
    arrivalTime: "01:30 PM",
    duration: "6h 00m",
    fare: 750,
    availableSeats: 23,
    totalSeats: 40,
    amenities: ["wifi", "charging", "water", "blanket"],
    image: "/images/volvo-bus.png",
    discount: "30% OFF",
  },
  {
    id: 2,
    type: "AC Scania",
    route: "Kochi to Kozhikode",
    origin: "kochi",
    destination: "kozhikode",
    departureTime: "09:00 AM",
    arrivalTime: "03:30 PM",
    duration: "6h 30m",
    fare: 850,
    availableSeats: 15,
    totalSeats: 36,
    amenities: ["wifi", "charging", "water", "blanket", "entertainment"],
    image: "/images/scania-bus.png",
  },
  {
    id: 3,
    type: "Super Deluxe",
    route: "Thiruvananthapuram to Kozhikode",
    origin: "thiruvananthapuram",
    destination: "kozhikode",
    departureTime: "10:00 PM",
    arrivalTime: "08:00 AM",
    duration: "10h 00m",
    fare: 650,
    availableSeats: 28,
    totalSeats: 40,
    amenities: ["charging", "water"],
    image: "/images/super-deluxe.png",
  },
  {
    id: 4,
    type: "Non-AC",
    route: "Kochi to Thrissur",
    origin: "kochi",
    destination: "thrissur",
    departureTime: "02:30 PM",
    arrivalTime: "04:30 PM",
    duration: "2h 00m",
    fare: 180,
    availableSeats: 32,
    totalSeats: 45,
    amenities: [],
    image: "/images/non-ac-bus.png",
  },
  {
    id: 5,
    type: "AC Volvo",
    route: "Thrissur to Kozhikode",
    origin: "thrissur",
    destination: "kozhikode",
    departureTime: "08:00 AM",
    arrivalTime: "12:00 PM",
    duration: "4h 00m",
    fare: 450,
    availableSeats: 18,
    totalSeats: 40,
    amenities: ["wifi", "charging", "water"],
    image: "/images/volvo-bus.png",
  },
  {
    id: 6,
    type: "Super Deluxe",
    route: "Kollam to Alappuzha",
    origin: "kollam",
    destination: "alappuzha",
    departureTime: "11:30 AM",
    arrivalTime: "02:30 PM",
    duration: "3h 00m",
    fare: 320,
    availableSeats: 25,
    totalSeats: 40,
    amenities: ["charging", "water"],
    image: "/images/super-deluxe.png",
  },
  {
    id: 7,
    type: "AC Scania",
    route: "Kozhikode to Kannur",
    origin: "kozhikode",
    destination: "kannur",
    departureTime: "04:00 PM",
    arrivalTime: "06:30 PM",
    duration: "2h 30m",
    fare: 280,
    availableSeats: 22,
    totalSeats: 36,
    amenities: ["wifi", "charging", "water", "entertainment"],
    image: "/images/scania-bus.png",
    discount: "15% OFF",
  },
  {
    id: 8,
    type: "Non-AC",
    route: "Alappuzha to Kochi",
    origin: "alappuzha",
    destination: "kochi",
    departureTime: "01:00 PM",
    arrivalTime: "03:00 PM",
    duration: "2h 00m",
    fare: 150,
    availableSeats: 30,
    totalSeats: 45,
    amenities: [],
    image: "/images/non-ac-bus.png",
  },
]

export function BusListings({ origin, destination, date }) {
  const [expandedBus, setExpandedBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState({})
  const [filteredBusData, setFilteredBusData] = useState([])
  const router = useRouter()

  // Use a ref to track if we've already filtered the data
  const filterAppliedRef = useRef(false)
  const prevPropsRef = useRef({ origin, destination, date })

  // Filter buses based on search parameters - only when props change
  useEffect(() => {
    // Check if props have changed
    const propsChanged =
      prevPropsRef.current.origin !== origin ||
      prevPropsRef.current.destination !== destination ||
      prevPropsRef.current.date !== date

    // Only filter if props changed or we haven't filtered yet
    if (propsChanged || !filterAppliedRef.current) {
      let filtered = [...allBusData]

      if (origin) {
        filtered = filtered.filter((bus) => bus.origin === origin.toLowerCase())
      }

      if (destination) {
        filtered = filtered.filter((bus) => bus.destination === destination.toLowerCase())
      }

      // In a real app, we would also filter by date
      setFilteredBusData(filtered)
      filterAppliedRef.current = true
      prevPropsRef.current = { origin, destination, date }
    }
  }, [origin, destination, date])

  const toggleExpand = (busId) => {
    setExpandedBus(expandedBus === busId ? null : busId)
  }

  const handleSeatSelection = (busId, seats) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [busId]: seats,
    }))
  }

  const proceedToBooking = (busId) => {
    if (selectedSeats[busId]?.length > 0) {
      const bus = filteredBusData.find((b) => b.id === busId)
      const queryParams = new URLSearchParams({
        busId: busId.toString(),
        busType: bus?.type || "",
        route: bus?.route || "",
        departureTime: bus?.departureTime || "",
        seats: selectedSeats[busId].join(","),
        fare: ((bus?.fare || 0) * selectedSeats[busId].length).toString(),
      })

      router.push(`/confirm-booking?${queryParams.toString()}`)
    }
  }

  if (filteredBusData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No buses found</h3>
        <p className="text-gray-600 mb-4">
          We couldn't find any buses matching your search criteria. Please try different dates or destinations.
        </p>
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="No buses found"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {filteredBusData.map((bus) => (
        <div
          key={bus.id}
          className={`bg-white rounded-lg shadow-md border border-[#E0E0E0] overflow-hidden transition-all duration-300 ${
            expandedBus === bus.id ? "mb-8" : ""
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 p-4">
            <div className="md:col-span-1 mb-4 md:mb-0">
              <div className="relative h-32 md:h-full rounded-md overflow-hidden">
                <Image
                  src={bus.image || "/placeholder.svg?height=200&width=300"}
                  alt={bus.type}
                  fill
                  className="object-cover"
                />
                {bus.discount && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#FFB300] text-black font-medium">{bus.discount}</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-3 md:pl-4 flex flex-col">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[#2E7D32]">{bus.type}</h3>
                  <p className="text-sm text-gray-600">{bus.route}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{bus.fare}</p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-[#1A237E] mr-2" />
                  <div>
                    <p className="text-sm font-medium">{bus.departureTime}</p>
                    <p className="text-xs text-gray-500">Departure</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-[#1A237E] mr-2" />
                  <div>
                    <p className="text-sm font-medium">{bus.arrivalTime}</p>
                    <p className="text-xs text-gray-500">Arrival</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-[#1A237E] mr-2" />
                  <div>
                    <p className="text-sm font-medium">{bus.duration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between mt-auto">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                  {bus.amenities.includes("wifi") && <Wifi className="h-4 w-4 text-gray-500" title="WiFi" />}
                  {bus.amenities.includes("charging") && (
                    <BatteryCharging className="h-4 w-4 text-gray-500" title="Charging Points" />
                  )}
                  {bus.amenities.includes("water") && (
                    <Coffee className="h-4 w-4 text-gray-500" title="Water/Refreshments" />
                  )}
                  {bus.amenities.includes("entertainment") && (
                    <Award className="h-4 w-4 text-gray-500" title="Entertainment System" />
                  )}
                  <span className="text-sm text-gray-600">{bus.availableSeats} seats available</span>
                </div>

                <Button
                  variant="outline"
                  className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white"
                  onClick={() => toggleExpand(bus.id)}
                >
                  {expandedBus === bus.id ? "Hide Seats" : "View Seats"}
                </Button>
              </div>
            </div>
          </div>

          {expandedBus === bus.id && (
            <div className="border-t border-[#E0E0E0] p-4 bg-[#F9F9F9]">
              <div className="mb-4">
                <h4 className="font-medium text-[#1A237E] mb-2">Select Your Seats</h4>
                <SeatSelector
                  key={`seat-selector-${bus.id}`} // Force new instance for each bus
                  totalSeats={bus.totalSeats}
                  availableSeats={bus.availableSeats}
                  onSeatSelect={(seats) => handleSeatSelection(bus.id, seats)}
                  selectedSeats={selectedSeats[bus.id] || []}
                  busId={bus.id}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-[#E0E0E0]">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Selected:</span> {selectedSeats[bus.id]?.length || 0} seats
                  </p>
                  <p className="text-lg font-bold">
                    Total: ₹{((bus.fare || 0) * (selectedSeats[bus.id]?.length || 0)).toLocaleString()}
                  </p>
                </div>

                <Button
                  className="bg-[#FFB300] hover:bg-[#FFA000] text-black font-medium"
                  disabled={!selectedSeats[bus.id]?.length}
                  onClick={() => proceedToBooking(bus.id)}
                >
                  Proceed to Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
