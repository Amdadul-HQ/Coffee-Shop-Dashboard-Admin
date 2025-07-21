import { useState } from "react"
import {  motion } from "motion/react"
import { User, Coffee, LayoutDashboard, Bell, Megaphone, CreditCard, ShoppingBasket, NotebookTabs, UsersIcon, Ban, Logs } from "lucide-react"
import { cn } from "../../lib/utils"
import { Link } from "react-router-dom"

const tabs = [
  { name: "User Management", icon: User, path: "user-management" },
  { name: "Analytics", icon: LayoutDashboard, path: "analytics-and-tracking" },
  { name: "Coffee Shop Management", icon: Coffee, path: "coffee-shop-management" },
  { name: "Notifications", icon: Bell, path: "notifications" },
  { name: "Announcement", icon: Megaphone, path: "announcement" },
  { name: "Plan Management", icon: CreditCard, path: "plan" },
  { name: "Product Management", icon: ShoppingBasket, path: "products" },
  { name: "Notes", icon: NotebookTabs, path: "notes" },
  { name: "Customers", icon: UsersIcon, path: "customer" },
  { name: "Ban Ip", icon: Ban, path: "ban-ip" },
  { name: "Admin Logs", icon: Logs, path: "admin-logs" },
];

const MobileNavbar =()=> {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="fixed md:hidden  bottom-0 inset-x-0 bg-zinc-900 border-t border-zinc-700 flex justify-around py-2 z-50 shadow-xl">
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        const isActive = index === activeIndex

        return (
        <Link key={index} to={`/dashboard/admin/${tab.path}`}>
          <button
            key={tab.name}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "flex flex-col items-center justify-center px-0 py-1 h-full relative text-sm transition-all",
              isActive ? "text-white" : "text-zinc-400"
            )}
          >
            <motion.div
              initial={false}
              animate={{
                y: isActive ? -4 : 0,
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
            {/* <span className="mt-1">{tab.name}</span> */}

            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-md"
              />
            )}
          </button>
          </Link>
        )
      })}
    </div>
  )
}


export default MobileNavbar;