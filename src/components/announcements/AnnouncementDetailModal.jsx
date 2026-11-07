import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { Calendar, Building2, Download, Bookmark, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

const AnnouncementDetailModal = ({ announcement, isOpen, onClose }) => {
  const { toggleBookmarkAnnouncement } = usePortal();

  if (!announcement) return null;

  const categoryVariants = {
    Academic: 'blue',
    Exam: 'purple',
    Events: 'success',
    Urgent: 'danger',
    Placement: 'orange',
  };

  const handleDownload = () => {
    alert(`Downloading official circular: ${announcement.attachment || 'Notice_Document.pdf'}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official College Notice"
      subtitle={`Ref: ${announcement.id.toUpperCase()} • Issued by ${announcement.issuedBy}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Meta badges & bookmark */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={categoryVariants[announcement.category] || 'default'}>
              {announcement.category}
            </Badge>
            {announcement.isUrgent && (
              <Badge variant="danger" dot>
                Urgent Action Required
              </Badge>
            )}
            {announcement.isPinned && (
              <Badge variant="brand">
                Pinned Notice
              </Badge>
            )}
          </div>

          <button
            onClick={() => toggleBookmarkAnnouncement(announcement.id)}
            className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition ${
              announcement.isBookmarked ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${announcement.isBookmarked ? 'fill-amber-500' : ''}`} />
            {announcement.isBookmarked ? 'Saved' : 'Bookmark'}
          </button>
        </div>

        {/* Notice Subject Title */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {announcement.title}
          </h2>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Published: {announcement.date} {announcement.time && `at ${announcement.time}`}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Department: {announcement.department || 'Academic Registrar'}
            </span>
          </div>
        </div>

        {/* Notice Body */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
            {announcement.content}
          </p>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Digitally verified by University Portal
            </div>
            <span>Office of the Registrar</span>
          </div>
        </div>

        {/* Downloadable Attachment */}
        {announcement.attachment && (
          <div className="p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  {announcement.attachment}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Official PDF Circular • 1.4 MB
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-semibold text-xs transition"
          >
            Close Notice
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AnnouncementDetailModal;

