/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"

// Mock data for analytics with time series
const analyticsData = {
  activeUsers: {
    daily: { current: 2847, previous: 2654, change: 7.3 },
    weekly: { current: 18432, previous: 17891, change: 3.0 },
    monthly: { current: 67234, previous: 63891, change: 5.2 },
  },
  churnRate: {
    current: 3.2,
    previous: 4.1,
    change: -21.9,
  },
  retention: {
    day1: 78,
    day7: 45,
    day30: 23,
    day90: 12,
  },
  growth: {
    newUsers: 1247,
    growthRate: 12.4,
    previousGrowthRate: 8.9,
  },
}

const featureUsage = [
  { feature: "Dashboard", usage: 89, users: 15234, trend: 5.2 },
  { feature: "Coffee Shop Search", usage: 76, users: 12987, trend: 3.1 },
  { feature: "Reviews", usage: 64, users: 10934, trend: -2.4 },
  { feature: "Favorites", usage: 58, users: 9876, trend: 8.7 },
  { feature: "Map View", usage: 52, users: 8901, trend: 1.9 },
  { feature: "Photo Upload", usage: 41, users: 7012, trend: -1.2 },
  { feature: "Social Sharing", usage: 33, users: 5643, trend: 4.6 },
  { feature: "Premium Features", usage: 18, users: 3087, trend: 15.3 },
]

// Extended time series data for line charts
const dailyActiveUsers = [
  { date: "Jan 1", users: 2340, day: 1 },
  { date: "Jan 2", users: 2456, day: 2 },
  { date: "Jan 3", users: 2234, day: 3 },
  { date: "Jan 4", users: 2567, day: 4 },
  { date: "Jan 5", users: 2789, day: 5 },
  { date: "Jan 6", users: 2654, day: 6 },
  { date: "Jan 7", users: 2847, day: 7 },
  { date: "Jan 8", users: 2923, day: 8 },
  { date: "Jan 9", users: 2756, day: 9 },
  { date: "Jan 10", users: 2891, day: 10 },
  { date: "Jan 11", users: 3012, day: 11 },
  { date: "Jan 12", users: 2987, day: 12 },
  { date: "Jan 13", users: 3156, day: 13 },
  { date: "Jan 14", users: 3089, day: 14 },
]

const weeklyActiveUsers = [
  { date: "Week 1", users: 18432, week: 1 },
  { date: "Week 2", users: 19234, week: 2 },
  { date: "Week 3", users: 18756, week: 3 },
  { date: "Week 4", users: 20123, week: 4 },
  { date: "Week 5", users: 21456, week: 5 },
  { date: "Week 6", users: 20987, week: 6 },
  { date: "Week 7", users: 22341, week: 7 },
  { date: "Week 8", users: 23012, week: 8 },
]

const monthlyActiveUsers = [
  { date: "Jan", users: 67234, month: 1 },
  { date: "Feb", users: 69876, month: 2 },
  { date: "Mar", users: 71234, month: 3 },
  { date: "Apr", users: 73456, month: 4 },
  { date: "May", users: 75123, month: 5 },
  { date: "Jun", users: 77891, month: 6 },
  { date: "Jul", users: 79234, month: 7 },
  { date: "Aug", users: 81567, month: 8 },
]

const retentionData = [
  { date: "Jan", day1: 78, day7: 45, day30: 23, day90: 12 },
  { date: "Feb", day1: 76, day7: 43, day30: 21, day90: 11 },
  { date: "Mar", day1: 79, day7: 46, day30: 24, day90: 13 },
  { date: "Apr", day1: 81, day7: 48, day30: 26, day90: 14 },
  { date: "May", day1: 83, day7: 50, day30: 28, day90: 15 },
  { date: "Jun", day1: 85, day7: 52, day30: 30, day90: 16 },
]

const churnRateData = [
  { date: "Jan", rate: 4.5 },
  { date: "Feb", rate: 4.2 },
  { date: "Mar", rate: 3.8 },
  { date: "Apr", rate: 3.5 },
  { date: "May", rate: 3.3 },
  { date: "Jun", rate: 3.2 },
]

const growthData = [
  { date: "Jan", rate: 8.2, newUsers: 1120 },
  { date: "Feb", rate: 9.1, newUsers: 1205 },
  { date: "Mar", rate: 7.8, newUsers: 1087 },
  { date: "Apr", rate: 10.3, newUsers: 1334 },
  { date: "May", rate: 11.7, newUsers: 1456 },
  { date: "Jun", rate: 12.4, newUsers: 1247 },
]

// const featureUsageOverTime = {
//   Dashboard: [85, 86, 87, 88, 89, 89],
//   "Coffee Shop Search": [72, 73, 74, 75, 76, 76],
//   Reviews: [68, 67, 66, 65, 64, 64],
//   Favorites: [54, 55, 56, 57, 58, 58],
//   "Map View": [50, 51, 51, 52, 52, 52],
// }

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily")
  const [selectedTab, setSelectedTab] = useState<"overview" | "users" | "retention" | "features" | "growth">("overview")

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const TrendIndicator = ({ value, isPositive }: { value: number; isPositive?: boolean }) => {
    const positive = isPositive !== undefined ? isPositive : value > 0
    return (
      <div className={`flex items-center space-x-1 ${positive ? "text-green-600" : "text-red-600"}`}>
        <svg className={`w-4 h-4 ${positive ? "rotate-0" : "rotate-180"}`} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">{Math.abs(value)}%</span>
      </div>
    )
  }

  // Line Chart Component
  const LineChart = ({
    data,
    dataKey,
    color = "#3B82F6",
    height = 200,
    showDots = true,
    strokeWidth = 2,
  }: {
    data: any[]
    dataKey: string
    color?: string
    height?: number
    showDots?: boolean
    strokeWidth?: number
  }) => {
    if (!data || data.length === 0) return null

    const maxValue = Math.max(...data.map((d) => d[dataKey]))
    const minValue = Math.min(...data.map((d) => d[dataKey]))
    const range = maxValue - minValue || 1

    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - ((item[dataKey] - minValue) / range) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="relative" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Area under curve */}
          <path d={`M 0,100 L ${points} L 100,100 Z`} fill={color} fillOpacity="0.1" />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots */}
          {showDots &&
            data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - ((item[dataKey] - minValue) / range) * 100
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={color}
                  className="hover:r-2 transition-all duration-200"
                />
              )
            })}
        </svg>

        {/* Data labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-center">
              {item.date}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Multi-line Chart Component
  const MultiLineChart = ({
    data,
    lines,
    height = 200,
  }: {
    data: any[]
    lines: { key: string; color: string; label: string }[]
    height?: number
  }) => {
    if (!data || data.length === 0) return null

    const allValues = data.flatMap((item) => lines.map((line) => item[line.key]))
    const maxValue = Math.max(...allValues)
    const minValue = Math.min(...allValues)
    const range = maxValue - minValue || 1

    return (
      <div className="relative" style={{ height: `${height + 40}px` }}>
        <svg className="w-full" style={{ height: `${height}px` }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid */}
          <defs>
            <pattern id="multiGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#multiGrid)" />

          {lines.map((line, lineIndex) => {
            const points = data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 100
                const y = 100 - ((item[line.key] - minValue) / range) * 100
                return `${x},${y}`
              })
              .join(" ")

            return (
              <g key={lineIndex}>
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dots */}
                {data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = 100 - ((item[line.key] - minValue) / range) * 100
                  return <circle key={index} cx={x} cy={y} r="1.5" fill={line.color} />
                })}
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4">
          {lines.map((line, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }}></div>
              <span className="text-sm text-gray-600">{line.label}</span>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {data.map((item, index) => (
            <span key={index}>{item.date}</span>
          ))}
        </div>
      </div>
    )
  }

  const getCurrentUserData = () => {
    switch (selectedPeriod) {
      case "daily":
        return dailyActiveUsers
      case "weekly":
        return weeklyActiveUsers
      case "monthly":
        return monthlyActiveUsers
      default:
        return dailyActiveUsers
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Usage Tracking</h1>
              <p className="text-gray-600 mt-1">Monitor user engagement and platform performance</p>
            </div>

            {/* Period Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(["daily", "weekly", "monthly"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period ? "bg-gray-50 text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "users", label: "Active Users" },
              { id: "retention", label: "Retention" },
              { id: "features", label: "Feature Usage" },
              { id: "growth", label: "Growth" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Active Users */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users ({selectedPeriod})</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {formatNumber(analyticsData.activeUsers[selectedPeriod].current)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <TrendIndicator value={analyticsData.activeUsers[selectedPeriod].change} />
                </div>
              </div>

              {/* Churn Rate */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.churnRate.current}%</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <TrendIndicator
                    value={analyticsData.churnRate.change}
                    isPositive={analyticsData.churnRate.change < 0}
                  />
                </div>
              </div>

              {/* Retention Rate */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">30-Day Retention</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.retention.day30}%</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>1-day: {analyticsData.retention.day1}%</span>
                    <span>•</span>
                    <span>7-day: {analyticsData.retention.day7}%</span>
                  </div>
                </div>
              </div>

              {/* Growth Rate */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.growth.growthRate}%</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <TrendIndicator value={analyticsData.growth.growthRate - analyticsData.growth.previousGrowthRate} />
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Users Line Chart */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Active Users Trend
                </h3>
                <LineChart data={getCurrentUserData()} dataKey="users" color="#3B82F6" height={250} />
              </div>

              {/* Churn Rate Line Chart */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Churn Rate Trend</h3>
                <LineChart data={churnRateData} dataKey="rate" color="#EF4444" height={250} />
              </div>
            </div>
          </div>
        )}

        {/* Active Users Tab */}
        {selectedTab === "users" && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Users Analysis</h3>

              {/* Period Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(["daily", "weekly", "monthly"] as const).map((period) => (
                  <div key={period} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {period.charAt(0).toUpperCase() + period.slice(1)} Active Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(analyticsData.activeUsers[period].current)}
                    </p>
                    <div className="mt-2 flex items-center justify-center">
                      <TrendIndicator value={analyticsData.activeUsers[period].change} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Line Chart */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Active Users Over Time
                </h4>
                <LineChart data={getCurrentUserData()} dataKey="users" color="#3B82F6" height={300} />
              </div>

              {/* Multi-period Comparison */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">All Periods Comparison</h4>
                <MultiLineChart
                  data={[
                    { date: "Period 1", daily: 2340, weekly: 18432, monthly: 67234 },
                    { date: "Period 2", daily: 2456, weekly: 19234, monthly: 69876 },
                    { date: "Period 3", daily: 2567, weekly: 20123, monthly: 71234 },
                    { date: "Period 4", daily: 2789, weekly: 21456, monthly: 73456 },
                    { date: "Period 5", daily: 2847, weekly: 22341, monthly: 75123 },
                  ]}
                  lines={[
                    { key: "daily", color: "#3B82F6", label: "Daily" },
                    { key: "weekly", color: "#10B981", label: "Weekly" },
                    { key: "monthly", color: "#8B5CF6", label: "Monthly" },
                  ]}
                  height={300}
                />
              </div>
            </div>
          </div>
        )}

        {/* Retention Tab */}
        {selectedTab === "retention" && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Retention Analysis</h3>

              {/* Retention Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.retention.day1}%</p>
                  <p className="text-sm text-gray-600">1-Day Retention</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{analyticsData.retention.day7}%</p>
                  <p className="text-sm text-gray-600">7-Day Retention</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{analyticsData.retention.day30}%</p>
                  <p className="text-sm text-gray-600">30-Day Retention</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{analyticsData.retention.day90}%</p>
                  <p className="text-sm text-gray-600">90-Day Retention</p>
                </div>
              </div>

              {/* Retention Trends Line Chart */}
              <div className="mb-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">Retention Trends Over Time</h4>
                <MultiLineChart
                  data={retentionData}
                  lines={[
                    { key: "day1", color: "#3B82F6", label: "1-Day" },
                    { key: "day7", color: "#10B981", label: "7-Day" },
                    { key: "day30", color: "#F59E0B", label: "30-Day" },
                    { key: "day90", color: "#EF4444", label: "90-Day" },
                  ]}
                  height={300}
                />
              </div>
            </div>
          </div>
        )}

        {/* Feature Usage Tab */}
        {selectedTab === "features" && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Feature Usage Tracking</h3>

              {/* Feature Usage Trends */}
              <div className="mb-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">Top Features Usage Over Time</h4>
                <MultiLineChart
                  data={[
                    {
                      date: "Jan",
                      Dashboard: 85,
                      "Coffee Shop Search": 72,
                      Reviews: 68,
                      Favorites: 54,
                      "Map View": 50,
                    },
                    {
                      date: "Feb",
                      Dashboard: 86,
                      "Coffee Shop Search": 73,
                      Reviews: 67,
                      Favorites: 55,
                      "Map View": 51,
                    },
                    {
                      date: "Mar",
                      Dashboard: 87,
                      "Coffee Shop Search": 74,
                      Reviews: 66,
                      Favorites: 56,
                      "Map View": 51,
                    },
                    {
                      date: "Apr",
                      Dashboard: 88,
                      "Coffee Shop Search": 75,
                      Reviews: 65,
                      Favorites: 57,
                      "Map View": 52,
                    },
                    {
                      date: "May",
                      Dashboard: 89,
                      "Coffee Shop Search": 76,
                      Reviews: 64,
                      Favorites: 58,
                      "Map View": 52,
                    },
                  ]}
                  lines={[
                    { key: "Dashboard", color: "#3B82F6", label: "Dashboard" },
                    { key: "Coffee Shop Search", color: "#10B981", label: "Coffee Shop Search" },
                    { key: "Reviews", color: "#F59E0B", label: "Reviews" },
                    { key: "Favorites", color: "#8B5CF6", label: "Favorites" },
                    { key: "Map View", color: "#EF4444", label: "Map View" },
                  ]}
                  height={300}
                />
              </div>

              {/* Feature Usage Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mini Chart
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-50 divide-y divide-gray-200">
                    {featureUsage.map((feature, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {feature.feature}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feature.usage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatNumber(feature.users)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <TrendIndicator value={feature.trend} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-24 h-8">
                            <LineChart
                              data={[
                                { date: "1", value: feature.usage - 5 },
                                { date: "2", value: feature.usage - 3 },
                                { date: "3", value: feature.usage - 1 },
                                { date: "4", value: feature.usage },
                              ]}
                              dataKey="value"
                              color={feature.trend > 0 ? "#10B981" : "#EF4444"}
                              height={32}
                              showDots={false}
                              strokeWidth={1.5}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Growth Tab */}
        {selectedTab === "growth" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* New Users */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Users</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {formatNumber(analyticsData.growth.newUsers)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>

              {/* Growth Rate */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.growth.growthRate}%</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <TrendIndicator value={analyticsData.growth.growthRate - analyticsData.growth.previousGrowthRate} />
                </div>
              </div>

              {/* Churn Rate */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.churnRate.current}%</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <TrendIndicator
                    value={analyticsData.churnRate.change}
                    isPositive={analyticsData.churnRate.change < 0}
                  />
                </div>
              </div>
            </div>

            {/* Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Growth Rate Line Chart */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Growth Rate Over Time</h3>
                <LineChart data={growthData} dataKey="rate" color="#8B5CF6" height={250} />
              </div>

              {/* New Users Line Chart */}
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">New Users Acquisition</h3>
                <LineChart data={growthData} dataKey="newUsers" color="#10B981" height={250} />
              </div>
            </div>

            {/* Combined Growth Metrics */}
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Combined Growth Metrics</h3>
              <MultiLineChart
                data={growthData.map((item) => ({
                  ...item,
                  churnRate: churnRateData.find((c) => c.date === item.date)?.rate || 0,
                }))}
                lines={[
                  { key: "rate", color: "#8B5CF6", label: "Growth Rate (%)" },
                  { key: "churnRate", color: "#EF4444", label: "Churn Rate (%)" },
                ]}
                height={300}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
