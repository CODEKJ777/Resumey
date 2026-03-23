"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, LogOut, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [dataExport, setDataExport] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = () => {
    toast({
      title: "Success",
      description: "Logged out successfully (Class project demo)",
    })
    router.push("/")
  }

  const handleDeleteAccount = () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    toast({
      title: "Account Deletion",
      description: "Account deletion is being processed. This feature requires backend implementation.",
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully (Class project demo)",
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and preferences (Class Project Demo)
        </p>
      </div>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="size-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive updates about your resumes
              </p>
            </div>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Lock className="size-5" />
          Privacy & Security
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Password</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Change your password to keep your account secure
            </p>
            <Button variant="outline">Change Password</Button>
          </div>
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium">Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add an extra layer of security to your account
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Export Your Data</p>
              <p className="text-sm text-muted-foreground">
                Download all your resumes and data
              </p>
            </div>
            <Button variant="outline">Export as JSON</Button>
          </div>
          <div className="pt-4 border-t">
            <p className="font-medium text-sm mb-2">Danger Zone</p>
            <p className="text-sm text-muted-foreground mb-3">
              Delete your account and all associated data
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="gap-2"
            >
              <Trash2 className="size-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Session */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Session</h3>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2 w-full"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSaveSettings} className="flex-1">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
