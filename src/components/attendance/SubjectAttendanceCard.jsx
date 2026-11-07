import React, { useState } from 'react';
import {
  User,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Check,
  X,
  AlertTriangle,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import CircularProgress from '../common/CircularProgress';
import Badge from '../common/Badge';
import {
  calculatePercentage,
  getAttendanceStatus,
  calculateClassRequirements
} from '../../utils/attendanceUtils';
import { usePortal } from '../../context/PortalContext';

const SubjectAttendanceCard = ({ subject }) => {
  const { updateSubjectAttendance, deleteSubject, student } = usePortal();
  const [showHistory, setShowHistory] = useState(false);

  const threshold = student.targetAttendance || 75;
  const percentage = calculatePercentage(subject.attendedClasses, subject.totalClasses);
  const statusInfo = getAttendanceStatus(percentage, threshold);
  const requirement = calculateClassRequirements(subject.attendedClasses, subject.totalClasses, threshold);

  return (
    <div className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
      percentage < threshold
        ? 'border-rose-300 dark:border-rose-900/60 ring-1 ring-rose-500/10'
        : 'border-slate-200/80 dark:border-slate-800'
    }`}>
      {/* Main Card Header & Stats */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                {subject.code}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {subject.credits} Credits
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {subject.name}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-0.5 flex-wrap">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {subject.professor}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {subject.room}
              </span>
            </div>
          </div>

          {/* Visual Circular Indicator */}
          <div className="shrink-0 flex flex-col items-center">
            <CircularProgress
              percentage={percentage}
              size={72}
              strokeWidth={7}
              color={statusInfo.strokeColor}
              showLabel={true}
            />
            <Badge
              variant={percentage >= threshold ? 'success' : 'danger'}
              size="sm"
              className="mt-1"
            >
              {statusInfo.badgeText}
            </Badge>
          </div>
        </div>

        {/* Classes Held / Attended numerical progress */}
        <div className="mt-5 grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center text-xs">
          <div>
            <span className="block font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {subject.attendedClasses}
            </span>
            <span className="text-slate-400 font-medium text-[11px]">Attended</span>
          </div>
          <div>
            <span className="block font-bold text-rose-600 dark:text-rose-400 text-sm sm:text-base">
              {subject.totalClasses - subject.attendedClasses}
            </span>
            <span className="text-slate-400 font-medium text-[11px]">Absent</span>
          </div>
          <div>
            <span className="block font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {subject.totalClasses}
            </span>
            <span className="text-slate-400 font-medium text-[11px]">Total</span>
          </div>
        </div>

        {/* Dynamic Class Requirement Insight */}
        <div className={`mt-3.5 px-3.5 py-2.5 rounded-xl border text-xs flex items-center gap-2 ${
          requirement.type === 'need_more'
            ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300'
            : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300'
        }`}>
          {requirement.type === 'need_more' ? (
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          )}
          <span className="font-medium leading-tight">
            {requirement.message}
          </span>
        </div>

        {/* Quick Log Buttons: Live Test / Simulation */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateSubjectAttendance(subject.id, 'present')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition active:scale-95 shadow-sm shadow-emerald-600/20"
              title="Add 1 present class"
            >
              <Check className="w-3.5 h-3.5" />
              + Present
            </button>
            <button
              onClick={() => updateSubjectAttendance(subject.id, 'absent')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition active:scale-95 shadow-sm shadow-rose-600/20"
              title="Add 1 absent class"
            >
              <X className="w-3.5 h-3.5" />
              + Absent
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition"
            >
              Monthly History
              {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => deleteSubject(subject.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
              title="Delete Subject"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Attendance History Collapsible Section */}
      {showHistory && (
        <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 rounded-b-2xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Monthly Attendance History
            </h5>
            <span className="text-[11px] text-slate-400">
              Semester Trend
            </span>
          </div>

          <div className="space-y-2.5">
            {subject.monthlyHistory && subject.monthlyHistory.length > 0 ? (
              subject.monthlyHistory.map((hist, idx) => {
                const monthPct = hist.total > 0 ? Math.round((hist.attended / hist.total) * 100) : 0;
                return (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {hist.month} 2026
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">
                          {hist.attended}/{hist.total} classes
                        </span>
                        <span className={`font-bold ${monthPct >= threshold ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                          {monthPct}%
                        </span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          monthPct >= threshold ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, monthPct)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-2 text-center">
                No monthly breakdown recorded yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectAttendanceCard;

