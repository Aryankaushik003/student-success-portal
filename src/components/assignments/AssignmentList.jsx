import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Tag,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import Badge from '../common/Badge';
import { getUrgencyInfo, formatDeadline, getCountdown } from '../../utils/dateUtils';
import { usePortal } from '../../context/PortalContext';

const AssignmentList = ({ assignments }) => {
  const { updateAssignmentStatus, deleteAssignment } = usePortal();

  const priorityVariants = {
    High: 'danger',
    Medium: 'warning',
    Low: 'blue',
  };

  const urgencyVariants = {
    critical: 'danger',
    urgent: 'danger',
    warning: 'orange',
    normal: 'blue',
    safe: 'success',
  };

  if (assignments.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center text-slate-400">
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500/50 mb-3" />
        <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
          No assignments found
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Try clearing filters or add a new assignment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
      {assignments.map((assignment) => {
        const urgency = getUrgencyInfo(assignment.deadline);
        const isCompleted = assignment.status === 'Completed';

        return (
          <div
            key={assignment.id}
            className={`p-4 sm:p-5 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              isCompleted ? 'bg-slate-50/40 dark:bg-slate-900/30' : ''
            }`}
          >
            {/* Left: Complete toggle & title/details */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <button
                onClick={() =>
                  updateAssignmentStatus(
                    assignment.id,
                    isCompleted ? 'Pending' : 'Completed'
                  )
                }
                className="mt-1 text-slate-400 hover:text-emerald-600 transition shrink-0"
                title={isCompleted ? 'Mark Pending' : 'Mark Completed'}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 hover:text-indigo-600" />
                )}
              </button>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    {assignment.courseCode || assignment.course}
                  </span>
                  <Badge variant={priorityVariants[assignment.priority] || 'default'} size="sm">
                    {assignment.priority}
                  </Badge>
                  {!isCompleted ? (
                    <Badge variant={urgencyVariants[urgency.status] || 'default'} size="sm" dot={urgency.isUrgent}>
                      {urgency.label}
                    </Badge>
                  ) : (
                    <Badge variant="success" size="sm">
                      Completed
                    </Badge>
                  )}
                </div>

                <h4
                  className={`text-sm sm:text-base font-bold text-slate-900 dark:text-white ${
                    isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}
                >
                  {assignment.title}
                </h4>

                {assignment.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-2xl">
                    {assignment.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Deadline & Action controls */}
            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-8 md:pl-0">
              <div className="text-left md:text-right">
                <div className="flex items-center md:justify-end gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDeadline(assignment.deadline)}</span>
                </div>
                {!isCompleted && (
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {getCountdown(assignment.deadline)}
                  </p>
                )}
              </div>

              {/* Status Selector dropdown/pill */}
              <select
                value={assignment.status}
                onChange={(e) => updateAssignmentStatus(assignment.id, e.target.value)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={() => deleteAssignment(assignment.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                title="Delete assignment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentList;

