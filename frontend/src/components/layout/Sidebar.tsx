'use client';

import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    BookOpen,
    Map,
    Trophy,
    TrendingUp,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Map, label: 'Learning Paths', path: '/learning-paths' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: TrendingUp, label: 'My Progress', path: '/progress' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (val: boolean) => void }) {
    const { logout } = useAuth();

    return (
        <aside
            className={cn(
                "h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {!collapsed && <span className="text-xl font-bold text-blue-600">SkillStream</span>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 mt-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.path}
                        className={cn(
                            "flex items-center gap-4 px-3 py-3 rounded-xl transition-all mb-1 cursor-pointer",
                            "hover:bg-blue-50 text-gray-500 hover:text-blue-600",
                            collapsed && "justify-center px-0"
                        )}
                    >
                        <item.icon size={22} strokeWidth={1.5} />
                        {!collapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className={cn(
                        "flex items-center gap-4 px-3 py-3 rounded-xl w-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <LogOut size={22} strokeWidth={1.5} />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
