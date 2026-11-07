import React from 'react';
import { Award, AlertOctagon, CheckCircle2, TrendingUp, Calculator } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import CircularProgress from '../common/CircularProgress';
import { getAttendanceStatus } from '../../utils/attendanceUtils';

const AttendanceSummaryCard = ({ onOpenCalculator, onOpenAddSubject }) => {
  const { stats, student, subjects } = usePortal();
  const threshold = student.targetAttendance || 75;
  const statusInfo = getAttendanceStatus(stats.overallAttendancePercentage, threshold);

  const safeCount = subjects.filter(s => {
    const pct = s.totalClasses > 0 ? (s.attendedClasses / s.totalClasses) * 100 : 0;
    return pct >= threshold;
  }).length;

  const dangerCount = subjects.length - safeCount;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Overall Circular Gauge and Title */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <CircularProgress
            percentage={stats.overallAttendancePercentage}
            size={110}
            strokeWidth={10}
            color={statusInfo.strokeColor}
            subLabel="Cumulative"
          />

          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              <span>Threshold: {threshold}% Required</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.overallAttendancePercentage}% Attendance Rate
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              {stats.overallAttendancePercentage >= threshold ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Excellent standing! You are safely above the minimum college requirement.
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 font-medium">
                  ⚠️ Action required! You are currently below the mandatory {threshold}% threshold.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Middle Stats breakdown */}
        <div className="grid grid-cols-3 gap-3 border-y lg:border-y-0 lg:border-x border-slate-100 dark:border-slate-800 py-4 lg:py-0 lg:px-6">
          <div className="text-center">
            <span className="block text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalClassesAttended}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase">Attended</span>
          </div>

          <div className="text-center">
            <span className="block text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalClassesHeld - stats.totalClassesAttended}
            </span>
            <span className="text-xs text-rose-500 font-medium uppercase">Missed</span>
          </div>

          <div className="text-center">
            <span className="block text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalClassesHeld}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase">Total Held</span>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs transition"
          >
            <Calculator className="w-4 h-4" />
            Target % Simulator
          </button>
          <button
            onClick={onOpenAddSubject}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition"
          >
            + Add New Subject
          </button>
        </div>
      </div>

      {/* Safety subject counter bar */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            {safeCount} Subjects in Safe Zone (≥{threshold}%)
          </span>
          {dangerCount > 0 && (
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold">
              <AlertOctagon className="w-4 h-4" />
              {dangerCount} Subject{dangerCount > 1 ? 's' : ''} Shortage (&lt;{threshold}%)
            </span>
          )}
        </div>

        <span className="text-slate-400">
          Updated in real-time as you log classes
        </span>
      </div>
    </div>
  );
};

export default AttendanceSummaryCard;

