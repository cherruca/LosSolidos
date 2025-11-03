import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvide";

const ProtectedRoutes = ({ children, rolesAllowed }) => {
    const { userRole } = useAuth();

    return rolesAllowed.includes(userRole) ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoutes;