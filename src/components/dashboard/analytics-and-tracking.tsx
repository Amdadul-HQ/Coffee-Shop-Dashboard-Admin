import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Users, Activity, TrendingUp, Coffee } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export default function AnalyticsAndTrackingPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const userStats = [
    { name: "Mon", activeUsers: 1200, newUsers: 45, coffeeShops: 23 },
    { name: "Tue", activeUsers: 1350, newUsers: 52, coffeeShops: 25 },
    { name: "Wed", activeUsers: 1180, newUsers: 38, coffeeShops: 22 },
    { name: "Thu", activeUsers: 1420, newUsers: 67, coffeeShops: 28 },
    { name: "Fri", activeUsers: 1380, newUsers: 43, coffeeShops: 26 },
    { name: "Sat", activeUsers: 1520, newUsers: 78, coffeeShops: 30 },
    { name: "Sun", activeUsers: 1650, newUsers: 89, coffeeShops: 32 },
  ]

  const retentionData = [
    { period: "Day 1", retention: 100 },
    { period: "Day 7", retention: 65 },
    { period: "Day 14", retention: 45 },
    { period: "Day 30", retention: 32 },
    { period: "Day 60", retention: 28 },
    { period: "Day 90", retention: 25 },
  ]

  const featureUsage = [
    { name: "Coffee Discovery", value: 35, color: "#8884d8" },
    { name: "Shop Reviews", value: 25, color: "#82ca9d" },
    { name: "Order Tracking", value: 20, color: "#ffc658" },
    { name: "Loyalty Program", value: 15, color: "#ff7300" },
    { name: "Social Features", value: 5, color: "#00ff00" },
  ]

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Usage Tracking</h1>
          <p className="text-muted-foreground">Monitor user engagement, retention, and feature usage</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Active Users</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,567</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Retention</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> 7-day retention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Coffee Shops</CardTitle>
            <Coffee className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> new this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="retention">Retention & Churn</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="growth">Growth Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Trends</CardTitle>
              <CardDescription>Daily active users and new registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} name="Active Users" />
                  <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" strokeWidth={2} name="New Users" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Retention Curve</CardTitle>
              <CardDescription>Percentage of users returning over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="retention" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage Distribution</CardTitle>
                <CardDescription>How users interact with different features</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={featureUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {featureUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Feature Engagement Metrics</CardTitle>
                <CardDescription>Detailed usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureUsage.map((feature) => (
                    <div key={feature.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: feature.color }}
                        />
                        <span className="text-sm font-medium">{feature.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{feature.value}%</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.floor(24567 * (feature.value / 100))} users
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
              <CardDescription>Track platform growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="coffeeShops" stroke="#ff7300" strokeWidth={2} name="Coffee Shops" />
                  <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" strokeWidth={2} name="New Users" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
