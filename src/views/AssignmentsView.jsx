import React, { useState } from 'react';
import AssignmentKanban from '../components/assignments/AssignmentKanban';
import AssignmentList from '../components/assignments/AssignmentList';
import NewAssignmentModal from '../components/assignments/NewAssignmentModal';
import { usePortal } from '../context/PortalContext';
import { LayoutGrid, List, Plus, Filter, Search, Sparkles } from 'lucide-react';

const AssignmentsView = () => {
  const { assignments, subjects, stats, searchQuery } = usePortal();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredAssignments = assignments.filter((asn) => {
    // Course filter
    if (selectedCourse !== 'all' && asn.courseCode !== selectedCourse) return false;
    // Priority filter
    if (selectedPriority !== 'all' && asn.priority !== selectedPriority) return false;
    // Global search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        asn.title.toLowerCase().includes(q) ||
        asn.course.toLowerCase().includes(q) ||
        asn.courseCode.toLowerCase().includes(q) ||
        (asn.description && asn.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Overview Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Assignment & Deadline Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize coursework, manage strict deadlines, and stay ahead with real-time countdowns
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View mode switcher */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Course filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Course:</span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Courses</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Counter stats */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-white">{filteredAssignments.length}</strong> tasks
          </span>
          <span>•</span>
          <span className="text-rose-600 dark:text-rose-400 font-semibold">
            {stats.urgentDeadlinesCount} urgent
          </span>
        </div>
      </div>

      {/* Main View: Kanban or List */}
      {viewMode === 'kanban' ? (
        <AssignmentKanban assignments={filteredAssignments} />
      ) : (
        <AssignmentList assignments={filteredAssignments} />
      )}

      {/* New Assignment Modal */}
      <NewAssignmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
    </div>
  );
};

export default AssignmentsView;

