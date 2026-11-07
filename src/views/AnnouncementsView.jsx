import React, { useState } from 'react';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import AnnouncementDetailModal from '../components/announcements/AnnouncementDetailModal';
import NewAnnouncementModal from '../components/announcements/NewAnnouncementModal';
import { usePortal } from '../context/PortalContext';
import { Megaphone, Plus, Search, Bookmark, AlertTriangle, Pin } from 'lucide-react';

const AnnouncementsView = () => {
  const { announcements, searchQuery } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isNewNoticeOpen, setIsNewNoticeOpen] = useState(false);

  const categories = [
    'All',
    'Urgent',
    'Exam',
    'Academic',
    'Events',
    'Placement',
    'Bookmarked'
  ];

  const filteredAnnouncements = announcements.filter(ann => {
    // Category filter
    if (selectedCategory === 'Bookmarked') {
      if (!ann.isBookmarked) return false;
    } else if (selectedCategory !== 'All') {
      if (ann.category !== selectedCategory) return false;
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        ann.title.toLowerCase().includes(q) ||
        ann.content.toLowerCase().includes(q) ||
        ann.issuedBy.toLowerCase().includes(q) ||
        ann.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Separate pinned announcements
  const pinnedNotices = filteredAnnouncements.filter(a => a.isPinned);
  const otherNotices = filteredAnnouncements.filter(a => !a.isPinned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            College Info & Announcements Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official circulars, exam notifications, and campus news from university administration
          </p>
        </div>

        <button
          onClick={() => setIsNewNoticeOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Publish Notice
        </button>
      </div>

      {/* Categories Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'Bookmarked' ? '★ Bookmarked' : cat}
            </button>
          );
        })}
      </div>

      {/* Announcements Grid */}
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-6">
          {/* Pinned Section if viewing All and pinned exists */}
          {selectedCategory === 'All' && pinnedNotices.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                <Pin className="w-3.5 h-3.5 fill-current" />
                <span>Pinned & Important Circulars</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pinnedNotices.map((ann) => (
                  <AnnouncementCard
                    key={ann.id}
                    announcement={ann}
                    onOpenDetail={(item) => setSelectedAnnouncement(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular or Filtered Section */}
          <div>
            {selectedCategory === 'All' && pinnedNotices.length > 0 && (
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Recent Circulars
              </h4>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {(selectedCategory === 'All' ? otherNotices : filteredAnnouncements).map((ann) => (
                <AnnouncementCard
                  key={ann.id}
                  announcement={ann}
                  onOpenDetail={(item) => setSelectedAnnouncement(item)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center text-slate-400">
          <Megaphone className="w-12 h-12 mx-auto text-indigo-400/40 mb-3" />
          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
            No notices found
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            No circulars match the selected filter '{selectedCategory}'.
          </p>
        </div>
      )}

      {/* Modals */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        isOpen={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />

      <NewAnnouncementModal
        isOpen={isNewNoticeOpen}
        onClose={() => setIsNewNoticeOpen(false)}
      />
    </div>
  );
};

export default AnnouncementsView;

