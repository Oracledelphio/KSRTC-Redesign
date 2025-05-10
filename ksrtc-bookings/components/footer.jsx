import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A237E] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/images/ksrtc-logo.png" alt="KSRTC Logo" width={50} height={50} className="mr-2" />
              <span className="text-xl font-bold">Kerala RTC</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Kerala State Road Transport Corporation (KSRTC) is a state-owned road transport corporation in the Indian
              state of Kerala.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Book Tickets
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Schedules
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Track Bus
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Cancellations & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  About KSRTC
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  City Circular
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Interstate Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Premium Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Bus Hire
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white text-sm">
                  Cargo Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-[#FFB300]" />
                <span className="text-sm text-gray-300">
                  Transport Bhavan, Fort P.O
                  <br />
                  Thiruvananthapuram, Kerala
                  <br />
                  PIN: 695023
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#FFB300]" />
                <span className="text-sm text-gray-300">1800-599-1234 (Toll Free)</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#FFB300]" />
                <span className="text-sm text-gray-300">info@keralartc.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Kerala State Road Transport Corporation. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
