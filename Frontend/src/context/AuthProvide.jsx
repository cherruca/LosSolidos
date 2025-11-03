import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('user');

    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
    }

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated, logout, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);