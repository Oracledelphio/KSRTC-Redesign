"use client"

import { useState, useEffect, useRef } from "react"
import { CalendarIcon, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export function BookingForm({ onSearch, initialValues = {} }) {
  // Use refs to track if we've already initialized from props
  const initializedRef = useRef(false)

  const [formState, setFormState] = useState({
    date: null,
    origin: "",
    destination: "",
    isFormValid: false,
  })

  // Set initial values if provided - only run once
  useEffect(() => {
    if (initializedRef.current) return

    const newState = {
      date: initialValues.date || null,
      origin: initialValues.origin || "",
      destination: initialValues.destination || "",
    }

    setFormState((prev) => ({
      ...prev,
      ...newState,
      isFormValid: !!(newState.origin && newState.destination && newState.date),
    }))

    initializedRef.current = true
  }, [initialValues])

  // Update form validity when inputs change
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      isFormValid: !!(prev.origin && prev.destination && prev.date),
    }))
  }, [formState.origin, formState.destination, formState.date])

  const handleOriginChange = (value) => {
    setFormState((prev) => ({ ...prev, origin: value }))
  }

  const handleDestinationChange = (value) => {
    setFormState((prev) => ({ ...prev, destination: value }))
  }

  const handleDateChange = (newDate) => {
    setFormState((prev) => ({ ...prev, date: newDate }))
  }

  const handleSearch = () => {
    if (formState.isFormValid && onSearch) {
      onSearch({
        origin: formState.origin,
        destination: formState.destination,
        date: formState.date,
      })
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">From</label>
          <Select value={formState.origin} onValueChange={handleOriginChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
              <SelectItem value="kochi">Kochi</SelectItem>
              <SelectItem value="kozhikode">Kozhikode</SelectItem>
              <SelectItem value="kollam">Kollam</SelectItem>
              <SelectItem value="thrissur">Thrissur</SelectItem>
              <SelectItem value="kannur">Kannur</SelectItem>
              <SelectItem value="alappuzha">Alappuzha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">To</label>
          <Select value={formState.destination} onValueChange={handleDestinationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
              <SelectItem value="kochi">Kochi</SelectItem>
              <SelectItem value="kozhikode">Kozhikode</SelectItem>
              <SelectItem value="kollam">Kollam</SelectItem>
              <SelectItem value="thrissur">Thrissur</SelectItem>
              <SelectItem value="kannur">Kannur</SelectItem>
              <SelectItem value="alappuzha">Alappuzha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !formState.date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formState.date ? format(formState.date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={formState.date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Options</SheetTitle>
              <SheetDescription>Refine your search with these filters</SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Bus Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ac-volvo" />
                    <Label htmlFor="ac-volvo">AC Volvo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ac-scania" />
                    <Label htmlFor="ac-scania">AC Scania</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="super-deluxe" />
                    <Label htmlFor="super-deluxe">Super Deluxe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="non-ac" />
                    <Label htmlFor="non-ac">Non-AC</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Departure Time</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="morning" />
                    <Label htmlFor="morning">Morning (6 AM - 12 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="afternoon" />
                    <Label htmlFor="afternoon">Afternoon (12 PM - 4 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="evening" />
                    <Label htmlFor="evening">Evening (4 PM - 8 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="night" />
                    <Label htmlFor="night">Night (8 PM - 6 AM)</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="wifi" />
                    <Label htmlFor="wifi">Wi-Fi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="charging-point" />
                    <Label htmlFor="charging-point">Charging Points</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="water-bottle" />
                    <Label htmlFor="water-bottle">Water Bottle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="blanket" />
                    <Label htmlFor="blanket">Blanket</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20]">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Button
        className="w-full md:w-auto bg-[#FFB300] hover:bg-[#FFA000] text-black font-medium"
        onClick={handleSearch}
        disabled={!formState.isFormValid}
      >
        Search Buses
      </Button>
    </motion.div>
  )
}
