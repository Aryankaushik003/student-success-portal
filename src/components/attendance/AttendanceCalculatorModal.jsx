import React, { useState } from 'react';
import Modal from '../common/Modal';
import { usePortal } from '../../context/PortalContext';
import { calculatePercentage, calculateClassRequirements } from '../../utils/attendanceUtils';
import { Calculator, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const AttendanceCalculatorModal = ({ isOpen, onClose }) => {
  const { subjects, student } = usePortal();
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [targetPercentage, setTargetPercentage] = useState(student.targetAttendance || 75);
  const [hypotheticalClassesToAttend, setHypotheticalClassesToAttend] = useState(0);
  const [hypotheticalClassesToMiss, setHypotheticalClassesToMiss] = useState(0);

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  if (!selectedSubject) return null;

  const currentAttended = selectedSubject.attendedClasses;
  const currentTotal = selectedSubject.totalClasses;
  const currentPct = calculatePercentage(currentAttended, currentTotal);

  // Requirements for target
  const requirement = calculateClassRequirements(currentAttended, currentTotal, targetPercentage);

  // Simulated projection
  const simAttended = currentAttended + Number(hypotheticalClassesToAttend);
  const simTotal = currentTotal + Number(hypotheticalClassesToAttend) + Number(hypotheticalClassesToMiss);
  const simulatedPct = calculatePercentage(simAttended, simTotal);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Attendance Target & 'What-If' Calculator"
      subtitle="Simulate class attendance and calculate exact targets to stay safe"
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        {/* Subject selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Select Course / Subject
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setHypotheticalClassesToAttend(0);
              setHypotheticalClassesToMiss(0);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name} ({calculatePercentage(s.attendedClasses, s.totalClasses)}%)
              </option>
            ))}
          </select>
        </div>

        {/* Current status display */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Current Status</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white">
              {currentAttended} / {currentTotal} classes
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Percentage</span>
            <div className={`text-xl font-extrabold ${currentPct >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {currentPct}%
            </div>
          </div>
        </div>

        {/* Target percentage slider / input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Desired Target Threshold
            </label>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {targetPercentage}%
            </span>
          </div>
          <div className="flex gap-2">
            {[75, 80, 85, 90].map(pct => (
              <button
                key={pct}
                type="button"
                onClick={() => setTargetPercentage(pct)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  targetPercentage === pct
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Target Requirement Output */}
        <div className={`p-4 rounded-xl border ${
          requirement.type === 'need_more'
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
            : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
        }`}>
          <div className="flex items-start gap-3">
            {requirement.type === 'need_more' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h5 className="font-bold text-sm">
                Target Projection for {targetPercentage}%
              </h5>
              <p className="text-xs mt-1 leading-relaxed">
                {requirement.message}
              </p>
            </div>
          </div>
        </div>

        {/* 'What-If' Simulation */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            What-If Next Classes Simulation
          </h5>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                If I attend next:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={hypotheticalClassesToAttend}
                  onChange={(e) => setHypotheticalClassesToAttend(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                />
                <span className="text-xs text-slate-400">classes</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                And miss next:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={hypotheticalClassesToMiss}
                  onChange={(e) => setHypotheticalClassesToMiss(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                />
                <span className="text-xs text-slate-400">classes</span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
              Projected Attendance:
            </span>
            <span className={`text-base font-extrabold ${simulatedPct >= targetPercentage ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {simulatedPct}% ({simAttended}/{simTotal})
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-semibold text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AttendanceCalculatorModal;

