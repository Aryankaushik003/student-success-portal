export const initialStudent = {
  name: "Aryan Kaushik",
  rollNumber: "252502116",
  email: "aryan.kaushik@univ.edu",
  department: "Computer Science & Engineering",
  semester: "3rd Semester",
  batch: "2025- 2029",
  gpa: "8.1.3",
  collegeName: "university institute of engineering & Technology",
  targetAttendance: 75,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  bio: "Passionate about full-stack engineering, distributed systems, and AI systems."
};

export const initialSubjects = [
  {
    id: "sub-1",
    name: "Design & Analysis of Algorithms",
    code: "CS301",
    professor: "Dr. Sona",
    room: "Lab 402 / Hall B",
    credits: 4,
    totalClasses: 36,
    attendedClasses: 31,
    color: "indigo",
    schedule: ["Mon 09:00 AM", "Wed 10:30 AM", "Fri 02:00 PM"],
    monthlyHistory: [
      { month: "Aug", total: 8, attended: 7 },
      { month: "Sep", total: 10, attended: 9 },
      { month: "Oct", total: 12, attended: 10 },
      { month: "Nov", total: 6, attended: 5 }
    ]
  },
  {
    id: "sub-2",
    name: "Database Management Systems",
    code: "CS302",
    professor: "Prof. Michael Chang",
    room: "Room 204",
    credits: 4,
    totalClasses: 40,
    attendedClasses: 34,
    color: "emerald",
    schedule: ["Tue 10:00 AM", "Thu 11:30 AM"],
    monthlyHistory: [
      { month: "Aug", total: 10, attended: 9 },
      { month: "Sep", total: 10, attended: 8 },
      { month: "Oct", total: 12, attended: 11 },
      { month: "Nov", total: 8, attended: 6 }
    ]
  },
  {
    id: "sub-3",
    name: "Computer Networks & Security",
    code: "CS303",
    professor: "Dr. Elena Rostova",
    room: "Networking Lab 2",
    credits: 3,
    totalClasses: 32,
    attendedClasses: 22, // 68.75% -> Below 75% for alerting!
    color: "rose",
    schedule: ["Mon 01:00 PM", "Thu 02:30 PM"],
    monthlyHistory: [
      { month: "Aug", total: 8, attended: 6 },
      { month: "Sep", total: 8, attended: 5 },
      { month: "Oct", total: 10, attended: 7 },
      { month: "Nov", total: 6, attended: 4 }
    ]
  },
  {
    id: "sub-4",
    name: "Operating Systems & Virtualization",
    code: "CS304",
    professor: "Prof. Rajesh Sharma",
    room: "Room 108",
    credits: 4,
    totalClasses: 38,
    attendedClasses: 30, // 78.9%
    color: "amber",
    schedule: ["Wed 09:00 AM", "Fri 10:00 AM"],
    monthlyHistory: [
      { month: "Aug", total: 10, attended: 8 },
      { month: "Sep", total: 10, attended: 8 },
      { month: "Oct", total: 12, attended: 9 },
      { month: "Nov", total: 6, attended: 5 }
    ]
  },
  {
    id: "sub-5",
    name: "Machine Learning Foundations",
    code: "CS305",
    professor: "Dr. Amanda Torres",
    room: "Data Lab 3",
    credits: 3,
    totalClasses: 28,
    attendedClasses: 26, // 92.8%
    color: "purple",
    schedule: ["Tue 02:00 PM", "Fri 03:30 PM"],
    monthlyHistory: [
      { month: "Aug", total: 6, attended: 6 },
      { month: "Sep", total: 8, attended: 7 },
      { month: "Oct", total: 10, attended: 9 },
      { month: "Nov", total: 4, attended: 4 }
    ]
  },
  {
    id: "sub-6",
    name: "Professional Ethics & Management",
    code: "HUM201",
    professor: "Prof. David Miller",
    room: "Auditorium 2",
    credits: 2,
    totalClasses: 24,
    attendedClasses: 19, // 79.16%
    color: "cyan",
    schedule: ["Thu 04:00 PM"],
    monthlyHistory: [
      { month: "Aug", total: 6, attended: 5 },
      { month: "Sep", total: 6, attended: 5 },
      { month: "Oct", total: 8, attended: 6 },
      { month: "Nov", total: 4, attended: 3 }
    ]
  }
];

// Helper to calculate relative deadline timestamps
const now = new Date();
const addHours = (h) => new Date(now.getTime() + h * 3600 * 1000).toISOString();
const addDays = (d) => new Date(now.getTime() + d * 24 * 3600 * 1000).toISOString();
const subDays = (d) => new Date(now.getTime() - d * 24 * 3600 * 1000).toISOString();

export const initialAssignments = [
  {
    id: "asn-1",
    title: "Dynamic Programming: Knapsack & Graph Shortest Path",
    course: "Design & Analysis of Algorithms",
    courseCode: "CS301",
    description: "Implement 0/1 Knapsack with memoization and Floyd-Warshall algorithm. Submit code repository link and PDF runtime complexity analysis.",
    deadline: addHours(18), // Due tomorrow morning!
    priority: "High",
    status: "In Progress",
    assignedDate: subDays(4),
    weightage: "15% of Internal Marks",
    tags: ["Algorithms", "Programming", "Python"]
  },
  {
    id: "asn-2",
    title: "B+ Tree Indexing & Query Optimization Paper",
    course: "Database Management Systems",
    courseCode: "CS302",
    description: "Compare indexing mechanisms (B-Tree, Hash, Bitmap) under high concurrency transaction environments.",
    deadline: addDays(2), // Due in 2 days
    priority: "Medium",
    status: "Pending",
    assignedDate: subDays(2),
    weightage: "10% of Internal Marks",
    tags: ["DBMS", "Research"]
  },
  {
    id: "asn-3",
    title: "TCP Congestion Control Wireshark Lab Analysis",
    course: "Computer Networks & Security",
    courseCode: "CS303",
    description: "Capture PCAP files simulating Reno and Cubic TCP flows. Plot cwnd over time and explain packet drop recovery.",
    deadline: addDays(4),
    priority: "High",
    status: "Pending",
    assignedDate: subDays(1),
    weightage: "20% Lab Grade",
    tags: ["Networks", "Wireshark", "Lab"]
  },
  {
    id: "asn-4",
    title: "Custom Linux Kernel Module & System Calls",
    course: "Operating Systems & Virtualization",
    courseCode: "CS304",
    description: "Write and insert a custom kernel module that logs process hierarchy and CPU ticks into /proc/sys.",
    deadline: subDays(1), // Overdue for demo
    priority: "High",
    status: "Pending",
    assignedDate: subDays(7),
    weightage: "15% of Internal Marks",
    tags: ["OS", "C", "Linux"]
  },
  {
    id: "asn-5",
    title: "Sentiment Classification with PyTorch Bi-LSTM",
    course: "Machine Learning Foundations",
    courseCode: "CS305",
    description: "Train a bidirectional LSTM on IMDB Movie Reviews benchmark. Reach at least 88% validation F1 score.",
    deadline: addDays(6),
    priority: "Medium",
    status: "In Progress",
    assignedDate: subDays(3),
    weightage: "25% Project Grade",
    tags: ["AI/ML", "PyTorch", "NLP"]
  },
  {
    id: "asn-6",
    title: "AI Ethics Case Study & GDPR Compliance Review",
    course: "Professional Ethics & Management",
    courseCode: "HUM201",
    description: "Analyze biometric surveillance deployment in academic institutions and outline compliance challenges under privacy frameworks.",
    deadline: subDays(3),
    priority: "Low",
    status: "Completed",
    assignedDate: subDays(10),
    weightage: "10% Assignment",
    tags: ["Ethics", "Policy"]
  }
];

export const initialAnnouncements = [
  {
    id: "ann-1",
    title: "End-Term Theory & Practical Examination Schedule (Fall 2026)",
    category: "Exam",
    issuedBy: "Controller of Examinations",
    department: "Academic Affairs",
    date: "2026-11-05",
    time: "10:30 AM",
    isPinned: true,
    isUrgent: true,
    isBookmarked: true,
    read: false,
    content: "The final examination datesheet for 6th and 8th semester B.Tech programs has been finalized. Theory examinations will commence from December 2, 2026. Hall tickets will be downloadable via the portal starting November 25. Ensure minimum 75% attendance to avoid debarment.",
    attachment: "End_Term_Datesheet_Fall_2026.pdf"
  },
  {
    id: "ann-2",
    title: "Annual Tech Symposium 'InnovateX 2026' Hackathon Registrations Open",
    category: "Events",
    issuedBy: "Student Council & ACM Chapter",
    department: "Campus Life",
    date: "2026-11-04",
    time: "03:15 PM",
    isPinned: true,
    isUrgent: false,
    isBookmarked: false,
    read: true,
    content: "Registrations are now open for the 36-hour flagship hackathon InnovateX 2026 with cash prizes worth $10,000+. Tracks include Autonomous AI Agents, Web3 Infra, and Climate Tech. Form teams of 2-4 members.",
    attachment: "InnovateX_Rulebook_2026.pdf"
  },
  {
    id: "ann-3",
    title: "Mandatory Attendance Criteria Verification for Exam Eligibility",
    category: "Urgent",
    issuedBy: "Dean of Academic Affairs",
    department: "Administration",
    date: "2026-11-03",
    time: "11:00 AM",
    isPinned: false,
    isUrgent: true,
    isBookmarked: true,
    read: false,
    content: "Students having cumulative attendance below 75% across individual subjects are advised to meet their respective academic advisors immediately. Compensatory makeup assignments and remedial lab sessions will be scheduled between Nov 15 - Nov 20.",
    attachment: "Attendance_Regulation_Circular_V3.pdf"
  },
  {
    id: "ann-4",
    title: "Campus Placement Drive: Top Tier Tech Companies Roster (Batch 2026)",
    category: "Academic",
    issuedBy: "Training & Placement Cell (T&P)",
    department: "Placement Cell",
    date: "2026-11-02",
    time: "09:00 AM",
    isPinned: false,
    isUrgent: false,
    isBookmarked: false,
    read: true,
    content: "Pre-placement talks and technical assessment dates for Google, Microsoft, and Uber internships/FTE will commence from next Monday. Please verify that your resume and GitHub links are updated in the T&P portal.",
    attachment: "TnP_Schedule_Nov2026.pdf"
  },
  {
    id: "ann-5",
    title: "Central Computing Lab Maintenance Window",
    category: "Academic",
    issuedBy: "IT Services",
    department: "Infrastructure",
    date: "2026-10-30",
    time: "05:00 PM",
    isPinned: false,
    isUrgent: false,
    isBookmarked: false,
    read: true,
    content: "The Central GPU Cluster and Virtual Machines will be offline for routine firmware patching and storage upgrades this Saturday from 02:00 AM to 06:00 AM.",
    attachment: null
  }
];

export const todaySchedule = [
  {
    id: "sch-1",
    time: "09:00 AM - 10:30 AM",
    subject: "Design & Analysis of Algorithms",
    code: "CS301",
    room: "Lab 402",
    professor: "Dr. Sarah Jenkins",
    type: "Lecture + Lab",
    status: "Completed"
  },
  {
    id: "sch-2",
    time: "11:00 AM - 12:30 PM",
    subject: "Database Management Systems",
    code: "CS302",
    room: "Hall 204",
    professor: "Prof. Michael Chang",
    type: "Lecture",
    status: "In Progress"
  },
  {
    id: "sch-3",
    time: "02:00 PM - 03:30 PM",
    subject: "Computer Networks & Security",
    code: "CS303",
    room: "Networking Lab 2",
    professor: "Dr. Elena Rostova",
    type: "Lab Practical",
    status: "Upcoming"
  },
  {
    id: "sch-4",
    time: "04:00 PM - 05:00 PM",
    subject: "Professional Ethics & Management",
    code: "HUM201",
    room: "Auditorium 2",
    professor: "Prof. David Miller",
    type: "Seminar",
    status: "Upcoming"
  }
];
