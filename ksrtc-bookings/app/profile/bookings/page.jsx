"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { BookingHistoryCard } from "@/components/booking-history-card"

// Sample booking history data
const bookingHistory = [
  {
    id: "BK12345",
    date: "2023-05-15",
    from: "Thiruvananthapuram",
    to: "Kochi",
    busType: "AC Volvo",
    departureTime: "07:30 AM",
    seats: ["A3", "A4"],
    status: "completed",
    amount: 1500,
  },
  {
    id: "BK12346",
    date: "2023-06-20",
    from: "Kochi",
    to: "Kozhikode",
    busType: "AC Scania",
    departureTime: "09:00 AM",
    seats: ["B5"],
    status: "upcoming",
    amount: 850,
  },
  {
    id: "BK12347",
    date: "2023-04-10",
    from: "Kozhikode",
    to: "Thrissur",
    busType: "Super Deluxe",
    departureTime: "10:00 PM",
    seats: ["C7", "C8"],
    status: "completed",
    amount: 1300,
  },
  {
    id: "BK12348",
    date: "2023-03-05",
    from: "Kochi",
    to: "Thiruvananthapuram",
    busType: "AC Volvo",
    departureTime: "08:30 AM",
    seats: ["D2"],
    status: "completed",
    amount: 750,
  },
  {
    id: "BK12349",
    date: "2023-07-25",
    from: "Thrissur",
    to: "Kozhikode",
    busType: "Non-AC",
    departureTime: "02:30 PM",
    seats: ["A9"],
    status: "upcoming",
    amount: 350,
  },
  {
    id: "BK12350",
    date: "2023-02-18",
    from: "Thiruvananthapuram",
    to: "Alappuzha",
    busType: "Super Deluxe",
    departureTime: "11:00 AM",
    seats: ["B3", "B4"],
    status: "cancelled",
    amount: 1100,
  },
]

export default function BookingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [filteredBookings, setFilteredBookings] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredBookings(bookingHistory)
    } else {
      setFilteredBookings(bookingHistory.filter((booking) => booking.status === activeTab))
    }
  }, [activeTab])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E7D32]"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar activePage="bookings" />
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader className="bg-[#2E7D32]/10 border-b">
                <CardTitle className="text-[#2E7D32]">My Bookings</CardTitle>
                <CardDescription>View and manage your booking history</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => <BookingHistoryCard key={booking.id} booking={booking} />)
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No {activeTab !== "all" ? activeTab : ""} bookings found.</p>
                        <Button
                          className="mt-4 bg-[#2E7D32] hover:bg-[#1B5E20]"
                          onClick={() => router.push("/bookings")}
                        >
                          Book a Trip
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
