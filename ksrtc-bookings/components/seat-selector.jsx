"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function SeatSelector({ totalSeats, availableSeats, onSeatSelect, selectedSeats = [], busId }) {
  const [localSelectedSeats, setLocalSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const onSeatSelectRef = useRef(onSeatSelect)
  const initializedRef = useRef(false)
  const busIdRef = useRef(busId)

  // Update ref when onSeatSelect changes
  useEffect(() => {
    onSeatSelectRef.current = onSeatSelect
  }, [onSeatSelect])

  // Initialize component once
  useEffect(() => {
    // Skip if already initialized with this busId
    if (initializedRef.current && busIdRef.current === busId) {
      return
    }

    // Update busId ref
    busIdRef.current = busId

    // Set local selected seats from props
    setLocalSelectedSeats(selectedSeats || [])

    // Generate occupied seats only once per busId
    const generateOccupiedSeats = () => {
      const occupied = []
      const unavailableCount = totalSeats - availableSeats

      // Create a set of already selected seats for faster lookup
      const selectedSeatsSet = new Set(selectedSeats)

      // Use a deterministic approach based on busId to generate the same seats each time
      const busIdSeed = busId * 1000

      let attempts = 0
      while (occupied.length < unavailableCount && attempts < 100) {
        attempts++
        // Use busId in the calculation to make it deterministic
        const rowIndex = (busIdSeed + attempts * 7) % 4
        const colIndex = (busIdSeed + attempts * 13) % 10

        const row = String.fromCharCode(65 + rowIndex) // A to D
        const col = colIndex + 1 // 1 to 10
        const seat = `${row}${col}`

        if (!occupied.includes(seat) && !selectedSeatsSet.has(seat)) {
          occupied.push(seat)
        }
      }

      return occupied
    }

    setOccupiedSeats(generateOccupiedSeats())
    initializedRef.current = true
  }, [busId, totalSeats, availableSeats, selectedSeats])

  // Handle seat toggle
  const toggleSeat = (seat) => {
    setLocalSelectedSeats((prev) => {
      const newSelected = prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]

      // Call the parent callback outside of render cycle
      setTimeout(() => {
        if (onSeatSelectRef.current) {
          onSeatSelectRef.current(newSelected)
        }
      }, 0)

      return newSelected
    })
  }

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D"]
    const cols = Array.from({ length: 10 }, (_, i) => i + 1)

    return (
      <div className="flex flex-col space-y-2">
        <div className="relative w-full h-10 mb-4 bg-[#E0E0E0] rounded-t-lg flex items-center justify-center">
          <span className="text-sm font-medium">Driver</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {rows.map((row) =>
            cols.map((col) => {
              const seat = `${row}${col}`
              const isSelected = localSelectedSeats.includes(seat)
              const isOccupied = occupiedSeats.includes(seat)

              // Add aisle after every 2 seats
              const isAisle = col === 2 || col === 8

              return (
                <div key={seat} className={cn("flex items-center justify-center", isAisle && "col-span-1")}>
                  {isAisle ? (
                    <div className="w-4"></div>
                  ) : (
                    <button
                      type="button"
                      className={cn(
                        "w-8 h-8 rounded-md text-xs font-medium flex items-center justify-center transition-colors",
                        isSelected && "bg-[#2E7D32] text-white",
                        isOccupied && "bg-gray-300 text-gray-500 cursor-not-allowed",
                        !isSelected &&
                          !isOccupied &&
                          "bg-white border border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10",
                      )}
                      onClick={() => !isOccupied && toggleSeat(seat)}
                      disabled={isOccupied}
                    >
                      {seat}
                    </button>
                  )}
                </div>
              )
            }),
          )}
        </div>

        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-white border border-[#2E7D32] mr-2"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-[#2E7D32] mr-2"></div>
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-gray-300 mr-2"></div>
            <span className="text-xs">Occupied</span>
          </div>
        </div>
      </div>
    )
  }

  return <div className="bg-white p-4 rounded-md border border-[#E0E0E0]">{renderSeats()}</div>
}
