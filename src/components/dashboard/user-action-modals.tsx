import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface User {
  id: string
  name: string
  email: string
  subscription: "free" | "paid"
  status: "active" | "suspended" | "banned"
}

interface UserActionModalsProps {
  user: User | null
  actionType: "suspend" | "reset" | "subscription" | null
  onClose: () => void
}

const UserActionModals =({ user, actionType, onClose }: UserActionModalsProps) => {
  const [reason, setReason] = useState("")
  const [newSubscription, setNewSubscription] = useState("")

  const handleSuspend = () => {
    // Handle suspend/unsuspend logic
    console.log(`${user?.status === "suspended" ? "Unsuspending" : "Suspending"} user:`, user?.id, "Reason:", reason)
    onClose()
    setReason("")
  }

  const handleResetPassword = () => {
    // Handle password reset logic
    console.log("Resetting password for user:", user?.id)
    onClose()
  }

  const handleSubscriptionChange = () => {
    // Handle subscription change logic
    console.log("Changing subscription for user:", user?.id, "to:", newSubscription)
    onClose()
    setNewSubscription("")
  }

  if (!user || !actionType) return null

  return (
    <>
      {/* Suspend/Unsuspend Modal */}
      <Dialog open={actionType === "suspend"} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.status === "suspended" ? "Unsuspend" : "Suspend"} User</DialogTitle>
            <DialogDescription>
              {user.status === "suspended"
                ? `Are you sure you want to unsuspend ${user.name}? They will regain access to their account.`
                : `Are you sure you want to suspend ${user.name}? They will lose access to their account.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason (optional)</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for this action..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={user.status === "suspended" ? "default" : "destructive"} onClick={handleSuspend}>
              {user.status === "suspended" ? "Unsuspend" : "Suspend"} User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Modal */}
      <Dialog open={actionType === "reset"} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              This will send a password reset email to {user.email} and force logout from all devices.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>Reset Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subscription Management Modal */}
      <Dialog open={actionType === "subscription"} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>
              Change the subscription plan for {user.name}. Current plan: {user.subscription}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subscription">New Subscription Plan</Label>
              <Select value={newSubscription} onValueChange={setNewSubscription}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free Plan</SelectItem>
                  <SelectItem value="basic">Basic Plan ($9.99/month)</SelectItem>
                  <SelectItem value="premium">Premium Plan ($19.99/month)</SelectItem>
                  <SelectItem value="enterprise">Enterprise Plan ($49.99/month)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubscriptionChange} disabled={!newSubscription}>
              Update Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


export default UserActionModals;