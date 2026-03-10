'use client';

import React from 'react';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface Course {
    id: number;
    title: string;
    category: string;
    duration: string;
    progress: number;
}

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Play size={20} fill="currentColor" />
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div className="mb-6">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{course.category}</p>
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{course.title}</h3>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 font-medium">
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                </div>
                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                <span>8 Lessons</span>
            </div>

            <div className="space-y-4">
                <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        className="h-full bg-blue-600 rounded-full"
                    ></motion.div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">{course.progress}%</span>
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Resume</button>
                </div>
            </div>
        </div>
    );
}
