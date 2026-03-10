'use client';

import React from 'react';
import { Clock, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Path {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    progress: number;
    image: string;
}

export default function LearningPathGrid({ paths }: { paths: Path[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path, index) => (
                <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
                >
                    <div className="h-40 overflow-hidden relative">
                        <img src={path.image} alt={path.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                            {path.difficulty}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{path.title}</h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{path.description}</p>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Clock size={14} />
                                <span>{path.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <BarChart size={14} />
                                <span>8 Lessons</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-gray-400">Completion</span>
                                <span className="text-blue-600">{path.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${path.progress}%` }}
                                    className="h-full bg-blue-600 rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
