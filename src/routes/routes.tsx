import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layout/dashboardLayout";
import UserManagement from "../components/dashboard/user-management";
import PaywallControl from "../components/dashboard/paywall-control";
import CoffeeShopManagement from "../components/dashboard/coffee-shop-management";
import AccessDenied from "../pages/error/ForbiddenAccess";
import ErrorPage from "../pages/error/errorPage";
import AnalyticsDashboard from "../components/dashboard/analytics-and-tracking";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/dashboard/admin',
        element:<DashboardLayout/>,
        errorElement:<ErrorPage/>,
        children:[
        {
            path:'analytics-and-tracking',
            element:<AnalyticsDashboard/>
        },
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
    },
    {

        path:'/access-denied',
        element:<AccessDenied/>
    }
])


export default router;