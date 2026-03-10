'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeBanner({ name }: { name: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white"
        >
            <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 text-blue-100 mb-4">
                    <Sparkles size={18} />
                    <span className="text-sm font-medium uppercase tracking-wider">Welcome back</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Continue your learning journey, {name}</h1>
                <p className="text-blue-100 text-lg mb-8 opacity-90">
                    You've made great progress this week. Stay on track and achieve your goals with our personalized learning paths.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-95">
                    Start Learning <ArrowRight size={18} />
                </button>
            </div>

            <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
                <svg viewBox="0 0 400 400" className="h-full w-full">
                    <circle cx="200" cy="200" r="150" fill="currentColor" />
                    <circle cx="350" cy="150" r="100" fill="currentColor" />
                </svg>
            </div>
        </motion.div>
    );
}
