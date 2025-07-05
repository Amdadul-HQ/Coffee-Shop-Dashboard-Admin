import { useState } from "react"
import { Search, MoreHorizontal, Eye, Ban, RotateCcw, CreditCard } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import UserActionModals from "./user-action-modals"

interface User {
  id: string
  name: string
  email: string
  subscription: "free" | "paid"
  signupDate: string
  lastActivity: string
  status: "active" | "suspended" | "banned"
  ratings: number
  notes: number
  favorites: number
}



const UserManagement=() => {
  const [searchTerm, setSearchTerm] = useState("")
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [actionType, setActionType] = useState<"suspend" | "reset" | "subscription" | null>(null)

  // Mock data
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subscription: "paid",
      signupDate: "2024-01-15",
      lastActivity: "2024-01-20",
      status: "active",
      ratings: 45,
      notes: 23,
      favorites: 67,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      subscription: "free",
      signupDate: "2024-01-10",
      lastActivity: "2024-01-19",
      status: "active",
      ratings: 12,
      notes: 8,
      favorites: 34,
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      subscription: "paid",
      signupDate: "2023-12-20",
      lastActivity: "2024-01-18",
      status: "suspended",
      ratings: 78,
      notes: 45,
      favorites: 123,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubscription = subscriptionFilter === "all" || user.subscription === subscriptionFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesSubscription && matchesStatus
  })

  const handleAction = (user: User, action: "suspend" | "reset" | "subscription") => {
    setSelectedUser(user)
    setActionType(action)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      suspended: "secondary",
      banned: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const getSubscriptionBadge = (subscription: string) => {
    return <Badge variant={subscription === "paid" ? "default" : "outline"}>{subscription}</Badge>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md:text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">Paid Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md:text-2xl font-bold">456</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md:text-2xl font-bold">89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-400 font-medium">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md:text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Subscription" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscriptions</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="hidden md:table-cell">Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.signupDate}</TableCell>
                    <TableCell>{user.lastActivity}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        <div>Ratings: {user.ratings}</div>
                        <div>Notes: {user.notes}</div>
                        <div>Favorites: {user.favorites}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction(user, "suspend")}>
                            <Ban className="h-4 w-4 mr-2" />
                            {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction(user, "reset")}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction(user, "subscription")}>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Manage Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UserActionModals
        user={selectedUser}
        actionType={actionType}
        onClose={() => {
          setSelectedUser(null)
          setActionType(null)
        }}
      />
    </div>
  )
}


export default UserManagement;