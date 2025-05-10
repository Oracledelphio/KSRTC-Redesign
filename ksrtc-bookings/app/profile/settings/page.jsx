"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const { user, loading, deleteAccount } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    darkMode: false,
    language: "english",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))

    toast({
      title: "Setting Updated",
      description: "Your preference has been saved.",
    })
  }

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      toast({
        title: "Confirmation Failed",
        description: 'Please type "DELETE" to confirm account deletion.',
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await deleteAccount()
      setShowDeleteDialog(false)
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
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
            <ProfileSidebar activePage="settings" />
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader className="bg-[#2E7D32]/10 border-b">
                <CardTitle className="text-[#2E7D32]">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and settings</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-gray-500">Receive booking confirmations and updates via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications" className="font-medium">
                            SMS Notifications
                          </Label>
                          <p className="text-sm text-gray-500">Receive booking confirmations and updates via SMS</p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing-emails" className="font-medium">
                            Marketing Emails
                          </Label>
                          <p className="text-sm text-gray-500">Receive promotional offers and newsletters</p>
                        </div>
                        <Switch
                          id="marketing-emails"
                          checked={settings.marketingEmails}
                          onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor-auth" className="font-medium">
                            Two-Factor Authentication
                          </Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch
                          id="two-factor-auth"
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                        />
                      </div>

                      <div className="pt-2">
                        <Button variant="outline" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="dark-mode" className="font-medium">
                            Dark Mode
                          </Label>
                          <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                        </div>
                        <Switch
                          id="dark-mode"
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="language" className="font-medium">
                            Language
                          </Label>
                          <p className="text-sm text-gray-500">Select your preferred language</p>
                        </div>
                        <select
                          id="language"
                          className="rounded-md border border-gray-300 px-3 py-2"
                          value={settings.language}
                          onChange={(e) => handleSettingChange("language", e.target.value)}
                        >
                          <option value="english">English</option>
                          <option value="malayalam">Malayalam</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700 mb-4">
              To confirm, please type <span className="font-bold">DELETE</span> in the field below:
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="border-red-200"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isSubmitting || confirmText !== "DELETE"}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
