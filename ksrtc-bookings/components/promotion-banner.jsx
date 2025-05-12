import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

export function PromotionBanner() {
  return (
    <div className="mt-8 space-y-4">
      <Alert className="bg-gradient-to-r from-[#2E7D32]/10 to-[#1A237E]/5 border-[#FFB300]">
        <AlertCircle className="h-4 w-4 text-[#FFB300]" />
        <AlertTitle className="text-[#2E7D32] font-medium">Special Offer!</AlertTitle>
        <AlertDescription>
          Enjoy 30% off on all Scania/Volvo buses for weekend travel. Use code: WEEKEND30
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[#E0E0E0] flex">
          <div className="w-1/3 relative">
            <Image src="/bus-circular.jpg" alt="City Circular Service" fill className="object-cover" />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="font-bold text-[#1A237E]">City Circular Service</h3>
            <p className="text-sm text-gray-600 mt-1">
              Explore the city with our convenient circular service. Hourly departures from major landmarks.
            </p>
            <button className="mt-2 text-sm font-medium text-[#2E7D32] hover:underline">View Routes →</button>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-[#E0E0E0] flex">
          <div className="w-1/3 relative">
            <Image src="/premium-bus.jpg" alt="Premium Service" fill className="object-cover" />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="font-bold text-[#1A237E]">Premium Services</h3>
            <p className="text-sm text-gray-600 mt-1">
              Travel in luxury with our premium fleet. Extra legroom, refreshments, and priority boarding.
            </p>
            <button className="mt-2 text-sm font-medium text-[#2E7D32] hover:underline">Learn More →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
