"use client"

import { useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Search, Eye, MoreVertical, Package, Plus, RefreshCw, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react"
import { useGetAllProductQuery } from "../../redux/features/admin/adminNotification"
import CreateProductDialog from "./admin-create-product"
import ProductDetailsDialog from "./product-details"

interface Product {
  id: string
  stripeProductId: string
  name: string
  description: string
  features: string
  createdAt: string
  updatedAt: string
}

interface StripeProduct {
  id: string
  object: string
  active: boolean
  created: number
  description: string
  metadata: Record<string, any>
  name: string
  type: string
  updated: number
}

const StripeProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [pageSize] = useState(12)

  const skip = (currentPage - 1) * pageSize
  const { data, isLoading, error, refetch } = useGetAllProductQuery({
    skip,
    take: pageSize,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatUnixTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const parseFeatures = (features: string) => {
    try {
      if (typeof features === "string") {
        return features.replace(/"/g, "").split(",").filter(Boolean)
      }
      return []
    } catch {
      return []
    }
  }

  const handleViewDetails = (stripeProductId: string) => {
    setSelectedProductId(stripeProductId)
    setDetailsDialogOpen(true)
  }

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.stripeProductId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }

  const dbProducts = data?.data?.db || []
  const stripeProducts = data?.data?.stripe || []
  const filteredProducts = filterProducts(dbProducts)

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading products</p>
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
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-muted-foreground">Manage your subscription products and services</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {dbProducts.length} Total Products
          </Badge>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, description, or product ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
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
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-muted-foreground">
                    {searchTerm ? "Try adjusting your search terms" : "No products have been created yet"}
                  </p>
                  <Button className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const stripeProduct = stripeProducts.find((sp: StripeProduct) => sp.id === product.stripeProductId)
            const features = parseFeatures(product.features)

            return (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">ID: {product.stripeProductId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={stripeProduct?.active ? "default" : "secondary"}>
                        {stripeProduct?.active ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {stripeProduct?.active ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(product.stripeProductId)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                    {/* Features */}
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature.trim()}
                          </Badge>
                        ))}
                        {features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium capitalize">{stripeProduct?.type || "Service"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">{formatDate(product.createdAt)}</span>
                      </div>
                      {stripeProduct && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stripe Status:</span>
                          <Badge variant={stripeProduct.active ? "default" : "secondary"} className="text-xs">
                            {stripeProduct.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleViewDetails(product.stripeProductId)}
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

      {/* Dialogs */}
      <ProductDetailsDialog
        stripeProductId={selectedProductId}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        dbProducts={dbProducts}
        stripeProducts={stripeProducts}
      />

      <CreateProductDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  )
}

export default StripeProductsList
