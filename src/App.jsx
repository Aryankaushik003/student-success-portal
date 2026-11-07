import React from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import DashboardView from './views/DashboardView';
import AttendanceView from './views/AttendanceView';
import AssignmentsView from './views/AssignmentsView';
import AnnouncementsView from './views/AnnouncementsView';
import SettingsView from './views/SettingsView';

const MainLayout = () => {
  const { activeTab, isSidebarCollapsed } = usePortal();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'attendance':
        return <AttendanceView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Navbar />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderActiveView()}
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400">
          Student Success Portal • Built with React, Tailwind CSS & Lucide Icons
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <PortalProvider>
      <MainLayout />
    </PortalProvider>
  );
}

export default App;

