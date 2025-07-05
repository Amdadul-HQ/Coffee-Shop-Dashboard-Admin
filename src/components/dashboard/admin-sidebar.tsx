import { Users, Shield, Settings, Store } from "lucide-react"
import { 
    Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, } from "../ui/sidebar"
import { NavLink, useLocation } from "react-router-dom"



const AdminSidebar =() => {
  const menuItems = [
    {
      title: "User Management",
      icon: Users,
      view: "users" as const,
      path: "user-management"
    },
    {
      title: "Paywall Control",
      icon: Shield,
      view: "paywall" as const,
      path: "paywall-control"
    },
    {
      title:"Coffee Shop Management",
      icon : Store,
      view: "coffee" as const,
      path: "coffee-shop-management"
    }
  ]

  const location = useLocation();
  console.log(location.pathname)

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-4">
          <Settings className="h-6 w-6" />
          <span className="font-semibold text-lg">Admin Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <NavLink to={`/dashboard/admin/${item.path}`}>
                  <SidebarMenuButton isActive={`/dashboard/admin/${item.path}` === location.pathname}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar;
