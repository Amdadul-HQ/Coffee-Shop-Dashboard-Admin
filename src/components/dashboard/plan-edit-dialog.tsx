"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogDescription } from "../ui/dialog"
import { Switch } from "../ui/switch"
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAdminUpdatePlanLimitMutation } from "../../redux/features/admin/adminAnalytics"

interface PlanEditDialogProps {
  plan: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PlanEditDialog =({ plan, open, onOpenChange }: PlanEditDialogProps) => {
  const [formData, setFormData] = useState<Partial<any>>({})
  const [updatePlanLimit, { isLoading }] = useAdminUpdatePlanLimitMutation()
//   const { toast } = useToast()

  useEffect(() => {
    if (plan) {
      setFormData({
        id: plan.id,
        plan: plan.plan,
        maxLogsPerMonth: plan.maxLogsPerMonth,
        maxShareCount: plan.maxShareCount,
        dataRetentionDays: plan.dataRetentionDays,
        upgradeCtaEnabled: plan.upgradeCtaEnabled,
      })
    }
  }, [plan])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "number" ? Number.parseInt(value, 10) : value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      upgradeCtaEnabled: checked,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.id) return

    try {
      await updatePlanLimit(formData as any).unwrap()
    //   toast({
    //     title: "Success!",
    //     description: `Plan "${formData.plan}" updated successfully.`,
    //   })
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to update plan:", error)
    //   toast({
    //     title: "Error",
    //     description: "Failed to update plan. Please try again.",
    //     variant: "destructive",
    //   })
    }
  }

  if (!plan) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Plan: {plan.plan}</DialogTitle>
          <DialogDescription>Make changes to the plan details here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="plan" className="text-right">
              Plan Name
            </Label>
            <Input id="plan" readOnly value={formData.plan || ""} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxLogsPerMonth" className="text-right">
              Max Logs
            </Label>
            <Input
              id="maxLogsPerMonth"
              type="number"
              value={formData.maxLogsPerMonth || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxShareCount" className="text-right">
              Max Share
            </Label>
            <Input
              id="maxShareCount"
              type="number"
              value={formData.maxShareCount || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dataRetentionDays" className="text-right">
              Retention Days
            </Label>
            <Input
              id="dataRetentionDays"
              type="number"
              value={formData.dataRetentionDays || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="upgradeCtaEnabled" className="text-right">
              Upgrade CTA
            </Label>
            <Switch
              disabled
              id="upgradeCtaEnabled"
              checked={formData.upgradeCtaEnabled ?? false}
              onCheckedChange={handleSwitchChange}
              className="col-span-3 justify-self-start"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PlanEditDialog
