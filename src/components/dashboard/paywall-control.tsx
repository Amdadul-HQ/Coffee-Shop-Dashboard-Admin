import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus, Settings, Flag } from "lucide-react"
import { Switch } from "../ui/switch"

interface Feature {
  id: string
  name: string
  description: string
  isPaid: boolean
  isEnabled: boolean
  userGroup?: string
}

interface FeatureFlag {
  id: string
  name: string
  description: string
  isEnabled: boolean
  targetUsers: string[]
  targetGroups: string[]
}

const PaywallControl =() => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "1",
      name: "Advanced Analytics",
      description: "Detailed analytics and reporting features",
      isPaid: true,
      isEnabled: true,
    },
    {
      id: "2",
      name: "Export Data",
      description: "Export data in various formats",
      isPaid: true,
      isEnabled: true,
    },
    {
      id: "3",
      name: "Basic Dashboard",
      description: "Standard dashboard view",
      isPaid: false,
      isEnabled: true,
    },
    {
      id: "4",
      name: "Premium Templates",
      description: "Access to premium template library",
      isPaid: true,
      isEnabled: false,
    },
  ])

  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
    {
      id: "1",
      name: "Beta UI",
      description: "New user interface design",
      isEnabled: true,
      targetUsers: ["user1", "user2"],
      targetGroups: ["beta-testers"],
    },
    {
      id: "2",
      name: "AI Assistant",
      description: "AI-powered assistant feature",
      isEnabled: false,
      targetUsers: [],
      targetGroups: ["premium-users"],
    },
  ])

  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
    isPaid: false,
  })

  const [newFlag, setNewFlag] = useState({
    name: "",
    description: "",
    targetGroup: "",
  })

  const toggleFeature = (id: string, field: "isPaid" | "isEnabled") => {
    setFeatures(features.map((feature) => (feature.id === id ? { ...feature, [field]: !feature[field] } : feature)))
  }

  const toggleFeatureFlag = (id: string) => {
    setFeatureFlags(featureFlags.map((flag) => (flag.id === id ? { ...flag, isEnabled: !flag.isEnabled } : flag)))
  }

  const addFeature = () => {
    if (newFeature.name && newFeature.description) {
      const feature: Feature = {
        id: Date.now().toString(),
        name: newFeature.name,
        description: newFeature.description,
        isPaid: newFeature.isPaid,
        isEnabled: true,
      }
      setFeatures([...features, feature])
      setNewFeature({ name: "", description: "", isPaid: false })
    }
  }

  const addFeatureFlag = () => {
    if (newFlag.name && newFlag.description) {
      const flag: FeatureFlag = {
        id: Date.now().toString(),
        name: newFlag.name,
        description: newFlag.description,
        isEnabled: false,
        targetUsers: [],
        targetGroups: newFlag.targetGroup ? [newFlag.targetGroup] : [],
      }
      setFeatureFlags([...featureFlags, flag])
      setNewFlag({ name: "", description: "", targetGroup: "" })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Paywall Control</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.filter((f) => f.isPaid).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featureFlags.filter((f) => f.isEnabled).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Beta Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Feature Management
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Feature</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feature-name">Feature Name</Label>
                  <Input
                    id="feature-name"
                    value={newFeature.name}
                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                    placeholder="Enter feature name"
                  />
                </div>
                <div>
                  <Label htmlFor="feature-description">Description</Label>
                  <Input
                    id="feature-description"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    placeholder="Enter feature description"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="feature-paid"
                    checked={newFeature.isPaid}
                    onCheckedChange={(checked) => setNewFeature({ ...newFeature, isPaid: checked })}
                  />
                  <Label htmlFor="feature-paid">Paid Feature</Label>
                </div>
                <Button onClick={addFeature} className="w-full">
                  Add Feature
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Behind Paywall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feature.isPaid ? "default" : "outline"}>{feature.isPaid ? "Paid" : "Free"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={feature.isEnabled}
                          onCheckedChange={() => toggleFeature(feature.id, "isEnabled")}
                        />
                        <span className="text-sm">{feature.isEnabled ? "Enabled" : "Disabled"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={feature.isPaid} onCheckedChange={() => toggleFeature(feature.id, "isPaid")} />
                        <span className="text-sm">{feature.isPaid ? "Paid" : "Free"}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Feature Flags & Beta Access
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Flag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Feature Flag</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="flag-name">Flag Name</Label>
                  <Input
                    id="flag-name"
                    value={newFlag.name}
                    onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                    placeholder="Enter flag name"
                  />
                </div>
                <div>
                  <Label htmlFor="flag-description">Description</Label>
                  <Input
                    id="flag-description"
                    value={newFlag.description}
                    onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                    placeholder="Enter flag description"
                  />
                </div>
                <div>
                  <Label htmlFor="target-group">Target Group</Label>
                  <Select
                    value={newFlag.targetGroup}
                    onValueChange={(value) => setNewFlag({ ...newFlag, targetGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beta-testers">Beta Testers</SelectItem>
                      <SelectItem value="premium-users">Premium Users</SelectItem>
                      <SelectItem value="admin-users">Admin Users</SelectItem>
                      <SelectItem value="all-users">All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addFeatureFlag} className="w-full">
                  Add Feature Flag
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flag</TableHead>
                  <TableHead>Target Groups</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureFlags.map((flag) => (
                  <TableRow key={flag.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{flag.name}</div>
                        <div className="text-sm text-muted-foreground">{flag.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {flag.targetGroups.map((group) => (
                          <Badge key={group} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={flag.isEnabled ? "default" : "secondary"}>
                        {flag.isEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch checked={flag.isEnabled} onCheckedChange={() => toggleFeatureFlag(flag.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default PaywallControl;