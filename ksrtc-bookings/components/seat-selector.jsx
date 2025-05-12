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
        const rowIndex = (busIdSeed + attempts * 7) % 4 // 4 rows: A to D
        const colIndex = (busIdSeed + attempts * 13) % 11 // 11 columns: 1 to 11

        const row = String.fromCharCode(65 + rowIndex) // A to D
        const col = colIndex + 1 // 1 to 11
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
    const rowsTop = ["A", "B"] // Top side (2 seats per column)
    const rowsBottom = ["C", "D"] // Bottom side (2 seats per column)
    const backRowSeats = ["A", "B", "C", "D"] // Back row (4 seats in column 11, aligned with A to D)
    const columns = Array.from({ length: 10 }, (_, i) => i + 1) // 10 columns for paired seats (1 to 10)
    const backColumn = 11 // Last column for the back row (column 11)

    return (
      <div className="flex flex-col items-center w-full">
        {/* Main seat layout */}
        <div className="flex flex-row space-x-6 justify-center">
          {/* Driver area on the left */}
          <div className="relative h-full w-10 bg-[#E0E0E0] rounded-l-lg flex items-center justify-center">
            <span className="text-sm font-medium -rotate-90 whitespace-nowrap">Driver</span>
          </div>

          <div className="flex flex-row space-x-6">
            {columns.map((col) => (
              <div key={col} className="flex flex-col space-y-2">
                {/* Top side: 2 seats (rows A and B) */}
                <div className="flex flex-col space-y-2">
                  {rowsTop.map((row) => {
                    const seat = `${row}${col}`
                    const isSelected = localSelectedSeats.includes(seat)
                    const isOccupied = occupiedSeats.includes(seat)

                    return (
                      <button
                        key={seat}
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
                    )
                  })}
                </div>

                {/* Aisle gap */}
                <div className="h-6"></div>

                {/* Bottom side: 2 seats (rows C and D) */}
                <div className="flex flex-col space-y-2">
                  {rowsBottom.map((row) => {
                    const seat = `${row}${col}`
                    const isSelected = localSelectedSeats.includes(seat)
                    const isOccupied = occupiedSeats.includes(seat)

                    return (
                      <button
                        key={seat}
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
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Back row (column 11, seats A11 to D11) */}
            <div className="flex flex-col space-y-2">
              {backRowSeats.map((row) => {
                const seat = `${row}${backColumn}`
                const isSelected = localSelectedSeats.includes(seat)
                const isOccupied = occupiedSeats.includes(seat)

                return (
                  <button
                    key={seat}
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
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-row items-center justify-center space-x-6 mt-4">
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