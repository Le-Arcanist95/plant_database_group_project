import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decodedToken = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : null;

    const roles = decodedToken?.UserInfo?.roles || [];

    return (
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet /> 
            : auth?.user
                ?   <Navigate to="/unauthorized" state={{from: location }} replace />
                :   <Navigate to="/login" state={{from: location }} replace />
    );
};

export default RequireAuth;