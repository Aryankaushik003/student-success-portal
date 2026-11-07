import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Trash2,
  ExternalLink,
  Tag,
  ArrowRight
} from 'lucide-react';
import Badge from '../common/Badge';
import { getUrgencyInfo, formatDeadline, getCountdown } from '../../utils/dateUtils';
import { usePortal } from '../../context/PortalContext';

const AssignmentCard = ({ assignment, isCompact = false }) => {
  const { updateAssignmentStatus, deleteAssignment } = usePortal();
  const urgency = getUrgencyInfo(assignment.deadline);
  const isCompleted = assignment.status === 'Completed';

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

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
        isCompleted
          ? 'opacity-85 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
          : urgency.status === 'critical'
          ? 'border-rose-300 dark:border-rose-900/80 ring-1 ring-rose-500/20'
          : urgency.status === 'urgent'
          ? 'border-amber-300 dark:border-amber-900/80 ring-1 ring-amber-500/20'
          : 'border-slate-200/80 dark:border-slate-800'
      } p-4 sm:p-5 flex flex-col justify-between`}
    >
      <div>
        {/* Top Badges: Course, Priority, Urgency */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
              {assignment.courseCode || assignment.course}
            </span>
            <Badge variant={priorityVariants[assignment.priority] || 'default'} size="sm">
              {assignment.priority} Priority
            </Badge>
          </div>

          {!isCompleted ? (
            <Badge
              variant={urgencyVariants[urgency.status] || 'default'}
              size="sm"
              dot={urgency.isUrgent}
              className={urgency.status === 'critical' ? 'animate-pulse' : ''}
            >
              {urgency.label}
            </Badge>
          ) : (
            <Badge variant="success" size="sm" dot>
              Completed
            </Badge>
          )}
        </div>

        {/* Title & Description */}
        <h4
          className={`text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug ${
            isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
          }`}
        >
          {assignment.title}
        </h4>

        {assignment.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {assignment.description}
          </p>
        )}

        {/* Tags / Weightage if any */}
        {assignment.weightage && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <Tag className="w-3 h-3 text-slate-400" />
            <span>{assignment.weightage}</span>
          </div>
        )}
      </div>

      {/* Deadline Info & Actions */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">{formatDeadline(assignment.deadline)}</span>
          </div>
          {!isCompleted && (
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {getCountdown(assignment.deadline)}
            </span>
          )}
        </div>

        {/* Quick Status Toggles */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1">
            {['Pending', 'In Progress', 'Completed'].map((status) => {
              const isCurrent = assignment.status === status;
              return (
                <button
                  key={status}
                  onClick={() => updateAssignmentStatus(assignment.id, status)}
                  className={`text-[10px] px-2 py-1 rounded-lg font-semibold transition ${
                    isCurrent
                      ? status === 'Completed'
                        ? 'bg-emerald-600 text-white'
                        : status === 'In Progress'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => deleteAssignment(assignment.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            title="Delete assignment"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

