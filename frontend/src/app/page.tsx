'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function LandingPage() {
  const { user, login } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold tracking-tight">SkillStream</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Courses</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Community</a>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
              Dashboard
            </Link>
          ) : (
            <>
              <button onClick={login} className="text-sm font-bold text-gray-600 hover:text-blue-600 px-4 py-2">
                Log in
              </button>
              <button onClick={login} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} />
              <span>The future of learning is here</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              Master the skills that <span className="text-blue-600">matter.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
              SkillStream is a modern learning platform designed to help you stay ahead in the rapidly evolving world of technology and design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group">
                Join for free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-700 border border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                Watch Demo
              </button>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-sm text-gray-400">Active Students</p>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div>
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-sm text-gray-400">User Rating</p>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div>
                <p className="text-2xl font-bold">1200+</p>
                <p className="text-sm text-gray-400">Expert Courses</p>
              </div>
            </div>
          </motion.div>

          {/* Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[60px] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="w-3/4 h-3/4 bg-white rounded-3xl shadow-2xl relative z-10 p-8 flex flex-col justify-between border border-blue-50">
                <div className="space-y-4">
                  <div className="w-1/2 h-4 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-50 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2/3 h-4 bg-gray-50 rounded-full animate-pulse delay-150"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                    <Zap size={24} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="w-1/3 h-3 bg-gray-100 rounded-full"></div>
                    <div className="w-full h-2 bg-blue-100 rounded-full relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-blue-600"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute top-12 left-12 p-4 bg-white rounded-2xl shadow-xl border border-blue-50 text-blue-600">
                <Shield size={32} />
              </div>
              <div className="absolute bottom-12 right-12 p-4 bg-white rounded-2xl shadow-xl border border-blue-50 text-blue-600">
                <Globe size={32} />
              </div>
            </div>
            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
