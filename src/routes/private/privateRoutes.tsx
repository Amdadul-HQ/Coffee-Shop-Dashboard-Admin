import { ReactNode } from "react";
import { seletCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const ProtectedRoute = ({children}:{children:ReactNode}) => {
    const token = useAppSelector(useCurrentToken);

    const user = useAppSelector(seletCurrentUser)

    //if no token. 
    if(!token){
        return <Navigate to='/login' replace={true}/>
    }

    // validate is the user is admin
    if(user?.role !== "admin"){
        return <Navigate to='/access-denied' replace={true}/>
    }

    

    return children
};

export default ProtectedRoute;