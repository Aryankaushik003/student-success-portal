import React from 'react';
import AssignmentCard from './AssignmentCard';
import { Clock, Loader, CheckCircle2 } from 'lucide-react';

const AssignmentKanban = ({ assignments }) => {
  const columns = [
    {
      id: 'Pending',
      title: 'To Do / Pending',
      icon: Clock,
      color: 'amber',
      headerBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      dotColor: 'bg-amber-500',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      icon: Loader,
      color: 'indigo',
      headerBg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      dotColor: 'bg-indigo-500',
    },
    {
      id: 'Completed',
      title: 'Completed',
      icon: CheckCircle2,
      color: 'emerald',
      headerBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      dotColor: 'bg-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((col) => {
        const colAssignments = assignments.filter((a) => a.status === col.id);
        const Icon = col.icon;

        return (
          <div
            key={col.id}
            className="bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 min-h-[500px] flex flex-col"
          >
            {/* Column Header */}
            <div className={`p-3 rounded-xl border flex items-center justify-between mb-4 ${col.headerBg}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  {col.title}
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 shadow-xs">
                {colAssignments.length}
              </span>
            </div>

            {/* Assignments stack */}
            <div className="space-y-4 flex-1">
              {colAssignments.length > 0 ? (
                colAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
                  <p className="text-xs font-medium">No tasks in this lane</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentKanban;

