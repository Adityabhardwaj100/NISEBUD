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
        title: 'AI Fundamentals',
        description: 'Master the basics of Artificial Intelligence and Machine Learning.',
        difficulty: 'Beginner',
        duration: '10 hours',
        progress: 65,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: 2,
        title: 'Generative AI Applications',
        description: 'Learn how to build and deploy generative AI solutions.',
        difficulty: 'Intermediate',
        duration: '15 hours',
        progress: 30,
        image: 'https://images.unsplash.com/photo-1676299081847-824911ff586d?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: 3,
        title: 'Cloud Computing Basics',
        description: 'Understand the core concepts of cloud platforms and services.',
        difficulty: 'Beginner',
        duration: '8 hours',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
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
            window.location.href = 'http://localhost:5000/auth/google';
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
