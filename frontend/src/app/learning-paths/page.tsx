"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Map, Construction } from 'lucide-react';

export default function LearningPathsPage() {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-8">
                    <Map size={40} />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Learning Paths</h1>
                <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                    Detailed learning maps are coming soon. In the meantime, you can explore individual courses in the dashboard.
                </p>
                <div className="flex items-center gap-2 px-6 py-3 bg-orange-50 text-orange-600 rounded-2xl font-bold">
                    <Construction size={20} />
                    Under Development
                </div>
            </div>
        </DashboardLayout>
    );
}
