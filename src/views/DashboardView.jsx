import React, { useState } from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import QuickOverviewWidgets from '../components/dashboard/QuickOverviewWidgets';
import TodayScheduleWidget from '../components/dashboard/TodayScheduleWidget';
import NewAssignmentModal from '../components/assignments/NewAssignmentModal';
import AddSubjectModal from '../components/attendance/AddSubjectModal';
import AnnouncementDetailModal from '../components/announcements/AnnouncementDetailModal';
import { usePortal } from '../context/PortalContext';
import { Award, BookOpen, Clock, Megaphone, ArrowRight } from 'lucide-react';

const DashboardView = () => {
  const { announcements, assignments, setActiveTab } = usePortal();
  const [isNewAsnOpen, setIsNewAsnOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  return (
    <div className="space-y-6">
      {/* 1. Welcoming Banner with student info */}
      <WelcomeBanner
        onOpenNewAssignment={() => setIsNewAsnOpen(true)}
        onOpenAddSubject={() => setIsAddSubjectOpen(true)}
      />

      {/* 2. Quick Overview Widgets (Attendance, Pending Assignments, Upcoming Deadlines, College Notices) */}
      <QuickOverviewWidgets
        onSelectAnnouncement={(ann) => setSelectedAnnouncement(ann)}
        onOpenNewAssignment={() => setIsNewAsnOpen(true)}
      />

      {/* 3. Main Section: Today's Schedule & Quick Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayScheduleWidget />
        </div>

        {/* Right Sidebar: Academic Tips & Quick Shortcuts */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-2xl shadow-md">
            <div className="inline-flex p-2 rounded-xl bg-white/10 backdrop-blur-md mb-3">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <h4 className="text-base font-bold">
              Mid-Term Exam Prep Week
            </h4>
            <p className="text-xs text-indigo-100/90 mt-1.5 leading-relaxed">
              Maintain minimum 75% attendance across all registered courses to be eligible for hall ticket generation.
            </p>
            <button
              onClick={() => setActiveTab('attendance')}
              className="mt-4 text-xs font-bold inline-flex items-center gap-1.5 bg-white text-indigo-900 px-3.5 py-2 rounded-xl hover:bg-indigo-50 transition"
            >
              Verify Attendance Status <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Quick Shortcuts
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setIsNewAsnOpen(true)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition"
              >
                <span>➕ Add Assignment</span>
                <span className="text-slate-400">Ctrl+N</span>
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition"
              >
                <span>📢 Read Campus Circulars</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">New</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 transition"
              >
                <span>⚙️ Configure Portal</span>
                <span className="text-slate-400">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewAssignmentModal
        isOpen={isNewAsnOpen}
        onClose={() => setIsNewAsnOpen(false)}
      />

      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
      />

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        isOpen={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
};

export default DashboardView;

