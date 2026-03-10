"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LearningPathGrid from '@/components/dashboard/LearningPathGrid';
import { Search, Filter, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function CoursesPage() {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>
                        <p className="text-gray-500 mt-1">Discover structured learning paths to master new skills</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm shrink-0">
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <BookOpen size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">All Learning Paths</h2>
                        </div>
                        <LearningPathGrid paths={MOCK_PATHS} />
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
