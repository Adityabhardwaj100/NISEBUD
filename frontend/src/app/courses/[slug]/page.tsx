"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Construction, BookOpen } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useParams } from 'next/navigation';

export default function GenericCoursePage() {
    const params = useParams();
    const slug = params.slug as string;

    // Format slug for display
    const title = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Course';

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto py-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-8 border border-blue-100 shadow-sm">
                    <BookOpen size={40} />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
                <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                    The curriculum for this track is currently being prepared. Check back soon for the full learning path and lessons.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link href="/dashboard" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform">
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-2 px-6 py-3 bg-orange-50 text-orange-600 rounded-2xl font-bold border border-orange-100">
                        <Construction size={20} />
                        Under Development
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
