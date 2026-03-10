"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ChevronRight, Trophy, Flame, Rocket, Orbit } from 'lucide-react';

export default function AchievementsPage() {
    const radarCanvasRef = useRef<HTMLCanvasElement>(null);
    const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [streakCount, setStreakCount] = useState(7);
    const [claimed, setClaimed] = useState(false);
    const [overallPct, setOverallPct] = useState(0);

    useEffect(() => {
        // Cursor glow
        const handleMouseMove = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.left = e.clientX + 'px';
                glowRef.current.style.top = e.clientY + 'px';
            }
        };
        document.addEventListener('mousemove', handleMouseMove);

        // Fade-up animation
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => (e.target as HTMLElement).classList.add('visible'), i * 80);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));

        // Overall bar animate
        setTimeout(() => {
            const pctTarget = 68;
            let currentPct = 0;
            const interval = setInterval(() => {
                currentPct++;
                setOverallPct(currentPct);
                if (currentPct >= pctTarget) clearInterval(interval);
            }, 18);
        }, 600);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Radar Chart implementation
    useEffect(() => {
        const canvas = radarCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const cxBase = W / 2;
        const cyBase = H / 2 + 8;
        const R = 108;
        const sides = 5;

        const skills = [
            { label: 'Entrepreneurship', base: 0.78, color: '#4f46e5' },
            { label: 'Finance', base: 0.62, color: '#10b981' },
            { label: 'Marketing', base: 0.85, color: '#f59e0b' },
            { label: 'Leadership', base: 0.70, color: '#ef4444' },
            { label: 'Innovation', base: 0.55, color: '#7c3aed' },
        ];

        let cx = cxBase, cy = cyBase;
        let targetCx = cxBase, targetCy = cyBase;
        let entranceProgress = 0;
        let mouseX = cxBase, mouseY = cyBase;
        let hoveredSkill = -1;
        let ripples: any[] = [];

        const pentPt = (i: number, r: number, extraAngle = 0) => {
            const a = (2 * Math.PI * i / sides) - Math.PI / 2 + extraAngle;
            return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            mouseX = mx;
            mouseY = my;

            const dx = mx - cxBase;
            const dy = my - cyBase;
            targetCx = cxBase + dx * 0.08;
            targetCy = cyBase + dy * 0.08;

            let currentHover = -1;
            skills.forEach((s, i) => {
                const pt = pentPt(i, R * s.base);
                const distDx = mx - pt.x;
                const distDy = my - pt.y;
                if (Math.sqrt(distDx * distDx + distDy * distDy) < 18) currentHover = i;
            });
            hoveredSkill = currentHover;

            if (tooltipRef.current) {
                if (hoveredSkill !== -1) {
                    const sk = skills[hoveredSkill];
                    tooltipRef.current.style.opacity = '1';
                    tooltipRef.current.textContent = `${sk.label}: ${Math.round(sk.base * 100)}%`;
                    tooltipRef.current.style.left = (e.clientX + 14) + 'px';
                    tooltipRef.current.style.top = (e.clientY - 10) + 'px';
                } else {
                    tooltipRef.current.style.opacity = '0';
                }
            }
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, alpha: 0.6 });
        };

        const handleMouseLeave = () => {
            hoveredSkill = -1;
            targetCx = cxBase; targetCy = cyBase;
            if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        let animationId: number;
        let startTs: number | null = null;

        const draw = (ts: number) => {
            if (!startTs) startTs = ts;
            entranceProgress = (ts - startTs) / 1000;

            ctx.clearRect(0, 0, W, H);
            cx += (targetCx - cx) * 0.12;
            cy += (targetCy - cy) * 0.12;

            const ep = Math.min(entranceProgress, 1);
            const ease = 1 - Math.pow(1 - ep, 3);

            // Grid
            for (let level = 1; level <= 5; level++) {
                ctx.beginPath();
                for (let i = 0; i < sides; i++) {
                    const pt = pentPt(i, R * (level / 5));
                    i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
                }
                ctx.closePath();
                ctx.strokeStyle = level === 5 ? '#c7d2fe' : '#e2e8f0';
                ctx.lineWidth = level === 5 ? 1.5 : 1;
                ctx.stroke();
            }

            // Spokes
            for (let i = 0; i < sides; i++) {
                const p = pentPt(i, R);
                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
                ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
            }

            // Polygon
            ctx.save();
            ctx.shadowColor = 'rgba(79,70,229,0.15)';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            skills.forEach((s, i) => {
                const pt = pentPt(i, R * s.base * ease);
                i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
            });
            ctx.closePath();
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
            grad.addColorStop(0, 'rgba(79,70,229,0.3)');
            grad.addColorStop(0.7, 'rgba(99,102,241,0.1)');
            grad.addColorStop(1, 'rgba(124,58,237,0.02)');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.strokeStyle = '#4f46e5';
            ctx.lineWidth = 2.2;
            ctx.stroke();
            ctx.restore();

            // Dots
            skills.forEach((s, i) => {
                const pt = pentPt(i, R * s.base * ease);
                const isHov = (i === hoveredSkill);
                const dotR = isHov ? 8 : 5.5;

                ctx.beginPath(); ctx.arc(pt.x, pt.y, dotR, 0, Math.PI * 2);
                ctx.fillStyle = isHov ? s.color : '#fff';
                ctx.fill();
                ctx.strokeStyle = s.color;
                ctx.lineWidth = 2.2;
                ctx.stroke();

                if (isHov) {
                    ctx.beginPath(); ctx.arc(pt.x, pt.y, dotR + 6, 0, Math.PI * 2);
                    ctx.strokeStyle = s.color + '66'; ctx.lineWidth = 2; ctx.stroke();
                }
            });

            // Overall center
            if (ep >= 0.95) {
                const overallVal = Math.round(skills.reduce((a, v) => a + v.base, 0) / skills.length * 100);
                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = '#4f46e5'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(`${overallVal}%`, cx, cy);
            }

            // Ripples
            ripples = ripples.filter(rp => rp.alpha > 0.01);
            ripples.forEach(rp => {
                ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(99,102,241,${rp.alpha})`;
                ctx.lineWidth = 2; ctx.stroke();
                rp.r += 2; rp.alpha *= 0.94;
            });

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Confetti implementation
    const launchConfetti = () => {
        const canvas = confettiCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let pieces: any[] = [];
        for (let i = 0; i < 180; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: -10,
                r: Math.random() * 7 + 3,
                clr: `hsl(${Math.random() * 360},90%,60%)`,
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 5 + 2,
                rot: Math.random() * 360,
                rv: (Math.random() - 0.5) * 8,
                shape: Math.random() < 0.5 ? 'circle' : 'rect',
            });
        }

        const animConf = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.clr;
                if (p.shape === 'circle') {
                    ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();
                } else {
                    ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
                }
                ctx.restore();
                p.x += p.vx; p.y += p.vy;
                p.rot += p.rv;
                p.vy += 0.12;
            });
            pieces = pieces.filter(p => p.y < canvas.height + 20);
            if (pieces.length) requestAnimationFrame(animConf);
        };
        animConf();
    };

    const handleClaimReward = () => {
        setClaimed(true);
        launchConfetti();
    };

    return (
        <div className="min-h-screen bg-[#f0f4f8] text-[#1e293b] font-sans selection:bg-indigo-100 relative overflow-x-hidden">
            {/* Dynamic Styles */}
            <style jsx global>{`
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: none;
        }
        @keyframes flicker {
          0%, 100% { transform: scaleY(1) rotate(-3deg); }
          50% { transform: scaleY(1.15) rotate(3deg); }
        }
        .animate-flicker {
          animation: flicker 1.4s ease-in-out infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(79, 70, 229, 0); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>

            {/* Cursor Glow */}
            <div
                ref={glowRef}
                className="pointer-events-none fixed w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.12)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 z-0 transition-[left,top] duration-75 ease-linear"
            />

            {/* Confetti Canvas */}
            <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-[9998]" />

            {/* Radar Tooltip */}
            <div
                ref={tooltipRef}
                className="fixed bg-[#1e293b] text-white px-3 py-1.5 rounded-lg text-xs pointer-events-none opacity-0 transition-opacity z-[9999] whitespace-nowrap shadow-xl"
            />

            <div className="max-w-[1200px] mx-auto px-6 py-10 pb-20 relative z-10">

                {/* Back Button */}
                <div className="mb-6 fade-up">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm hover:-translate-y-0.5">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-9 page-header fade-up">
                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            🏆 Achievements
                        </h1>
                        <p className="text-slate-500 mt-1">Track your learning milestones and skill growth</p>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-5 py-2.5 shadow-lg font-bold">
                        <span className="text-2xl animate-flicker">🔥</span>
                        <span className="text-2xl font-extrabold text-indigo-600">{streakCount}</span>
                        <span className="text-slate-500 text-sm font-medium">day streak</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7">

                    {/* LEFT COLUMN */}
                    <div className="space-y-7">

                        {/* Weekly Streak Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-lg fade-up">
                            <h3 className="text-lg font-bold mb-5 text-slate-800">📅 This Week</h3>
                            <div className="flex justify-between gap-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <div key={day} className="flex flex-col items-center gap-1.5 text-[0.72rem] text-slate-500 font-medium">
                                        <div className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer hover:scale-110 
                      ${i < 4 ? 'bg-gradient-to-br from-indigo-600 to-violet-600 border-transparent shadow-[0_0_12px_rgba(79,70,229,0.4)]' :
                                                i === 3 ? 'border-indigo-600 animate-pulse-ring' : 'border-slate-200'}`}
                                        />
                                        <span>{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Badges Grid Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-lg fade-up">
                            <h3 className="text-lg font-bold mb-5 text-slate-800">🎖 Badges Earned</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: '🥇', name: 'First Step', desc: 'Completed 1st lesson', color: '#f59e0b', isNew: true },
                                    { icon: '🎯', name: 'Sharpshooter', desc: '100% quiz score', color: '#ef4444' },
                                    { icon: '🔥', name: 'On Fire', desc: '7-day streak', color: '#f97316', isNew: true },
                                    { icon: '📚', name: 'Bookworm', desc: '10 courses done', color: '#3b82f6' },
                                    { icon: '⚡', name: 'Speed Run', desc: 'Finish in record time', color: '#eab308' },
                                    { icon: '🌟', name: 'Star Pupil', desc: 'Top 5 leaderboard', color: '#8b5cf6' },
                                    { icon: '🏆', name: 'Champion', desc: 'Complete all paths', color: '#10b981', locked: true },
                                    { icon: '🧠', name: 'Mastermind', desc: 'Pass all advanced tests', color: '#6366f1', locked: true },
                                ].map((b, idx) => (
                                    <div key={idx}
                                        className={`relative overflow-hidden border border-slate-200 rounded-xl p-5 text-center cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-xl group ${b.locked ? 'grayscale opacity-45' : ''}`}
                                        style={{ '--badge-color': b.color } as any}
                                    >
                                        {b.isNew && !b.locked && <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full animate-bounce-in">NEW</span>}
                                        <span className="text-4xl mb-2.5 block transition-transform group-hover:scale-125 group-hover:rotate-6">{b.icon}</span>
                                        <div className="text-[0.82rem] font-bold text-slate-800">{b.name}</div>
                                        <div className="text-[0.7rem] text-slate-400 mt-1">{b.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Breakdown Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-lg fade-up">
                            <h3 className="text-lg font-bold mb-5 text-slate-800">📊 Progress Breakdown</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: '📖', label: 'Courses', val: 12, bg: '#ede9fe', ic: '#7c3aed' },
                                    { icon: '🧪', label: 'Labs', val: 8, bg: '#fef3c7', ic: '#d97706' },
                                    { icon: '✅', label: 'Checks', val: 24, bg: '#dcfce7', ic: '#16a34a' },
                                    { icon: '📝', label: 'Lessons', val: 47, bg: '#dbeafe', ic: '#2563eb' },
                                ].map((p, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: p.bg, color: p.ic }}>{p.icon}</div>
                                        <div>
                                            <div className="text-lg font-bold text-slate-800 leading-tight">{p.val}</div>
                                            <div className="text-[0.7rem] text-slate-400">{p.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-sm font-bold text-slate-800">Overall Completion</span>
                                    <span className="text-sm font-extrabold text-indigo-600">{overallPct}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${overallPct}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[0.78rem] text-slate-400 mt-1.5">
                                    <span>0 XP</span>
                                    <span>3400 / 5000 XP to next level</span>
                                </div>
                            </div>

                            <Link href="#" className="inline-flex items-center gap-1.5 mt-5 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-[0.85rem] font-bold text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all group">
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                View full progress
                            </Link>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-7">

                        {/* Claim Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-lg text-center fade-up">
                            <span className="text-6xl block animate-float mb-3">🚀</span>
                            <div className="text-lg font-bold text-slate-800">Daily Goal Reached!</div>
                            <div className="text-[0.8rem] text-slate-400 mt-1">You completed 3 lessons today. Claim your reward.</div>
                            <button
                                onClick={handleClaimReward}
                                disabled={claimed}
                                className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold text-white transition-all shadow-lg hover:-translate-y-1 active:scale-95
                  ${claimed ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-indigo-600 to-violet-600'}`}
                            >
                                {claimed ? (
                                    <>
                                        <CheckCircle size={18} />
                                        Claimed! 🎉
                                    </>
                                ) : (
                                    <>
                                        <Rocket size={18} />
                                        Claim Reward
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Skill Radar Chart */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-lg fade-up">
                            <h3 className="text-lg font-bold mb-5 text-slate-800 flex items-center gap-2">
                                <Orbit size={20} className="text-indigo-600" />
                                Skill Radar
                            </h3>
                            <div className="flex flex-col items-center">
                                <canvas ref={radarCanvasRef} width={324} height={300} className="rounded-xl cursor-crosshair" />
                                <div className="flex flex-wrap justify-center gap-3 mt-4">
                                    {[
                                        { label: 'Entr.', color: '#4f46e5' },
                                        { label: 'Finance', color: '#10b981' },
                                        { label: 'Mark.', color: '#f59e0b' },
                                        { label: 'Lead.', color: '#ef4444' },
                                        { label: 'Inno.', color: '#7c3aed' },
                                    ].map(s => (
                                        <div key={s.label} className="flex items-center gap-1.5 text-[0.78rem] font-bold text-slate-500">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                                            {s.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-lg fade-up">
                            <h3 className="text-lg font-bold mb-5 text-slate-800 flex items-center gap-2">
                                <Trophy size={20} className="text-indigo-600" />
                                Leaderboard
                            </h3>
                            <div className="space-y-1">
                                {[
                                    { name: 'Priya S.', pts: 4820, clr: '#8b5cf6', rank: '🥇' },
                                    { name: 'Arjun R.', pts: 4310, clr: '#3b82f6', rank: '🥈' },
                                    { name: 'Meena K.', pts: 3980, clr: '#10b981', rank: '🥉' },
                                    { name: 'You', pts: 3400, clr: '#f59e0b', rank: '4', you: true },
                                    { name: 'Rahul D.', pts: 3100, clr: '#ef4444', rank: '5' },
                                ].map((p, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-slate-50 ${p.you ? 'bg-indigo-50/50 border border-indigo-100' : ''}`}>
                                        <div className="w-7 text-center font-bold text-slate-400 text-sm">{p.rank}</div>
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: p.clr }}>{p.name[0]}</div>
                                        <div className="flex-1 text-sm font-bold text-slate-800">
                                            {p.name}
                                            {p.you && <span className="ml-2 text-[0.6rem] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">YOU</span>}
                                        </div>
                                        <div className="text-sm font-extrabold text-indigo-600">{p.pts.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
