import React from 'react';
import { Sparkles, Calendar, BookOpen, ArrowUpRight, Plus, Award } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

const WelcomeBanner = ({ onOpenNewAssignment, onOpenAddSubject }) => {
  const { student, setActiveTab, stats } = usePortal();

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-indigo-950/20">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Greeting, Student Details */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome to your Student Hub</span>
            <span className="text-white/40">•</span>
            <span>{student.semester}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-100 to-white">{student.name}</span>! 👋
          </h2>

          <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed">
            {student.department} • <span className="font-semibold text-white">ID: {student.rollNumber}</span>
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-indigo-200">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Current CGPA: <strong className="text-white font-bold">{student.gpa}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Overall Attendance: <strong className={`font-bold ${stats.overallAttendancePercentage >= 75 ? 'text-emerald-300' : 'text-rose-300'}`}>{stats.overallAttendancePercentage}%</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Action Buttons */}
        <div className="flex flex-wrap lg:flex-col gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('attendance')}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs sm:text-sm hover:bg-indigo-50 transition shadow-md shadow-black/10 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-indigo-600" />
            Log Class Attendance
          </button>
          
          <button
            onClick={onOpenNewAssignment}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/15 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Assignment
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-indigo-200 hover:text-white font-medium text-xs sm:text-sm transition"
          >
            View Circulars
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

