"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

export default function ProfileEditPage() {
  const { user, loading, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      })
      setProfileImagePreview(user.profilePic || "")
    }
  }, [user, loading, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would upload the image to a server
      // and get back a URL. Here we're just using the preview.
      const updatedData = {
        ...formData,
        profilePic: profileImagePreview || user.profilePic,
      }

      await updateProfile(updatedData)

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E7D32]"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar activePage="profile" />
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader className="bg-[#2E7D32]/10 border-b">
                <CardTitle className="text-[#2E7D32]">Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                    <div className="text-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
                        <Image
                          src={profileImagePreview || user.profilePic || "/images/default-avatar.jpg"}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <Label
                          htmlFor="profile-image"
                          className="cursor-pointer bg-[#1A237E] text-white px-3 py-1 rounded-md hover:bg-[#0D1B60] transition-colors"
                        >
                          Change Photo
                        </Label>
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/profile")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#2E7D32] hover:bg-[#1B5E20]" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
