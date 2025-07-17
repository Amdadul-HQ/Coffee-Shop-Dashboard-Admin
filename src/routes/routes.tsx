import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layout/dashboardLayout";
import UserManagement from "../components/dashboard/user-management";
import PaywallControl from "../components/dashboard/paywall-control";
import CoffeeShopManagement from "../components/dashboard/coffee-shop-management";
import AccessDenied from "../pages/error/ForbiddenAccess";
import ErrorPage from "../pages/error/errorPage";
import AnalyticsDashboard from "../components/dashboard/analytics-and-tracking";
import ProtectedRoute from "./private/privateRoutes";
import AccoutSuspend from "../pages/error/accoutSuspended";
import AnnouncementPage from "../components/dashboard/announcement";
import AnnouncementsList from "../components/dashboard/all-announcement";
import NotificationsList from "../components/dashboard/admin-all-notification";
import AddNoteDialog from "../components/dashboard/admin-all-notes";
import UserAdminNotesList from "../components/dashboard/admin-all-notes";
import StripePlansList from "../components/dashboard/plan-management";
import StripeProductsList from "../components/dashboard/admin-all-product";
import StripeCustomersList from "../components/dashboard/admin-customer-list";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/dashboard/admin',
        element:(
            <ProtectedRoute>
                    <DashboardLayout/>
            </ProtectedRoute>
        ),
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
        },
        {
            path:'announcement',
            element:<AnnouncementPage/>
        },
        {
            path:'all-announcement',
            element:<AnnouncementsList/>
        },
        {
            path:'notifications',
            element:<NotificationsList/>
        },
        {
            path:'notes',
            element:<UserAdminNotesList/>
        },
        {
            path:'plan',
            element:<StripePlansList/>
        },
        {
            path:'products',
            element:<StripeProductsList/>
        },
        {
            path:'customer',
            element:<StripeCustomersList/>
        }
    ]
    },
    {

        path:'/access-denied',
        element:<AccessDenied/>
    },
    {
        path:'/account-suspended',
        element:<AccoutSuspend/>
    }
])


export default router;