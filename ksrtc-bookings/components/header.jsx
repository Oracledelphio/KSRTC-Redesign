"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Globe, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import { motion } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth() || { user: null, logout: () => {} }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => {
    return pathname === path
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Book Tickets", path: "/bookings" },
    { name: "Schedules", path: "/schedules" },
    { name: "About KSRTC", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  // Determine if we're on the home page and at the top (for transparent header)
  const isHomeAndTop = pathname === "/" && !isScrolled

  // Set background color based on page and scroll position
  const headerBgClass = isHomeAndTop ? "bg-black/60 backdrop-blur-sm" : "bg-white shadow-md"

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/ksrtc-logo.jpg" alt="KSRTC Logo" width={50} height={50} className="mr-2" />
              <span
                className={`text-xl font-bold ${isHomeAndTop ? "text-white" : "text-[#2E7D32]"} hidden md:inline-block`}
              >
                Kerala RTC
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.path}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? isHomeAndTop
                        ? "text-white border-b-2 border-white"
                        : "text-[#2E7D32] border-b-2 border-[#2E7D32]"
                      : isHomeAndTop
                        ? "text-white/90 hover:text-white"
                        : "text-gray-700 hover:text-[#2E7D32]"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`hidden md:flex items-center ${isHomeAndTop ? "text-white" : "text-gray-700"}`}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span>English</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>മലയാളം</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex items-center ${isHomeAndTop ? "text-white" : "text-[#1A237E]"}`}
            >
              <Phone className="h-4 w-4 mr-1" />
              <span>Helpline</span>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hidden md:flex items-center gap-2 ${isHomeAndTop ? "text-white" : "text-gray-700"}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePic || "/placeholder.svg"} />
                      <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                    </Avatar>
                    <span>{user.name ? user.name.split(" ")[0] : "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/bookings" className="cursor-pointer">
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
                        className="h-4 w-4 mr-2"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                        <path d="m9 16 2 2 4-4" />
                      </svg>
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/settings" className="cursor-pointer">
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
                        className="h-4 w-4 mr-2"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className={`hidden md:flex items-center ${
                    isHomeAndTop
                      ? "border-white text-white hover:bg-white hover:text-[#2E7D32]"
                      : "border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white"
                  }`}
                >
                  <User className="h-4 w-4 mr-1" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isHomeAndTop ? "text-white" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="flex items-center">
              <Image src="/images/ksrtc-logo.png" alt="KSRTC Logo" width={40} height={40} className="mr-2" />
              <span className="text-lg font-bold text-[#2E7D32]">Kerala RTC</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-gray-700 hover:text-[#2E7D32] font-medium py-2 ${
                  isActive(link.path) ? "border-l-4 border-[#2E7D32] pl-2 text-[#2E7D32]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profilePic || "/placeholder.svg"} />
                      <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name || "User"}</p>
                      <p className="text-sm text-gray-500">{user.email || ""}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center py-2 text-gray-700 hover:text-[#2E7D32]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                  <Link
                    href="/profile/bookings"
                    className="flex items-center py-2 text-gray-700 hover:text-[#2E7D32]"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
                      className="h-4 w-4 mr-2"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                    My Bookings
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center py-2 text-gray-700 hover:text-[#2E7D32]"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                  </Link>
                  <Button
                    variant="ghost"
                    className="flex items-center w-full justify-start py-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-0"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="border-t pt-4 mt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full mt-2 border-[#2E7D32] text-[#2E7D32]">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            <div className="border-t pt-4 mt-2">
              <Button variant="outline" size="sm" className="w-full justify-start mb-2">
                <Globe className="h-4 w-4 mr-2" />
                <span>Switch to മലയാളം</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-[#1A237E]">
                <Phone className="h-4 w-4 mr-2" />
                <span>Helpline: 1800-599-1234</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
