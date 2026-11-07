import React from 'react';
import { Clock, MapPin, User, CheckCircle2, PlayCircle, Calendar } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

const TodayScheduleWidget = () => {
  const { todaySchedule, setActiveTab } = usePortal();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Today's Class Timetable
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live schedule & lecture rooms
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('attendance')}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View All Subjects
        </button>
      </div>

      <div className="space-y-3">
        {todaySchedule.map((item, index) => {
          const isOngoing = item.status === 'In Progress';
          const isDone = item.status === 'Completed';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isOngoing
                  ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/80 shadow-sm'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-3 w-3 rounded-full shrink-0 ${
                    isOngoing
                      ? 'bg-indigo-600 ring-4 ring-indigo-200 dark:ring-indigo-900 animate-pulse'
                      : isDone
                      ? 'bg-emerald-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {item.code}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                      {item.subject}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.room}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {item.professor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isOngoing
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayScheduleWidget;

