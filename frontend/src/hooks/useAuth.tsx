'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://46.202.162.116:5000',
    withCredentials: true,
});

interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
}

const AuthContext = createContext<{
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
}>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/api/user');
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = () => {
        window.location.href = 'http://46.202.162.116:5000/auth/google';
    };

    const logout = () => {
        window.location.href = 'http://46.202.162.116:5000/auth/logout';
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
