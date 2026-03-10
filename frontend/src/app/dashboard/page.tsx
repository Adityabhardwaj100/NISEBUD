'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import LearningPathGrid from '@/components/dashboard/LearningPathGrid';
import CourseCard from '@/components/dashboard/CourseCard';
import ProgressWidget from '@/components/dashboard/ProgressWidget';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Mock data for initial UI
const MOCK_PATHS = [
    {
        id: 1,
        title: 'ENTREPRENEURSHIP DEVELOPMENT',
        description: 'Comprehensive guide to building and managing a successful business enterprise.',
        difficulty: 'Intermediate',
        duration: '20 hours',
        progress: 0,
        slug: 'entrepreneurship',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: 2,
        title: 'AI Developer',
        description: 'Master the arts of building intelligent systems and deploying AI models.',
        difficulty: 'Advanced',
        duration: '45 hours',
        progress: 15,
        slug: 'ai-developer',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: 3,
        title: 'Software Developer',
        description: 'Full-stack engineering path from frontend to backend architecture.',
        difficulty: 'Beginner',
        duration: '60 hours',
        progress: 10,
        slug: 'software-developer',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: 4,
        title: 'Agentic and Automation',
        description: 'Build autonomous agents and workflow automation systems.',
        difficulty: 'Intermediate',
        duration: '30 hours',
        progress: 5,
        slug: 'agentic-automation',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    },
];

const MOCK_COURSES = [
    { id: 1, title: 'Introduction to Python', category: 'Programming', duration: '4h 30m', progress: 80 },
    { id: 2, title: 'UI/UX Design Principles', category: 'Design', duration: '6h 15m', progress: 45 },
    { id: 3, title: 'Data Science with R', category: 'Data Science', duration: '12h 00m', progress: 10 },
    { id: 4, title: 'Next.js 14 Deep Dive', category: 'Web Dev', duration: '8h 45m', progress: 0 },
];

const MOCK_STATS = {
    coursesCompleted: 12,
    lessonsCompleted: 45,
    streak: 5,
    badges: [
        { id: 1, name: 'Quick Learner', icon: 'zap' },
        { id: 2, name: '7-Day Streak', icon: 'calendar' },
        { id: 3, name: 'AI Explorer', icon: 'cpu' },
    ],
};

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !loading && !user) {
            window.location.href = 'http://46.202.162.116:3000/auth/google';
        }
    }, [mounted, loading, user]);

    if (!mounted || loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto">
                <WelcomeBanner name={user.name} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Learning Paths</h2>
                                    <p className="text-gray-500 text-sm mt-1">Structured tracks to master new skills</p>
                                </div>
                                <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                                    See all paths
                                </button>
                            </div>
                            <LearningPathGrid paths={MOCK_PATHS} />
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">In Progress</h2>
                                    <p className="text-gray-500 text-sm mt-1">Pick up where you left off</p>
                                </div>
                                <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                                    View full schedule
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {MOCK_COURSES.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar Widgets */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ProgressWidget stats={MOCK_STATS} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
