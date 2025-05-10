"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Priya Menon",
    location: "Kochi",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    text: "I've been using KSRTC services for years, and the recent improvements in the booking system have made it even better. The buses are clean, punctual, and the staff is always helpful.",
  },
  {
    id: 2,
    name: "Rahul Nair",
    location: "Thiruvananthapuram",
    image: "/images/testimonial-2.jpg",
    rating: 4,
    text: "The online booking system is very convenient. I can easily book tickets for my weekly trips between Thiruvananthapuram and Kochi. The Super Deluxe buses are comfortable for long journeys.",
  },
  {
    id: 3,
    name: "Anjali Thomas",
    location: "Kozhikode",
    image: "/images/testimonial-3.jpg",
    rating: 5,
    text: "As a frequent traveler, I appreciate the reliability of KSRTC services. The new AC Volvo buses are excellent, and the online booking system saves me a lot of time.",
  },
  {
    id: 4,
    name: "Mohammed Salim",
    location: "Thrissur",
    image: "/images/testimonial-4.jpg",
    rating: 4,
    text: "The city circular service is a blessing for daily commuters like me. The buses are regular and the routes cover all major landmarks in the city.",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E7D32]">What Our Passengers Say</h2>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied passengers about their experience with KSRTC services
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-[#F5F5F5] rounded-xl p-8 shadow-md">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-[#FFB300] fill-[#FFB300]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                        <h4 className="font-bold text-[#1A237E]">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full bg-white shadow-md border-gray-200 hover:bg-gray-100"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full bg-white shadow-md border-gray-200 hover:bg-gray-100"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === activeIndex ? "bg-[#2E7D32]" : "bg-gray-300"}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
