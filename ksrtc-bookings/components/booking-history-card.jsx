import { format, parseISO } from "date-fns"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function BookingHistoryCard({ booking }) {
  const formattedDate = format(parseISO(booking.date), "dd MMM yyyy")

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <div className="flex items-center mb-1">
              <h3 className="font-bold text-[#1A237E]">{booking.busType}</h3>
              <Badge className={`ml-2 ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>{booking.from}</span>
              <ArrowRight className="h-3 w-3 mx-1" />
              <span>{booking.to}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="font-medium">{booking.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-start">
            <Calendar className="h-4 w-4 text-[#2E7D32] mt-0.5 mr-1" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-4 w-4 text-[#2E7D32] mt-0.5 mr-1" />
            <div>
              <p className="text-xs text-gray-500">Departure</p>
              <p className="text-sm font-medium">{booking.departureTime}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Seats</p>
            <p className="text-sm font-medium">{booking.seats.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-sm font-medium">₹{booking.amount}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {booking.status === "upcoming" && (
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              Cancel
            </Button>
          )}
          <Button variant="outline" size="sm" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
            View Details
          </Button>
          {booking.status === "completed" && (
            <Button variant="outline" size="sm" className="border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E]/10">
              Download Ticket
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
