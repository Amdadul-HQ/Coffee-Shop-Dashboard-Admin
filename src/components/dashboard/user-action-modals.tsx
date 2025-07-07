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
import { useForceLogoutMutation, useGetUserDetailsQuery, useResetPasswordMutation, useUserSuspendMutation, useUserUnSuspendMutation } from "../../redux/features/admin/adminManagementApi"
import UserDetail from "./user-detail"
import { toast } from "sonner"

interface User {
  id: string;
  name: string;
  email: string;
  subscriptionPlan: "free" | "paid";
  createdAt: string;
  lastActivity: string;
  isSuspend: boolean;
  ratings: number;
  notes: number;
  favorites: number;
}


type TActionType = "view" | "suspend" | "reset" | "subscription"| "Unsuspend" | "force-logout" | null


interface UserActionModalsProps {
  user: User | null
  actionType: TActionType
  onClose: () => void
  setActionType: any
}

const UserActionModals =({ user, actionType, onClose,setActionType }: UserActionModalsProps) => {
  const [reason, setReason] = useState("")
  const [suspendUser, { isLoading }] = useUserSuspendMutation();
  const [unSuspenndUser,{isLoading:unSuspendingLoading}] = useUserUnSuspendMutation();
  const [forceLogout,{isLoading:forceLogoutLoading}] = useForceLogoutMutation()
  const [resetPassword,{isLoading:resetPassowrdLoading}] = useResetPasswordMutation();

  const [newSubscription, setNewSubscription] = useState("")
  const handleSuspend = async () => {
    // Handle suspend/unsuspend logic
    if(user?.id && actionType === "suspend"){
      const res = await suspendUser({ id: user.id }).unwrap();
      console.log("Suspended user:", res);
      if(res?.success){
        toast.success(`${user.name} is Suspended Successfully`)
      }
    }

    if(user?.id && actionType === "Unsuspend") {
      const res = await unSuspenndUser({ id: user.id }).unwrap();
      console.log("UnSuspended user:", res);
      if(res?.success){
        toast.success(`${user.name} is UnSuspended Successfully`)
      }
    }

    // console.log(`${user?.isSuspend === "suspended" ? "Unsuspending" : "Suspending"} user:`, user?.id, "Reason:", reason)
    onClose()
    setReason("")
  }

  const handleResetPassword =async () => {

    // force logout
    if(user?.id && actionType === "force-logout"){
      const res = await forceLogout({id:user.id})
    if(res?.data?.success){
      toast.success(`${user.name}Force Logout Successfull`)
      onClose()
    }
    }
    
    // Handle password reset logic
    if(user?.id && actionType === "reset"){
      const res = await resetPassword({id:user.id})
      if(res?.data?.success){
      toast.success(`${user.name} Password Reset Successfull`)
    }
    onClose()
    }
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
      <Dialog open={actionType === "suspend"  || actionType === "Unsuspend"} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.isSuspend ? "Unsuspend" : "Suspend"} User</DialogTitle>
            <DialogDescription>
              {user.isSuspend
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
            <Button variant={user.isSuspend ? "default" : "destructive"} onClick={handleSuspend}>
              {user.isSuspend ? "Unsuspend" : "Suspend"} User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Force Logout Modal */}
      <Dialog open={actionType === "force-logout"} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Force Logout</DialogTitle>
            <DialogDescription>
              This will send a password reset email to {user.email} and force logout from all devices.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>Force Logout</Button>
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

       {/* User Details */}
      <Dialog open={actionType === "view"} onOpenChange={onClose}>
        <DialogContent className="max-w-[1000px] h-[calc(100vh-100px)] overflow-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <UserDetail setActionType={setActionType}  onBack={onClose} userId={user.id}/>
        </DialogContent>
      </Dialog>

      
      {/* Subscription Management Modal */}
      <Dialog open={actionType === "subscription"} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>
              Change the subscription plan for {user.name}. Current plan: {user.subscriptionPlan}
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