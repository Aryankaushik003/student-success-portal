import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Calendar
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    student,
    stats,
    announcements,
    assignments
  } = usePortal();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageTitles = {
    dashboard: 'Dashboard Overview',
    attendance: 'Attendance Tracker',
    assignments: 'Assignment & Deadline Manager',
    announcements: 'College Circulars & Notices',
    settings: 'Portal & Profile Settings',
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const urgentAssignments = assignments.filter(a => {
    if (a.status === 'Completed') return false;
    const diffHours = (new Date(a.deadline).getTime() - new Date().getTime()) / (1000 * 3600);
    return diffHours <= 48;
  });

  const urgentNotices = announcements.filter(a => a.isUrgent);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              {pageTitles[activeTab] || 'Student Portal'}
            </h1>
            <p className="hidden sm:block text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Academic Year 2026–2027 • Fall Term
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search assignments, notices, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-200 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Side: Quick Info, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Date Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>{currentDate}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {(stats.urgentDeadlinesCount > 0 || stats.unreadAnnouncementsCount > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {/* Notification Popover */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Important Alerts
                  </h4>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    {urgentAssignments.length + urgentNotices.length} Pending
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {/* Urgent Assignments Alert */}
                  {urgentAssignments.map(a => (
                    <div
                      key={a.id}
                      onClick={() => {
                        setActiveTab('assignments');
                        setIsNotifOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 shrink-0 mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {a.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {a.courseCode} • Due soon
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Urgent Circulars Alert */}
                  {urgentNotices.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setActiveTab('announcements');
                        setIsNotifOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Urgent Notice • {n.issuedBy}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {urgentAssignments.length === 0 && urgentNotices.length === 0 && (
                    <div className="px-4 py-6 text-center text-xs text-slate-400">
                      <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-1" />
                      All caught up! No urgent alerts.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Profile Avatar */}
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
            />
            <span className="hidden sm:inline-block text-xs font-bold text-slate-700 dark:text-slate-200">
              {student.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

