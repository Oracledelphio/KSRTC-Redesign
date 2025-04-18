"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Custom Button Component
  const CustomButton = ({ className, children, onClick, variant = "solid" }) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
    const variantStyles = variant === "solid" ? "bg-[#2E7D32] hover:bg-[#1B5E20] text-white" : "border border-[#2E7D32] text-black hover:bg-[#E0E0E0]"; // Changed text to black for outline variant
    return (
      <button className={`${baseStyles} ${variantStyles} ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  };

  // Custom Input Component
  const CustomInput = ({ className, placeholder, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${className}`}
    />
  );

  // Custom Select Component
  const CustomSelect = ({ children, onChange, value }) => (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
      onChange={onChange}
      value={value || ""}
    >
      {Array.isArray(children)
        ? children
        : [children].filter(Boolean).map((child, index) => (
            <option key={index} value={child.props.value}>
              {child.props.children}
            </option>
          ))}
    </select>
  );

  // Custom Option Component
  const CustomOption = ({ value, children }) => {
    return <option value={value}>{children}</option>;
  };

  // Custom Calendar Component
  const CustomCalendar = ({ selected, onSelect }) => {
    const handleDateChange = (e) => {
      onSelect(new Date(e.target.value));
    };
    return (
      <input
        type="date"
        value={selected ? selected.toISOString().split("T")[0] : ""}
        onChange={handleDateChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
      />
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos_symbols/ksrtc_logo.png"
                alt="KSRTC Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="hidden font-bold text-[#2E7D32] md:inline-block">
                Kerala State Road Transport Corporation
              </span>
              <span className="font-bold text-[#2E7D32] md:hidden">KSRTC</span>
            </Link>
          </div>
          <nav
            className={`${isMenuOpen ? "absolute inset-x-0 top-16 z-50 mt-px bg-white pb-6 shadow-lg md:static md:z-auto md:mt-0 md:bg-transparent md:pb-0 md:shadow-none" : "hidden md:block"}`}
          >
            <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <li>
                <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2E7D32]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2E7D32]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2E7D32]">
                  Routes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2E7D32]">
                  Fares
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2E7D32]">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#2E7D32]">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <CustomButton
              variant="outline"
              className="rounded-full"
              onClick={() => {}}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 013-1.732M3.055 11.05l-1.216.416A2 2 0 001 13.5V15.5"
                />
              </svg>
              <span className="sr-only">Toggle language</span>
            </CustomButton>
            <CustomButton className="hidden bg-[#FFB300] text-black hover:bg-[#FFA000] md:inline-flex">
              Login
            </CustomButton>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Video */}
        <section className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/kerala_bg.webm" type="video/webm" />
              <img
                src="/placeholder.svg?height=800&width=1600"
                alt="Hero Background Fallback"
                className="w-full h-full object-cover"
              />
            </video>
            <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay for contrast */}
          </div>
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Explore Kerala with KSRTC
                  </h1>
                  <p className="mt-4 max-w-xl text-lg text-gray-200">
                    Connecting destinations, creating memories. Experience safe, reliable, and comfortable travel across
                    God's Own Country.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <CustomButton className="bg-[#FFB300] text-black hover:bg-[#FFA000]">
                    Book Now
                  </CustomButton>
                  <CustomButton variant="outline">
                    Explore Routes
                  </CustomButton>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#2E7D32]">Book Your Ticket</h2>
                <div className="w-full">
                  <div className="grid w-full grid-cols-2 mb-4">
                    <button className="px-4 py-2 border-b-2 border-transparent hover:border-[#2E7D32] focus:border-[#2E7D32] text-gray-700">One Way</button>
                    <button className="px-4 py-2 border-b-2 border-transparent hover:border-[#2E7D32] focus:border-[#2E7D32] text-gray-700">Round Trip</button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">From</label>
                        <div className="relative">
                          <svg
                            className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <CustomInput placeholder="Departure City" className="pl-8" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">To</label>
                        <div className="relative">
                          <svg
                            className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <CustomInput placeholder="Arrival City" className="pl-8" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">Date of Journey</label>
                        <CustomCalendar selected={null} onSelect={() => {}} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">Bus Type</label>
                        <CustomSelect onChange={(e) => {}}>
                          <CustomOption value="">Select bus type</CustomOption>
                          <CustomOption value="all">All Types</CustomOption>
                          <CustomOption value="super-deluxe">Super Deluxe</CustomOption>
                          <CustomOption value="volvo">Volvo</CustomOption>
                          <CustomOption value="scania">Scania</CustomOption>
                          <CustomOption value="ordinary">Ordinary</CustomOption>
                        </CustomSelect>
                      </div>
                    </div>
                    <CustomButton className="w-full bg-[#FFB300] text-black hover:bg-[#FFA000]">
                      Search Buses
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discount Offers Section */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Special Offers</h2>
                <p className="mt-2 text-gray-600">Exclusive discounts for your journey</p>
              </div>
              <Link href="#" className="flex items-center text-[#2E7D32] hover:underline">
                View all offers <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="absolute right-2 top-2 rounded-full bg-[#FFB300] px-2 py-1 text-xs font-bold text-black">
                  30% OFF
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">Volvo/Scania Discount</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Enjoy 30% off on all Volvo and Scania buses for weekend travel. Limited time offer.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-[#2E7D32]">
                    <span>Use code: </span>
                    <span className="ml-1 font-bold">WEEKEND30</span>
                  </div>
                  <CustomButton className="mt-4 w-full">Book Now</CustomButton>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="absolute right-2 top-2 rounded-full bg-[#FFB300] px-2 py-1 text-xs font-bold text-black">
                  20% OFF
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">Student Special</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Students get 20% off on all bus types. Valid student ID required at boarding.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-[#2E7D32]">
                    <span>Use code: </span>
                    <span className="ml-1 font-bold">STUDENT20</span>
                  </div>
                  <CustomButton className="mt-4 w-full">Book Now</CustomButton>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="absolute right-2 top-2 rounded-full bg-[#FFB300] px-2 py-1 text-xs font-bold text-black">
                  15% OFF
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">Senior Citizen Offer</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Senior citizens enjoy 15% discount on all routes. ID proof required.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-[#2E7D32]">
                    <span>Use code: </span>
                    <span className="ml-1 font-bold">SENIOR15</span>
                  </div>
                  <CustomButton className="mt-4 w-full">Book Now</CustomButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City Circular Service */}
        <section className="bg-[#F5F5F5] py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full bg-[#E0E0E0] px-3 py-1 text-sm font-medium text-[#2E7D32]">
                  New Service
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">City Circular Service</h2>
                <p className="text-gray-600">
                  Explore the city with our convenient circular service. Hop on and off at any designated stop with a
                  single ticket valid for the entire day.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Frequent service every 15 minutes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Covers all major attractions and business hubs</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Affordable day passes with unlimited rides</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Eco-friendly electric buses</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <CustomButton>View Routes</CustomButton>
                  <CustomButton variant="outline">Buy Day Pass</CustomButton>
                </div>
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-lg sm:h-[400px] lg:h-full">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="City Circular Bus Service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About KSRTC */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About KSRTC</h2>
              <p className="mt-4 text-gray-600">
                Kerala State Road Transport Corporation (KSRTC) is the state-owned road transport corporation in the
                Indian state of Kerala. Founded in 1938, it is one of the oldest state-operated public transport
                utilities in India.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                <div className="rounded-lg bg-[#F5F5F5] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 10h18" />
                      <path d="M12 7v5l4 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Legacy</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Over 85 years of service excellence and trusted transportation across Kerala.
                  </p>
                </div>
                <div className="rounded-lg bg-[#F5F5F5] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                      <path d="M8 2v20" />
                      <path d="M16 2v20" />
                      <path d="M3 10h18" />
                      <path d="M3 14h18" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Network</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Extensive network covering every corner of Kerala and connecting to neighboring states.
                  </p>
                </div>
                <div className="rounded-lg bg-[#F5F5F5] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Sustainability</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Committed to reducing carbon footprint with eco-friendly fleet and practices.
                  </p>
                </div>
              </div>
              <CustomButton className="mt-8">Learn More About Our History</CustomButton>
            </div>
          </div>
        </section>

        {/* Travel Information */}
        <section className="bg-[#F5F5F5] py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Travel Information
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 19v-3a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V6" />
                    <path d="M12 19v-3a2 2 0 0 0-2-2H4a2 2 0 0 1-2-2V6" />
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="18" r="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Routes & Schedules</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Find detailed information about our routes, timings, and frequency of services.
                </p>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#2E7D32] hover:underline"
                >
                  View Routes <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Fare Information</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Check fare details for different bus types and routes across Kerala.
                </p>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#2E7D32] hover:underline"
                >
                  View Fares <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 6v6" />
                    <path d="M16 6v6" />
                    <path d="M2 12h20" />
                    <path d="M18 18h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
                    <circle cx="8" cy="18" r="2" />
                    <circle cx="16" cy="18" r="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Bus Types</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore our fleet of buses from ordinary services to premium Volvo and Scania buses.
                </p>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#2E7D32] hover:underline"
                >
                  View Bus Types <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Travel Guidelines</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Important information for passengers including baggage policy and travel regulations.
                </p>
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#2E7D32] hover:underline"
                >
                  Read Guidelines <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Support Section */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
                <p className="mt-4 text-gray-600">
                  We're here to help with any questions or concerns about your journey.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">Helpline</h3>
                      <p className="mt-1 text-gray-600">24/7 Customer Support</p>
                      <a href="tel:+918547639100" className="mt-1 block text-[#2E7D32] hover:underline">
                        +91 854 763 9100
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">Complaint Registration</h3>
                      <p className="mt-1 text-gray-600">Report issues or provide feedback</p>
                      <a
                        href="mailto:complaints@ksrtc.kerala.gov.in"
                        className="mt-1 block text-[#2E7D32] hover:underline"
                      >
                        complaints@ksrtc.kerala.gov.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0E0E0] text-[#2E7D32]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">General Inquiries</h3>
                      <p className="mt-1 text-gray-600">For information and assistance</p>
                      <a href="mailto:info@ksrtc.kerala.gov.in" className="mt-1 block text-[#2E7D32] hover:underline">
                        info@ksrtc.kerala.gov.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-[#F5F5F5] p-6">
                <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>
                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none text-gray-700">Name</label>
                      <CustomInput placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none text-gray-700">Email</label>
                      <CustomInput type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-gray-700">Subject</label>
                    <CustomInput placeholder="Message subject" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-gray-700">Message</label>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <CustomButton className="w-full">Send Message</CustomButton>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#1A237E] py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Experience the comfort of travel with KSRTC
              </h2>
              <p className="mt-4 text-lg text-gray-200">
                Book your tickets now and enjoy a seamless journey across Kerala.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CustomButton className="bg-[#FFB300] text-black hover:bg-[#FFA000]">
                  Book Your Ticket
                </CustomButton>
                <CustomButton variant="outline">Download Mobile App</CustomButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2E7D32] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Book Tickets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Check PNR Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Cancel Tickets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Track Bus
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    About KSRTC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 transition-colors hover:text-white hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="mr-2 mt-0.5 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-200">
                    Transport Bhavan, Fort, Thiruvananthapuram, Kerala - 695023
                  </span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href="tel:+918547639100" className="text-sm text-gray-200 hover:text-white hover:underline">
                    +91 854 763 9100
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a
                    href="mailto:info@ksrtc.kerala.gov.in"
                    className="text-sm text-gray-200 hover:text-white hover:underline"
                  >
                    info@ksrtc.kerala.gov.in
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="rounded-full bg-white p-2 text-[#2E7D32] transition-colors hover:bg-gray-200">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-white p-2 text-[#2E7D32] transition-colors hover:bg-gray-200">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M23 3a10.9 10.9 0 01-3.14 2.6 4.75 4.75 0 00-8.05 3.33A13.49 13.49 0 011.57 4.42a4.75 4.75 0 001.46 6.32 4.72 4.72 0 01-2.15-.59v.06a4.75 4.75 0 003.81 4.65A4.75 4.75 0 012 13.38a9.65 9.65 0 005.71 1.71c6.85 0 10.6-5.68 10.6-10.6l-.05-.48A7.48 7.48 0 0023 3z"
                    />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-white p-2 text-[#2E7D32] transition-colors hover:bg-gray-200">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-white p-2 text-[#2E7D32] transition-colors hover:bg-gray-200">
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 15.02l5.58-3.02-5.58-3.03v6.05z"
                    />
                  </svg>
                </a>
              </div>
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-semibold text-gray-200">Download Our App</h4>
                <div className="flex space-x-2">
                  <a href="#" className="block">
                    <Image
                      src="/placeholder.svg?height=40&width=120"
                      alt="Get it on Google Play"
                      width={120}
                      height={40}
                      className="h-10"
                    />
                  </a>
                  <a href="#" className="block">
                    <Image
                      src="/placeholder.svg?height=40&width=120"
                      alt="Download on App Store"
                      width={120}
                      height={40}
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-gray-200">
              © {new Date().getFullYear()} Kerala State Road Transport Corporation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}