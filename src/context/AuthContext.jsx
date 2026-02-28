import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for an existing session
        const storedUserId = localStorage.getItem('nexura_current_user_id');
        if (storedUserId) {
            const allUsers = JSON.parse(localStorage.getItem('nexura_users')) || [];
            const foundUser = allUsers.find(u => u.id === storedUserId);
            if (foundUser) {
                setUser(foundUser);
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('nexura_current_user_id', userData.id);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nexura_current_user_id');
    };

    if (loading) return <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
