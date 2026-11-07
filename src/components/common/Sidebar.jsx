import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck2,
  CheckSquare,
  Megaphone,
  Settings,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    student,
    stats
  } = usePortal();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'attendance',
      label: 'Attendance Tracker',
      icon: CalendarCheck2,
      badge: stats.shortageSubjectsCount > 0 ? { text: `${stats.shortageSubjectsCount} Alert`, color: 'bg-rose-500 text-white' } : null,
    },
    {
      id: 'assignments',
      label: 'Assignments & Deadlines',
      icon: CheckSquare,
      badge: stats.pendingAssignmentsCount > 0 ? { text: `${stats.pendingAssignmentsCount}`, color: 'bg-indigo-600 text-white' } : null,
    },
    {
      id: 'announcements',
      label: 'College Info & Circulars',
      icon: Megaphone,
      badge: stats.unreadAnnouncementsCount > 0 ? { text: `${stats.unreadAnnouncementsCount} New`, color: 'bg-amber-500 text-slate-900' } : null,
    },
    {
      id: 'settings',
      label: 'Portal Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
            <div className={`flex items-center gap-3 overflow-hidden ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <div className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    StudentPortal
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Success Hub
                  </div>
                </div>
              )}
            </div>

            {/* Desktop collapse toggle */}
            {!isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Collapsed expansion button */}
          {isSidebarCollapsed && (
            <div className="hidden lg:flex justify-center pt-2">
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
                title="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group relative
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100'
                    }
                    ${isSidebarCollapsed ? 'justify-center px-0' : ''}
                  `}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span className="truncate text-left flex-1">{item.label}</span>
                  )}
                  {!isSidebarCollapsed && item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badge.color}`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                  {isSidebarCollapsed && item.badge && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Student Profile Card */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          {!isSidebarCollapsed ? (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="relative">
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                  {student.name}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                  {student.rollNumber} • {student.semester}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                title={`${student.name} (${student.rollNumber})`}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

