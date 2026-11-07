import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialStudent,
  initialSubjects,
  initialAssignments,
  initialAnnouncements,
  todaySchedule
} from '../data/mockData';

const PortalContext = createContext(null);

export const PortalProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ssp_theme') || 'light';
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Student Profile state
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('ssp_student');
    return saved ? JSON.parse(saved) : initialStudent;
  });

  // Subjects & Attendance state
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('ssp_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  // Assignments state
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('ssp_assignments');
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  // Announcements state
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('ssp_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  // Sync theme to DOM
  useEffect(() => {
    localStorage.setItem('ssp_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync data states to localStorage
  useEffect(() => {
    localStorage.setItem('ssp_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('ssp_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('ssp_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('ssp_announcements', JSON.stringify(announcements));
  }, [announcements]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateStudent = (newDetails) => {
    setStudent(prev => ({ ...prev, ...newDetails }));
  };

  // Attendance actions
  const addSubject = (newSubject) => {
    const subjectWithId = {
      ...newSubject,
      id: `sub-${Date.now()}`,
      monthlyHistory: [
        { month: 'Oct', total: 10, attended: Math.round(newSubject.attendedClasses * 0.5) },
        { month: 'Nov', total: newSubject.totalClasses, attended: newSubject.attendedClasses }
      ]
    };
    setSubjects(prev => [subjectWithId, ...prev]);
  };

  const updateSubjectAttendance = (subjectId, action) => {
    setSubjects(prev =>
      prev.map(sub => {
        if (sub.id !== subjectId) return sub;
        if (action === 'present') {
          return {
            ...sub,
            attendedClasses: sub.attendedClasses + 1,
            totalClasses: sub.totalClasses + 1
          };
        } else if (action === 'absent') {
          return {
            ...sub,
            totalClasses: sub.totalClasses + 1
          };
        } else if (action === 'undo') {
          return {
            ...sub,
            totalClasses: Math.max(0, sub.totalClasses - 1),
            attendedClasses: Math.max(0, sub.attendedClasses - 1)
          };
        }
        return sub;
      })
    );
  };

  const editSubjectDetails = (subjectId, updatedFields) => {
    setSubjects(prev =>
      prev.map(sub => (sub.id === subjectId ? { ...sub, ...updatedFields } : sub))
    );
  };

  const deleteSubject = (subjectId) => {
    setSubjects(prev => prev.filter(sub => sub.id !== subjectId));
  };

  // Assignment actions
  const addAssignment = (assignmentData) => {
    const newAsn = {
      ...assignmentData,
      id: `asn-${Date.now()}`,
      assignedDate: new Date().toISOString()
    };
    setAssignments(prev => [newAsn, ...prev]);
  };

  const updateAssignmentStatus = (assignmentId, newStatus) => {
    setAssignments(prev =>
      prev.map(asn => (asn.id === assignmentId ? { ...asn, status: newStatus } : asn))
    );
  };

  const editAssignment = (assignmentId, updatedFields) => {
    setAssignments(prev =>
      prev.map(asn => (asn.id === assignmentId ? { ...asn, ...updatedFields } : asn))
    );
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments(prev => prev.filter(asn => asn.id !== assignmentId));
  };

  // Announcements actions
  const toggleBookmarkAnnouncement = (id) => {
    setAnnouncements(prev =>
      prev.map(ann => (ann.id === id ? { ...ann, isBookmarked: !ann.isBookmarked } : ann))
    );
  };

  const markAnnouncementRead = (id) => {
    setAnnouncements(prev =>
      prev.map(ann => (ann.id === id ? { ...ann, read: true } : ann))
    );
  };

  const addAnnouncement = (newAnnouncement) => {
    const item = {
      ...newAnnouncement,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      isBookmarked: false
    };
    setAnnouncements(prev => [item, ...prev]);
  };

  // Reset to default mock data
  const resetToDefaults = () => {
    setStudent(initialStudent);
    setSubjects(initialSubjects);
    setAssignments(initialAssignments);
    setAnnouncements(initialAnnouncements);
    localStorage.clear();
  };

  // Computed overview stats
  const totalClassesAttended = subjects.reduce((acc, s) => acc + s.attendedClasses, 0);
  const totalClassesHeld = subjects.reduce((acc, s) => acc + s.totalClasses, 0);
  const overallAttendancePercentage =
    totalClassesHeld > 0 ? Math.round((totalClassesAttended / totalClassesHeld) * 1000) / 10 : 0;

  const pendingAssignmentsCount = assignments.filter(a => a.status === 'Pending').length;
  const inProgressAssignmentsCount = assignments.filter(a => a.status === 'In Progress').length;
  const completedAssignmentsCount = assignments.filter(a => a.status === 'Completed').length;

  const urgentDeadlines = assignments.filter(a => {
    if (a.status === 'Completed') return false;
    const diffHours = (new Date(a.deadline).getTime() - new Date().getTime()) / (1000 * 3600);
    return diffHours <= 48;
  });

  const shortageSubjects = subjects.filter(s => {
    const pct = s.totalClasses > 0 ? (s.attendedClasses / s.totalClasses) * 100 : 0;
    return pct < (student.targetAttendance || 75);
  });

  return (
    <PortalContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileMenuOpen,
        setIsMobileMenuOpen,

        // Data & Actions
        student,
        updateStudent,
        subjects,
        addSubject,
        updateSubjectAttendance,
        editSubjectDetails,
        deleteSubject,

        assignments,
        addAssignment,
        updateAssignmentStatus,
        editAssignment,
        deleteAssignment,

        announcements,
        toggleBookmarkAnnouncement,
        markAnnouncementRead,
        addAnnouncement,
        todaySchedule,

        resetToDefaults,

        // Aggregated Stats
        stats: {
          totalClassesAttended,
          totalClassesHeld,
          overallAttendancePercentage,
          pendingAssignmentsCount,
          inProgressAssignmentsCount,
          completedAssignmentsCount,
          urgentDeadlinesCount: urgentDeadlines.length,
          shortageSubjectsCount: shortageSubjects.length,
          unreadAnnouncementsCount: announcements.filter(a => !a.read).length
        }
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

