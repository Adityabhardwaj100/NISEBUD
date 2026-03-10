'use client';

import React from 'react';
import { CheckCircle2, Flame, Award } from 'lucide-react';
import Link from 'next/link';

interface Stats {
    coursesCompleted: number;
    lessonsCompleted: number;
    streak: number;
    badges: Array<{ id: number; name: string; icon: string }>;
}

export default function ProgressWidget({ stats }: { stats: Stats }) {
    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Progress Overview</h3>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{stats.coursesCompleted}</p>
                            <p className="text-xs text-gray-500 font-medium">Courses Completed</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <Award size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{stats.lessonsCompleted}</p>
                            <p className="text-xs text-gray-500 font-medium">Lessons Completed</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
                            <Flame size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{stats.streak} day streak</p>
                            <p className="text-xs text-gray-500 font-medium">Keep it going!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Achievements</h3>
                    <Link href="/achievements" className="text-xs font-bold text-blue-600 hover:text-blue-700">View All</Link>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {stats.badges.map((badge) => (
                        <div key={badge.id} className="flex flex-col items-center group cursor-pointer">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-2 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all border border-transparent group-hover:border-blue-100">
                                <Award size={24} />
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 text-center line-clamp-1">{badge.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
