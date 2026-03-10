'use client';

import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="What do you want to learn today?"
                        className="w-full bg-gray-50 border border-transparent focus:border-blue-100 focus:bg-white rounded-2xl py-2 pl-10 pr-4 outline-none transition-all text-sm text-gray-700"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors relative">
                    <Bell size={20} strokeWidth={1.5} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-gray-400">{user ? 'Pro Member' : 'Guest'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:ring-4 ring-blue-50 transition-all overflow-hidden border border-blue-100">
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={20} />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
