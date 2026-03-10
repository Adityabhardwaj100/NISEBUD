"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, BarChart, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CHAPTERS = [
    { id: 1, title: "Ice Breaking", page: 1 },
    { id: 2, title: "Entrepreneurial Motivation", page: 4 },
    { id: 3, title: "Entrepreneur & Entrepreneurship", page: 11 },
    { id: 4, title: "Business Opportunity Identification", page: 25 },
    { id: 5, title: "Step by Step Planning", page: 35 },
    { id: 6, title: "Entrepreneurial Support Ecosystem", page: 37 },
    { id: 7, title: "Market Survey", page: 68 },
    { id: 8, title: "Understanding of Banking and Funding", page: 73 },
    { id: 9, title: "Developing a Business Plan", page: 86 },
    { id: 10, title: "Business Management", page: 101 },
    { id: 11, title: "Financial Management", page: 130 },
    { id: 12, title: "Business Laws & Statutory Business Registrations", page: 138 },
    { id: 13, title: "Establishing the Enterprise", page: 147 },
    { id: 14, title: "Sustainability and Growth of Business", page: 156 },
    { id: 15, title: "Life Skills & Self Care", page: 161 },
];

export default function EntrepreneurshipCourse() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-6"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                                Intermediate
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">ENTREPRENEURSHIP DEVELOPMENT</h1>
                            <p className="text-gray-500 max-w-2xl">
                                Become a successful entrepreneur by mastering business identification, planning, legalities, and growth strategies through this comprehensive curriculum.
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-gray-900">15</span>
                                <span className="text-xs text-gray-400 font-medium">Chapters</span>
                            </div>
                            <div className="w-px h-10 bg-gray-100" />
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-gray-900">20h</span>
                                <span className="text-xs text-gray-400 font-medium">Duration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum section */}
            <div className="max-w-5xl mx-auto px-6 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <BookOpen className="text-blue-600" size={24} />
                        Course Curriculum
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <CheckCircle2 className="text-green-500" size={18} />
                        Progress tracked automatically
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {CHAPTERS.map((chapter, index) => (
                        <Link
                            key={chapter.id}
                            href={`/courses/entrepreneurship/chapter/${chapter.id}`}
                            className="block"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer flex items-center justify-between"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {chapter.id}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            Chapter {chapter.id}: {chapter.title}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                                <Clock size={12} />
                                                Reading Time: ~{Math.floor(Math.random() * 20) + 15} min
                                            </div>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                                Page: {chapter.page}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-5 py-2 rounded-xl bg-gray-50 text-gray-600 text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {chapter.id === 3 ? 'View Content' : 'Start Chapter'}
                                    </span>
                                    <ChevronRight className="text-gray-300 group-hover:text-blue-600 transition-colors" size={20} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 bg-blue-600 rounded-3xl p-10 text-center text-white shadow-2xl shadow-blue-600/20">
                    <h2 className="text-3xl font-bold mb-4">Start your entrepreneurial journey</h2>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                        Get all the tools, resources and support you need to launch and scale your business from scratch.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-black/10">
                        Enroll in Course
                    </button>
                </div>
            </div>
        </div>
    );
}
