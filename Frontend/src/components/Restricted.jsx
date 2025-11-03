import { useAuth } from "../context/AuthProvide";

const Restricted = ({ children, rolesAllowed }) => {
    const { userRole } = useAuth();

    if (rolesAllowed.includes(userRole)) {
        return <>{children}</>;
    }

    return null;
};

export default Restricted;