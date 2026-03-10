"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Construction } from 'lucide-react';

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-600 mb-8">
                    <Settings size={40} />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Account Settings</h1>
                <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                    Personalization and account management features are under development.
                </p>
                <div className="flex items-center gap-2 px-6 py-3 bg-orange-50 text-orange-600 rounded-2xl font-bold">
                    <Construction size={20} />
                    Building...
                </div>
            </div>
        </DashboardLayout>
    );
}
