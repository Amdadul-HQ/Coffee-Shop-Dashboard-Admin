import { useState } from "react"
import { SidebarProvider } from "../ui/sidebar"
import AdminSidebar from "./admin-sidebar"
import UserDetail from "./user-detail"
import { Outlet } from "react-router-dom"
import MobileNavbar from "./admin-menu-for-mobile"

const AdminDashboard =() => {
  const [activeView, setActiveView] = useState<"users" | "paywall" | "user-detail">("users")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)


  const handleBackToUsers = () => {
    setActiveView("users")
    setSelectedUserId(null)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden mb-20">
          <Outlet/>
          {activeView === "user-detail" && selectedUserId && (
            <UserDetail userId={selectedUserId} onBack={handleBackToUsers} />
          )}
        </main>
        <MobileNavbar/>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboard;
