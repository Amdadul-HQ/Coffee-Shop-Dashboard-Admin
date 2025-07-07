/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import {
  Coffee,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Flag,
  Download,
  Upload,
  Merge,
  Eye,
  Clock,
  Star,
} from "lucide-react"
import { useAdminCafeApproveCafeMutation, useAdminCafeDeleteMutation, useAdminCafeFlaggedResolveMutation, useAdminCafeMergeCafeMutation, useAdminDuplicateCafeQuery, useAdminExportCafeMutation, useAdminFlaggedContentRemoveMutation, useAdminGetAllCafePendingQuery, useAdminGetAllCafeQuery, useAdminGetFlaggedContentQuery, useAdminPendingCafeRejectMutation, useAdminUpdateCafeMutation } from "../../redux/features/admin/adminCoffeeManagement"
import EditShopForm from "./editShopForm"
import { useDebounce } from "../../function/useDebounce"
import { toast } from "sonner"

// Mock data
// const coffeeShops = [
//   {
//     id: 1,
//     name: "Blue Bottle Coffee",
//     address: "123 Main St, San Francisco, CA",
//     phone: "(555) 123-4567",
//     rating: 4.5,
//     status: "active",
//     submittedBy: "admin",
//     createdAt: "2024-01-15",
//     flagged: false,
//   },
//   {
//     id: 2,
//     name: "Stumptown Coffee",
//     address: "456 Oak Ave, Portland, OR",
//     phone: "(555) 234-5678",
//     rating: 4.3,
//     status: "active",
//     submittedBy: "user123",
//     createdAt: "2024-01-20",
//     flagged: false,
//   },
//   {
//     id: 3,
//     name: "Local Brew House",
//     address: "789 Pine St, Seattle, WA",
//     phone: "(555) 345-6789",
//     rating: 4.1,
//     status: "pending",
//     submittedBy: "user456",
//     createdAt: "2024-01-25",
//     flagged: false,
//   },
// ]

// const pendingShops = [
//   {
//     id: 4,
//     name: "Corner Café",
//     address: "321 Elm St, Austin, TX",
//     phone: "(555) 456-7890",
//     rating: null,
//     status: "pending",
//     submittedBy: "user789",
//     createdAt: "2024-01-28",
//     flagged: false,
//   },
//   {
//     id: 5,
//     name: "Morning Grind",
//     address: "654 Maple Dr, Denver, CO",
//     phone: "(555) 567-8901",
//     rating: null,
//     status: "pending",
//     submittedBy: "user101",
//     createdAt: "2024-01-30",
//     flagged: false,
//   },
// ]

// const flaggedShops = [
//   {
//     id: 6,
//     name: "Sketchy Coffee",
//     address: "999 Suspicious St, Unknown, XX",
//     phone: "(555) 999-9999",
//     rating: 1.2,
//     status: "flagged",
//     submittedBy: "user999",
//     createdAt: "2024-01-31",
//     flagged: true,
//     flagReason: "Inappropriate content in description",
//   },
// ]

// const duplicateGroups = [
//   {
//     id: "dup1",
//     shops: [
//       { id: 7, name: "Blue Bottle Coffee", address: "123 Main St, San Francisco, CA" },
//       { id: 8, name: "Blue Bottle Cafe", address: "123 Main Street, San Francisco, CA" },
//     ],
//   },
//   {
//     id: "dup2",
//     shops: [
//       { id: 9, name: "Starbucks Downtown", address: "100 1st Ave, Seattle, WA" },
//       { id: 10, name: "Starbucks - Downtown", address: "100 First Avenue, Seattle, WA" },
//     ],
//   },
// ]

const CoffeeShopManagement=() => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("shops")
  const [selectedShops, setSelectedShops] = useState<number[]>([])
  const [editingShop, setEditingShop] = useState<any>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {data:flaggedContent,isFetching:loadingFlaggedContent} = useAdminGetFlaggedContentQuery(undefined);
  const flagged = flaggedContent?.data
  const [flaggedContentResolve,{isLoading}] = useAdminCafeFlaggedResolveMutation()
  const {data:pendingCafeData,isFetching:loadingPendingCafe} = useAdminGetAllCafePendingQuery(undefined)
  const {data,isFetching} = useAdminGetAllCafeQuery([
  { name: "search", value: debouncedSearchTerm },
  { name: "limit", value: "10" },
  { name: "isApproved", value: "true" },
  { name: "offset", value: "0" },
])
  const [deleteCafe,{isLoading:loadingDeleteCafe}] = useAdminCafeDeleteMutation()
// const [adminCafeApproveCafe,{isLoading}] = useAdminCafeApproveCafeMutation()
const coffeeShops = data?.data
const pendingCafe = pendingCafeData?.data
const [adminCafeApproveCafe,{isLoading:loadingApprovedCafe}] = useAdminCafeApproveCafeMutation()
const {data:duplicateData,isFetching:loadingDuplicate} = useAdminDuplicateCafeQuery(undefined)
const [adminFlaggedContentRemove,{isLoading:loadingFlaggedContentRemove}] = useAdminFlaggedContentRemoveMutation()
const duplicate = duplicateData?.data
const [adminCafePendingReject,{isLoading:loadingCafeReject}] = useAdminPendingCafeRejectMutation()
const [adminCafeMergeCafe,{isLoading:loadingCafeMerge}] = useAdminCafeMergeCafeMutation()
const [adminExportCafe,{isLoading:loadingExportCate}] = useAdminExportCafeMutation();
// console.log(duplicate)
  // const [adminCafeMergeCafe,{isLoading:loadingCafeMerge}] = useAdminCafeMergeCafeMutation()
  // const [adminUpdateCafe,{isLoading:loadingCafeUpdate}] = useAdminUpdateCafeMutation();
  const handleSelectShop = (shopId: string) => {
    // setSelectedShops((prev) => (prev.includes(shopId) ? prev.filter((id) => id !== shopId) : [...prev, shopId]))
  }


  const handleApproveShop =async (shopId: string) => {
    const res = await adminCafeApproveCafe({id:shopId})
    if(res?.data?.success){
      toast.success("Coffee Shope Approved")
    }
  }

  const handleRejectShop = async (shopId: string) => {
    // console.log(`Rejecting shop ${shopId}`)
    const res = await adminCafePendingReject({id:shopId})
    if(res?.data?.success){
      toast.success("Coffee Shope Rejected")
    }
  }

const handleMergeDuplicates = async (groups: any[], primaryId: number) => {
  const duplicateIds = groups
    .map(group => String(group?.id))
    .filter(id => id !== String(primaryId));

  if (!duplicateIds.length) {
    toast.error("No duplicates to merge");
    return;
  }

  try {
    const res = await adminCafeMergeCafe({
      targetId: String(primaryId),
      duplicateIds,
    }).unwrap();

    if (res?.success) {
      toast.success("Caffe Shop Merged");
    }
  } catch (error) {
    console.error(error);
    toast.error("Merge failed");
  }
};

  const handleBulkExport = () => {
    console.log("Exporting selected shops:", selectedShops)
  }

  const handleBulkImport = () => {
    console.log("Opening import dialog")
  }
  const handleDeleteCoffeeShop = async(shopId:string) => {
    const res = await deleteCafe({id:shopId})
    if(res?.data?.success){
      toast.success("Coffee Shope Deleted Successfully")
    }
  }

  const handleFlaggedResolve = async(shopId:string) => {
    const res = await flaggedContentResolve({id:shopId})
    if(res?.data?.success){
      toast.success("Flaggedd Content Resolved")
    }
  }

  const handleFlaggedRemove = async(shopId:string) => {
    const res = await adminFlaggedContentRemove({id:shopId})
    if(res?.data?.success){
      toast.success("Flagged Content Removed")
    }
  }

  const handleExportFile = async () => {
  try {
    const blob = await adminExportCafe().unwrap(); // unwrap to get raw blob

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cafes.csv'; // You can also parse this from `Content-Disposition` if needed
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download failed', err);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Coffee className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-semibold">Coffee Shop Database Management</h1>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Dashboard Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coffeeShops?.length}</div>
              <p className="text-xs text-muted-foreground">Active coffee shops</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCafe?.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{flagged?.length}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duplicates</CardTitle>
              <Merge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{duplicate?.length}</div>
              <p className="text-xs text-muted-foreground">Groups to merge</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs  value={activeTab} onValueChange={setActiveTab} defaultValue="shops" className="space-y-4">
          <TabsList>
            <TabsTrigger className="md:text-sm text-xs px-2 md:px-3" value="shops">All Shops</TabsTrigger>
            <TabsTrigger className="md:text-sm text-xs px-2 md:px-3" value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger className="md:text-sm text-xs px-2 md:px-3" value="flagged">Flagged Content</TabsTrigger>
            <TabsTrigger className="md:text-sm text-xs px-2 md:px-3" value="duplicates">Duplicates</TabsTrigger>
          </TabsList>

          {/* All Shops Tab */}
          <TabsContent value="shops" className="space-y-4">
            <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-3 items-center justify-between">
              <div className="flex items-center space-x-2 w-full">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search coffee shops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center md:justify-end justify-between w-full space-x-2">
                <Button variant="outline" onClick={handleBulkImport}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" onClick={handleExportFile}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetching ? (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        Loading users...
      </TableCell>
    </TableRow>
  ) : (coffeeShops?.map((shop:any) => (
                    <TableRow key={shop.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedShops.includes(shop.id)}
                          onCheckedChange={() => handleSelectShop(shop.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{shop?.name}</TableCell>
                      <TableCell>{shop?.country}<br/>{shop?.state}, {shop?.city}</TableCell>
                      <TableCell>{shop?.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {shop?.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={shop?.isApproved ? "default" : "secondary"}>{shop.isApproved ? "Active" : "Pending"}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog open={editingShop}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setEditingShop(shop)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
        <DialogTitle>Edit Coffee Shop</DialogTitle>
        <DialogDescription>Make changes to the coffee shop details here.</DialogDescription>
      </DialogHeader>

      <EditShopForm shop={editingShop} setEditingShop={setEditingShop} />

                            </DialogContent>
                          </Dialog>
                          <Button onClick={()=>handleDeleteCoffeeShop(shop.id)} variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Pending Approval Tab */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Submissions</CardTitle>
                <CardDescription>Review and approve user-submitted coffee shops</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingCafe?.map((shop:any) => (
                      <TableRow key={shop.id}>
                        <TableCell className="font-medium">{shop.name}</TableCell>
                        <TableCell>{shop?.country}<br/>{shop?.state}, {shop?.city}</TableCell>
                        <TableCell>{shop?.submittedBy}</TableCell>
                        <TableCell>{shop?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" onClick={() => handleApproveShop(shop.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleRejectShop(shop.id)}>
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flagged Content Tab */}
          <TabsContent value="flagged" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content Review</CardTitle>
                <CardDescription>Review and moderate flagged coffee shop entries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flagged?.map((shop:any) => (
                      <TableRow key={shop.id}>
                        <TableCell className="font-medium">{shop.name}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{shop.reason}</Badge>
                        </TableCell>
                        <TableCell>{shop.userId}</TableCell>
                        <TableCell>{new Date(shop.createdAt).toDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => handleFlaggedResolve(shop.id)} size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                            <Button onClick={()=>handleFlaggedRemove(shop.id)} size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Duplicates Tab */}
          <TabsContent value="duplicates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Duplicate Detection</CardTitle>
                <CardDescription>Merge duplicate coffee shop entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {duplicate?.map((group:any) => (
                  <div key={group.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Potential Duplicates</h4>
                    <div className="space-y-2">
                      {group?.map((shop:any) => (
                        <div key={shop.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <div className="font-medium">{shop.name}</div>
                            <div className="text-sm text-muted-foreground">{shop?.country}, {shop?.state}, {shop?.city}</div>
                          </div>
                          <Button size="sm" onClick={() => handleMergeDuplicates(group, shop.id)}>
                            Keep This One
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-3">
                      <Button variant="outline" size="sm">
                        Not Duplicates
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CoffeeShopManagement;
