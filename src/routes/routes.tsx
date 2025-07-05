import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layout/dashboardLayout";
import UserManagement from "../components/dashboard/user-management";
import PaywallControl from "../components/dashboard/paywall-control";
import CoffeeShopManagement from "../components/dashboard/coffee-shop-management";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/dashboard/admin',
        element:<DashboardLayout/>,
        children:[
        {
            path:'user-management',
            element:<UserManagement/>
        },
        {
            path:'paywall-control',
            element:<PaywallControl/>
        },
        {
            path:'coffee-shop-management',
            element:<CoffeeShopManagement/>
        }
    ]
    }
])


export default router;