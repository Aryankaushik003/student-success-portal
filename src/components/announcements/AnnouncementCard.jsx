import React from 'react';
import {
  Calendar,
  Bookmark,
  Pin,
  FileText,
  AlertTriangle,
  ArrowRight,
  Building2,
  Download
} from 'lucide-react';
import Badge from '../common/Badge';
import { usePortal } from '../../context/PortalContext';

const AnnouncementCard = ({ announcement, onOpenDetail }) => {
  const { toggleBookmarkAnnouncement } = usePortal();

  const categoryVariants = {
    Academic: 'blue',
    Exam: 'purple',
    Events: 'success',
    Urgent: 'danger',
    Placement: 'orange',
  };

  return (
    <div
      onClick={() => onOpenDetail(announcement)}
      className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between group ${
        announcement.isUrgent
          ? 'border-rose-200 dark:border-rose-900/60 ring-1 ring-rose-500/10'
          : announcement.isPinned
          ? 'border-indigo-200 dark:border-indigo-900/60 ring-1 ring-indigo-500/10'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div>
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {announcement.isPinned && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                <Pin className="w-3 h-3 fill-indigo-600 dark:fill-indigo-400" />
                Pinned
              </span>
            )}
            <Badge variant={categoryVariants[announcement.category] || 'default'} size="sm">
              {announcement.category}
            </Badge>
            {announcement.isUrgent && (
              <Badge variant="danger" size="sm" dot>
                Urgent Action
              </Badge>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmarkAnnouncement(announcement.id);
            }}
            className={`p-1.5 rounded-lg transition ${
              announcement.isBookmarked
                ? 'text-amber-500 hover:text-amber-600'
                : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
            }`}
            title={announcement.isBookmarked ? 'Remove bookmark' : 'Bookmark notice'}
          >
            <Bookmark
              className={`w-4 h-4 ${announcement.isBookmarked ? 'fill-amber-500' : ''}`}
            />
          </button>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {announcement.title}
        </h4>

        {/* Content Snippet */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
          {announcement.content}
        </p>

        {/* Attachment preview pill if any */}
        {announcement.attachment && (
          <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span className="truncate max-w-[200px]">{announcement.attachment}</span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {announcement.issuedBy}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {announcement.date}
          </span>
        </div>

        <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
          Read <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export default AnnouncementCard;

