"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Calendar, Settings, LogOut, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export function ProfileSidebar({ activePage }) {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-5 w-5 mr-2" />,
      id: "profile",
    },
    {
      name: "My Bookings",
      path: "/profile/bookings",
      icon: <Calendar className="h-5 w-5 mr-2" />,
      id: "bookings",
    },
    {
      name: "Payment Methods",
      path: "/profile/payments",
      icon: <CreditCard className="h-5 w-5 mr-2" />,
      id: "payments",
    },
    {
      name: "Settings",
      path: "/profile/settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      id: "settings",
    },
    {
      name: "Help & Support",
      path: "/profile/support",
      icon: <HelpCircle className="h-5 w-5 mr-2" />,
      id: "support",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-[#1A237E] text-white">
        <h2 className="font-bold text-lg">Account Menu</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activePage === item.id
                    ? "bg-[#2E7D32] text-white"
                    : "text-gray-700 hover:bg-[#2E7D32]/10 hover:text-[#2E7D32]"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="pt-4 mt-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  )
}
