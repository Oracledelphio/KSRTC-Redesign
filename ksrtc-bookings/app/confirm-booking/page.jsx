"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Landmark, Wallet, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ConfirmBookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const busId = searchParams.get("busId") || ""
  const busType = searchParams.get("busType") || ""
  const route = searchParams.get("route") || ""
  const departureTime = searchParams.get("departureTime") || ""
  const seats = searchParams.get("seats")?.split(",") || []
  const fare = searchParams.get("fare") || "0"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaymentMethodChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const goBack = () => {
    router.back()
  }

  const goToHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 text-[#2E7D32]" onClick={goBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bus Selection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-[#2E7D32]/10 border-b">
                <CardTitle className="text-[#2E7D32]">Confirm Your Booking</CardTitle>
                <CardDescription>Please review your travel details and complete passenger information</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Travel Details</h3>
                      <div className="bg-[#F9F9F9] p-4 rounded-lg border border-[#E0E0E0]">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Bus Type</p>
                            <p className="font-medium">{busType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Route</p>
                            <p className="font-medium">{route}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Departure</p>
                            <p className="font-medium">{departureTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Seats</p>
                            <p className="font-medium">{seats.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Passenger Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <p className="text-xs text-gray-500">
                            Your booking confirmation will be sent to this email address
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      <Tabs defaultValue="card" onValueChange={handlePaymentMethodChange}>
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="card" className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Card
                          </TabsTrigger>
                          <TabsTrigger value="upi" className="flex items-center">
                            <Landmark className="h-4 w-4 mr-2" />
                            UPI
                          </TabsTrigger>
                          <TabsTrigger value="cash" className="flex items-center">
                            <Wallet className="h-4 w-4 mr-2" />
                            Cash
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="card">
                          <div className="space-y-4 p-4 border rounded-lg">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="nameOnCard">Name on Card</Label>
                              <Input id="nameOnCard" />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="upi">
                          <div className="space-y-4 p-4 border rounded-lg">
                            <div className="space-y-2">
                              <Label htmlFor="upiId">UPI ID</Label>
                              <Input id="upiId" placeholder="yourname@upi" />
                              <p className="text-xs text-gray-500">Enter your UPI ID (e.g., name@okaxis, name@ybl)</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="cash">
                          <div className="p-4 border rounded-lg">
                            <RadioGroup defaultValue="boarding">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="boarding" id="boarding" />
                                <Label htmlFor="boarding">Pay cash on boarding</Label>
                              </div>
                              <p className="text-sm text-gray-500 mt-2">
                                Please arrive 30 minutes before departure with the exact amount
                              </p>
                            </RadioGroup>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-[#FFB300] hover:bg-[#FFA000] text-black font-medium h-12"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="bg-[#1A237E]/10 border-b">
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bus Type</span>
                    <span className="font-medium">{busType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium">{route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure</span>
                    <span className="font-medium">{departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats</span>
                    <span className="font-medium">{seats.join(", ")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Fare</span>
                    <span className="font-medium">₹{Number.parseInt(fare).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Fee</span>
                    <span className="font-medium">₹20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (5%)</span>
                    <span className="font-medium">₹{Math.round(Number.parseInt(fare) * 0.05).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#2E7D32]">
                      ₹{(Number.parseInt(fare) + 20 + Math.round(Number.parseInt(fare) * 0.05)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-[#F9F9F9] p-4 text-sm text-gray-600">
                <p>
                  By proceeding with this booking, you agree to KSRTC's{" "}
                  <a href="#" className="text-[#1A237E] underline">
                    terms and conditions
                  </a>
                  .
                </p>
              </CardFooter>
            </Card>

            <div className="mt-6 bg-white p-4 rounded-lg border border-[#E0E0E0]">
              <h4 className="font-medium mb-2 flex items-center text-[#2E7D32]">
                <CheckCircle className="h-4 w-4 mr-2" />
                Why Book with KSRTC?
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-[#FFB300] mr-2">•</span>
                  <span>Guaranteed seats with instant confirmation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB300] mr-2">•</span>
                  <span>Clean and well-maintained buses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB300] mr-2">•</span>
                  <span>Experienced and professional drivers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFB300] mr-2">•</span>
                  <span>Easy cancellation and refund policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Booking Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-[#2E7D32] flex items-center justify-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              Your booking has been confirmed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] my-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-medium">KSRTC{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bus Type</span>
                <span className="font-medium">{busType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Route</span>
                <span className="font-medium">{route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium">{departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats</span>
                <span className="font-medium">{seats.join(", ")}</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">
            A confirmation has been sent to your email and phone number
          </p>
          <div className="flex justify-center mt-4">
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]" onClick={goToHome}>
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
