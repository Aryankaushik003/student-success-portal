import React from 'react';
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import CircularProgress from '../common/CircularProgress';
import Badge from '../common/Badge';
import { getUrgencyInfo, getCountdown } from '../../utils/dateUtils';
import { getAttendanceStatus } from '../../utils/attendanceUtils';

const QuickOverviewWidgets = ({ onSelectAnnouncement, onOpenNewAssignment }) => {
  const {
    subjects,
    assignments,
    announcements,
    stats,
    setActiveTab,
    student
  } = usePortal();

  const attendanceInfo = getAttendanceStatus(stats.overallAttendancePercentage, student.targetAttendance || 75);

  // Sorted upcoming active deadlines
  const upcomingAssignments = [...assignments]
    .filter(a => a.status !== 'Completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  // Latest announcements
  const latestAnnouncements = [...announcements].slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* 1. Attendance Overview Card */}
      <div
        onClick={() => setActiveTab('attendance')}
        className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Attendance
            </span>
            <div className={`p-2 rounded-xl ${attendanceInfo.bgColor} ${attendanceInfo.textColor}`}>
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stats.overallAttendancePercentage}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stats.totalClassesAttended} of {stats.totalClassesHeld} classes attended
              </p>
            </div>
            <CircularProgress
              percentage={stats.overallAttendancePercentage}
              size={64}
              strokeWidth={7}
              color={attendanceInfo.strokeColor}
              showLabel={false}
            />
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <Badge
            variant={stats.overallAttendancePercentage >= 75 ? 'success' : 'danger'}
            size="sm"
            dot
          >
            {stats.overallAttendancePercentage >= 75 ? 'Above 75% Criteria' : 'Attendance Shortage!'}
          </Badge>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 2. Pending Assignments Count Card */}
      <div
        onClick={() => setActiveTab('assignments')}
        className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assignments Hub
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {stats.pendingAssignmentsCount}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active pending tasks requiring action
            </p>
          </div>

          {/* Quick status progress pills */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-1">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-amber-600 dark:text-amber-400">
                {stats.pendingAssignmentsCount}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">To-Do</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {stats.inProgressAssignmentsCount}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">Doing</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl text-center">
              <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {stats.completedAssignmentsCount}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">Done</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            {stats.urgentDeadlinesCount} urgent
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 3. Upcoming Deadlines Widget */}
      <div
        onClick={() => setActiveTab('assignments')}
        className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Upcoming Deadlines
            </span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 space-y-2.5">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map(asn => {
                const urgency = getUrgencyInfo(asn.deadline);
                return (
                  <div
                    key={asn.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                        {asn.courseCode}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        urgency.status === 'critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300' :
                        urgency.status === 'urgent' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300' :
                        'bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300'
                      }`}>
                        {urgency.tag}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">
                      {asn.title}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                🎉 No upcoming deadlines!
              </p>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            {upcomingAssignments.length} pending deadlines
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Kanban <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 4. Latest College Announcements Widget */}
      <div
        onClick={() => setActiveTab('announcements')}
        className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Campus Circulars
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 space-y-2.5">
            {latestAnnouncements.map(ann => (
              <div
                key={ann.id}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {ann.date}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">
                  {ann.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            {stats.unreadAnnouncementsCount} unread notices
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Notice Board <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickOverviewWidgets;

