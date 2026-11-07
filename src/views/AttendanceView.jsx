import React, { useState } from 'react';
import AttendanceSummaryCard from '../components/attendance/AttendanceSummaryCard';
import SubjectAttendanceCard from '../components/attendance/SubjectAttendanceCard';
import AttendanceCalculatorModal from '../components/attendance/AttendanceCalculatorModal';
import AddSubjectModal from '../components/attendance/AddSubjectModal';
import { usePortal } from '../context/PortalContext';
import { Search, Filter, Plus, Calculator, CheckCircle2, AlertOctagon } from 'lucide-react';

const AttendanceView = () => {
  const { subjects, student, searchQuery } = usePortal();
  const [filterType, setFilterType] = useState('all'); // 'all', 'safe', 'shortage'
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);

  const threshold = student.targetAttendance || 75;

  const filteredSubjects = subjects.filter(subject => {
    const pct = subject.totalClasses > 0 ? (subject.attendedClasses / subject.totalClasses) * 100 : 0;
    
    // Status filter
    if (filterType === 'safe' && pct < threshold) return false;
    if (filterType === 'shortage' && pct >= threshold) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        subject.name.toLowerCase().includes(q) ||
        subject.code.toLowerCase().includes(q) ||
        subject.professor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Attendance Summary Header */}
      <AttendanceSummaryCard
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAddSubject={() => setIsAddSubjectOpen(true)}
      />

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Subject-wise Attendance Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click "+ Present" or "+ Absent" to log class attendance in real-time
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Courses ({subjects.length})
          </button>
          <button
            onClick={() => setFilterType('safe')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
              filterType === 'safe'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Safe (&ge;{threshold}%)
          </button>
          <button
            onClick={() => setFilterType('shortage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1 ${
              filterType === 'shortage'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            Shortage (&lt;{threshold}%)
          </button>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredSubjects.map(subject => (
          <SubjectAttendanceCard key={subject.id} subject={subject} />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
          <p className="text-sm font-semibold">No subjects match the selected criteria.</p>
        </div>
      )}

      {/* Modals */}
      <AttendanceCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
      />
    </div>
  );
};

export default AttendanceView;

