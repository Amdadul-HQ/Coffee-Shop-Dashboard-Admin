import { useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Search, Eye, MoreVertical, DollarSign, CreditCard, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useAllPlanQuery } from "../../redux/features/admin/adminNotification"
import PlanDetailsDialog from "./plan-details"

interface Plan {
  id: string
  productId: string
  stripePriceId: string
  currency: string
  unitAmount: number
  interval: string
  lookupKey: string
  lookupKeyInStripe: string
  active: boolean
  metadata: string
  createdAt: string
  updatedAt: string
}

interface StripePlan {
  id: string
  object: string
  active: boolean
  billing_scheme: string
  created: number
  currency: string
  lookup_key: string
  metadata: Record<string, any>
  nickname: string
  product: string
  recurring: {
    interval: string
    interval_count: number
    usage_type: string
  }
  unit_amount: number
  unit_amount_decimal: string
}

const StripePlansList = () => {
  const [currentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [pageSize] = useState(10)

  const skip = (currentPage - 1) * pageSize
  const { data, isLoading, error, refetch } = useAllPlanQuery({
    skip,
    take: pageSize,
  })

  console.log(data)

//   const [togglePlanStatus, { isLoading: isToggling }] = useTogglePlanStatusMutation()

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const parseMetadata = (metadata: string) => {
    try {
      if (typeof metadata === "string") {
        // Handle different metadata formats
        if (metadata.startsWith("{")) {
          const parsed = JSON.parse(metadata)
          return parsed.features ? JSON.parse(parsed.features) : ""
        }
        return metadata.replace(/"/g, "")
      }
      return ""
    } catch {
      return metadata
    }
  }

  const handleViewDetails = (planId: string) => {
    setSelectedPlanId(planId)
    setDetailsDialogOpen(true)
  }

  const filterPlans = (plans: Plan[]) => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.lookupKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.stripePriceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.currency.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" || (activeTab === "active" && plan.active) || (activeTab === "inactive" && !plan.active)

      return matchesSearch && matchesTab
    })
  }

  const dbPlans = data?.data?.db || []
  const stripePlans = data?.data?.stripe || []
  const filteredDbPlans = filterPlans(dbPlans)

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading plans</p>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Stripe Plans Management</h1>
          <p className="text-muted-foreground">Manage your subscription plans and pricing</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            {dbPlans.length} Total Plans
          </Badge>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by lookup key, price ID, or currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Plans</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-8 w-20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredDbPlans.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No plans found</p>
                  <p className="text-muted-foreground">
                    {searchTerm ? "Try adjusting your search terms" : "No plans have been created yet"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredDbPlans.map((plan) => {
            const stripePlan = stripePlans.find((sp: StripePlan) => sp.id === plan.stripePriceId)
            return (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{plan.lookupKey}</CardTitle>
                      <p className="text-sm text-muted-foreground">ID: {plan.stripePriceId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={plan.active ? "default" : "secondary"}>
                        {plan.active ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                        {plan.active ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(plan.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                          >
                            {plan.active ? (
                              <XCircle className="h-4 w-4 mr-2" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            {plan.active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold">{formatCurrency(plan.unitAmount, plan.currency)}</span>
                      <span className="text-muted-foreground">/{plan.interval}</span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Currency:</span>
                        <span className="font-medium">{plan.currency.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interval:</span>
                        <span className="font-medium capitalize">{plan.interval}</span>
                      </div>
                      {parseMetadata(plan.metadata) && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Features:</span>
                          <span className="font-medium text-xs">{parseMetadata(plan.metadata)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">{formatDate(plan.createdAt)}</span>
                      </div>
                    </div>

                    {/* Stripe Status */}
                    {stripePlan && (
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Stripe Status:</span>
                          <Badge variant={stripePlan.active ? "default" : "secondary"} className="text-xs">
                            {stripePlan.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleViewDetails(plan.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Plan Details Dialog */}
      <PlanDetailsDialog
        planId={selectedPlanId}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        dbPlans={dbPlans}
        stripePlans={stripePlans}
      />
    </div>
  )
}

export default StripePlansList
