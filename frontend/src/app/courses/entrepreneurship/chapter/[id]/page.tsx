"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, FileText, Video, ChevronRight, ChevronLeft, CheckCircle2, Star, Quote, Award, Lightbulb, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const QUIZ_QUESTIONS = [
    {
        question: "What is a core trait of an entrepreneur mentioned in the Kaafal story?",
        options: ["Relying on others", "Persevering undeterred by obstacles", "Avoiding all risks", "Focusing only on city life"],
        answer: 1
    },
    {
        question: "What did Shambhavi Mishra learn during the NIESBUD training?",
        options: ["Only technical skills", "How to find a government job", "Business technicalities, crisis management, and personality development", "How to manage factory workers"],
        answer: 2
    },
    {
        question: "What is the difference between a Goal and an Objective?",
        options: ["They are the same", "Goals are specific, Objectives are general", "Goals are long-term aims; Objectives are specific and measurable", "Objectives are time-bound; Goals are not"],
        answer: 2
    }
];

export default function ChapterViewer() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const chapter = CHAPTERS.find(c => c.id === id);
    const [activeSlide, setActiveSlide] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    if (!chapter) return <div>Chapter not found</div>;

    const handleAnswer = (index: number) => {
        if (index === QUIZ_QUESTIONS[currentQuestion].answer) {
            setScore(score + 1);
        }

        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
    };

    const prevChapter = CHAPTERS.find(c => c.id === id - 1);
    const nextChapter = CHAPTERS.find(c => c.id === id + 1);

    // CHAPTER 3 CONTENT SLIDES
    const chapter3Slides = [
        {
            title: "Entrepreneurial Introduction",
            content: (
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                                <Video size={22} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Visual Learning</h2>
                        </div>
                        <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-2xl">
                            <video controls className="w-full h-full" poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80">
                                <source src="/courses/entrepreneurship/chapter_3.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-600/20">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Lightbulb size={24} /> Key Objective
                        </h3>
                        <p className="text-indigo-100 leading-relaxed text-lg">
                            In this chapter, we explore the core traits of an entrepreneur: **Persevering**, **Information-Seeking**, and **Self-Confidence**. Through real-world stories like "Kaafal" and "Star Cyber Cafe", you'll see these traits in action.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "II. Persevering",
            content: (
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                        <p className="text-lg text-slate-600 leading-relaxed italic mb-8 border-l-4 border-indigo-500 pl-6">
                            "An entrepreneur always makes concerted efforts towards the successful completion of a goal. They are undeterred by uncertainties, risks, obstacles, or difficulties."
                        </p>
                        <div className="relative">
                            <div className="absolute top-0 right-0 opacity-10">
                                <Quote size={120} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Story: Kaafal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-4 text-slate-600 leading-relaxed">
                                    <p>Kanika was born in Devbhumi Uttarakhand in 1989. She was high on aspiration and had zeal to do something big in her life. While pursuing her B.A. in Home Science she started working for social cause.</p>
                                    <p>Time passed and after obtaining her M.A. she started fashion designing and worked in a multinational company. But she wanted to do something else in her life.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 italic">
                                    "She left the luxury of living in the city and returned to look after her ancestral heritage. She received training through NIESBUD and moved ahead."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "III. Risk Taking",
            content: (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Star className="text-amber-500" size={24} /> Strategic Questions
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "How big is the potential loss?",
                                    "What is the probability of failure?",
                                    "How can I minimise negative effects?",
                                    "What past experiences inform this strategy?"
                                ].map((q, i) => (
                                    <li key={i} className="flex gap-3 text-slate-600">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-xs font-bold text-slate-400">{i + 1}</div>
                                        {q}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Story: Shambhavi Mishra</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                "My father wanted me to do Government job but I had a strong inclination to do business of own from childhood... I decided that I will establish my identity with my business."
                            </p>
                            <div className="p-4 bg-emerald-50 rounded-xl text-emerald-700 text-sm font-medium">
                                Shambhavi started Star Cyber Cafe with a loan of Rs. 4 Lakhs under PMEGP and now earns Rs. 20,000/- monthly.
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "V. Information-Seeking",
            content: (
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Mastering Information</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Successful entrepreneurs do not rely on guesswork. They spend time collecting information about customers, competitors, suppliers, and markets.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <h4 className="font-bold text-indigo-600 mb-3 flex items-center gap-2"><ArrowLeft size={16} /> Finance</h4>
                                <ul className="text-sm space-y-2 text-slate-500">
                                    <li>• Micro-finance conditions</li>
                                    <li>• Government facilities</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <h4 className="font-bold text-indigo-600 mb-3 flex items-center gap-2"><ArrowLeft size={16} /> Legislation</h4>
                                <ul className="text-sm space-y-2 text-slate-500">
                                    <li>• Business registration</li>
                                    <li>• Tax obligations</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Leadership Quality",
            content: (
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Self-Assessment</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "I'm polite to the team.",
                                "I look for things we agree about.",
                                "I learn from mistakes.",
                                "I get others involved in decisions.",
                                "I focus on finding positive solutions.",
                                "I listen carefully.",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-slate-600 transition-all hover:bg-white hover:border-indigo-100 border border-transparent">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-bold shadow-sm">{i + 4}</div>
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800">
                            <p className="text-sm font-bold uppercase tracking-widest mb-2">Scoring Guide</p>
                            <p className="text-lg font-bold">36 - 28 Score</p>
                            <p className="text-sm">You’re doing a great job as a wholesome leader!</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Case Study & Assessment",
            content: (
                <div className="space-y-8">
                    {!quizStarted ? (
                        <>
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    The Amul Pattern
                                </h2>
                                <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 text-sm leading-loose">
                                    "The combined effort resulted in creation of the National Dairy Development Board (NDDB) in the year 1965... Dr. Kurien took charge and began the task of replicating the pattern of the working at Anand to other parts of the country."
                                </div>
                            </div>

                            <div className="bg-indigo-600 p-10 rounded-3xl text-white text-center shadow-2xl shadow-indigo-600/30">
                                <Award size={48} className="mx-auto mb-6 opacity-80" />
                                <h2 className="text-3xl font-bold mb-4">Chapter Assessment</h2>
                                <p className="text-indigo-100 mb-8 max-w-md mx-auto">
                                    Test your knowledge of the entrepreneurial traits we've covered in this chapter.
                                </p>
                                <button
                                    onClick={() => setQuizStarted(true)}
                                    className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
                                >
                                    Start Chapter 3 Quiz
                                </button>
                            </div>
                        </>
                    ) : quizFinished ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-12 rounded-[40px] text-center shadow-2xl border border-slate-100"
                        >
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                <GraduationCap size={48} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 mb-4">Quiz Completed!</h2>
                            <p className="text-xl text-slate-500 mb-10">You scored <span className="text-indigo-600 font-black">{score}</span> out of <span className="font-bold">{QUIZ_QUESTIONS.length}</span></p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetQuiz}
                                    className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                                >
                                    Retake Quiz
                                </button>
                                <Link
                                    href="/courses/entrepreneurship"
                                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all"
                                >
                                    Course Curriculum
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl">
                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mt-1">{QUIZ_QUESTIONS[currentQuestion].question}</h2>
                                </div>
                                <div className="text-slate-300 font-serif text-6xl opacity-20 italic">"</div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(idx)}
                                        className="text-left p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className="text-slate-700 font-medium">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    ];

    const currentSlide = chapter3Slides[activeSlide];

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/courses/entrepreneurship" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="h-6 w-px bg-slate-200 mx-2" />
                        <div>
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                                Chapter {chapter.id}
                            </p>
                            <h1 className="text-sm font-bold text-slate-800 line-clamp-1">
                                {chapter.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {id === 3 ? (
                            <div className="hidden md:flex items-center gap-2 mr-4 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                <div className="flex -space-x-1">
                                    {chapter3Slides.map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full border border-white ${i <= activeSlide ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                                    ))}
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">Step {activeSlide + 1} of {chapter3Slides.length}</span>
                            </div>
                        ) : null}

                        {(id !== 3 || activeSlide === 0) && prevChapter && (
                            <Link href={`/courses/entrepreneurship/chapter/${prevChapter.id}`} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                                <ChevronLeft size={18} />
                                <span className="hidden sm:inline">Prev Chapter</span>
                            </Link>
                        )}
                        {(id !== 3 || activeSlide === chapter3Slides.length - 1) && nextChapter && (
                            <Link href={`/courses/entrepreneurship/chapter/${nextChapter.id}`} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                                <span className="hidden sm:inline">Next Chapter</span>
                                <ChevronRight size={18} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-12">
                {id === 3 ? (
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-slate-900">{currentSlide.title}</h2>
                                    <div className="h-1 w-20 bg-indigo-500 rounded-full mt-2" />
                                </div>
                                {currentSlide.content}
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide Navigation Controls */}
                        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
                            <button
                                onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                                disabled={activeSlide === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${activeSlide === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 bg-white border border-slate-200 hover:border-indigo-200 shadow-sm'}`}
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>

                            <div className="flex gap-2">
                                {chapter3Slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveSlide(i)}
                                        className={`w-3 h-3 rounded-full transition-all ${i === activeSlide ? 'bg-indigo-600 w-8' : 'bg-slate-300 hover:bg-indigo-300'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setActiveSlide(Math.min(chapter3Slides.length - 1, activeSlide + 1))}
                                disabled={activeSlide === chapter3Slides.length - 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${activeSlide === chapter3Slides.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-white bg-indigo-600 shadow-xl shadow-indigo-600/20 hover:scale-105'}`}
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-8 border-4 border-white shadow-inner">
                            <FileText size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Chapter Content Under Review</h2>
                        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                            Contribute your success story and learn from the best in Chapter 3.
                        </p>
                        <Link href="/courses/entrepreneurship/chapter/3" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-transform">
                            Explore Chapter 3
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
