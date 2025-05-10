"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { BookingHistoryCard } from "@/components/booking-history-card"

// Sample booking history data
const recentBookings = [
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
]

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

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
            <ProfileSidebar activePage="profile" />
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader className="bg-[#2E7D32]/10 border-b">
                <CardTitle className="text-[#2E7D32]">My Profile</CardTitle>
                <CardDescription>View and manage your personal information</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0">
                        <Image
                          src={user.profilePic || "/images/default-avatar.jpg"}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-[#1A237E]">{user.name}</h2>
                          <p className="text-gray-500">{user.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">{user.phone || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{user.address || "Not provided"}</p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            onClick={() => router.push("/profile/edit")}
                            className="bg-[#2E7D32] hover:bg-[#1B5E20]"
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F9F9F9] p-4 rounded-lg border border-[#E0E0E0] mt-6">
                      <h3 className="font-medium text-[#1A237E] mb-2">Account Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <p className="text-sm text-gray-500">Total Bookings</p>
                          <p className="text-2xl font-bold text-[#2E7D32]">12</p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <p className="text-sm text-gray-500">Upcoming Trips</p>
                          <p className="text-2xl font-bold text-[#FFB300]">1</p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <p className="text-sm text-gray-500">Reward Points</p>
                          <p className="text-2xl font-bold text-[#1A237E]">250</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bookings">
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <BookingHistoryCard key={booking.id} booking={booking} />
                      ))}

                      <div className="text-center pt-4">
                        <Button
                          variant="outline"
                          className="border-[#2E7D32] text-[#2E7D32]"
                          onClick={() => router.push("/profile/bookings")}
                        >
                          View All Bookings
                        </Button>
                      </div>
                    </div>
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
