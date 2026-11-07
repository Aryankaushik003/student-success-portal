# Student Success Portal 🎓

A modern, responsive, full-featured web application designed to empower college students to track attendance, organize assignments with countdowns, and stay up to date with official college announcements and circulars.

---

## 🚀 Key Features

### 1. Dashboard Overview
- **Welcoming Student Banner:** Personal greeting with student name, semester, roll number, current CGPA, and quick action triggers.
- **Attendance Percentage Card:** Visual circular gauge, percentage score, attended/total classes, and >75% threshold badge.
- **Assignment Hub Card:** Real-time count of pending assignments with breakdown pills (To-Do, Doing, Done).
- **Upcoming Deadlines Widget:** Displays immediate upcoming deadlines with urgency tags (*Due Today*, *Due Tomorrow*, *Safe*) and live countdowns.
- **Campus Circulars Widget:** Highlights latest administrative circulars and urgent notices.
- **Today's Class Timetable:** Live schedule showing lecture rooms, instructors, and session status (Completed, In Progress, Upcoming).

### 2. Attendance Tracker Module
- **Subject-Wise Breakdown:** Courses categorized with total classes held, classes attended, absent count, credits, professor, and room number.
- **Color-Coded Circular Indicators:**
  - 🟢 **Green (>75%):** Safe zone.
  - 🟡 **Amber (70–75%):** Near shortage warning.
  - 🔴 **Red (<75%):** Critical shortage alert.
- **Monthly Attendance History:** Expandable breakdown per subject showing month-by-month attendance progress bars.
- **Live Class Logger:** "+ Present" and "+ Absent" quick buttons that immediately recalculate percentages in real time.
- **Target Attendance Calculator & Simulator:** Calculates how many consecutive classes are needed to reach any target % (e.g. 75%, 80%) or how many classes can safely be skipped.
- **Add Course:** Modal to add custom subjects and initial attendance records.

### 3. Assignment & Deadline Manager
- **Kanban Board & List Views:** Seamless toggle between 3-lane Kanban board (*Pending*, *In Progress*, *Completed*) and detailed List view.
- **Urgency Badges & Countdown:** Automatic calculation of deadlines (*Overdue*, *Due Today*, *Due Tomorrow*, *Due in X days*, *Safe*).
- **Course & Priority Filters:** Filter by course code and priority levels (*High*, *Medium*, *Low*).
- **Status Toggles & Completion:** Instant one-click status transition and "Mark as Done" checkbox.
- **New Assignment Modal:** Add new coursework with strict deadline pickers, descriptions, and weightage.

### 4. College Info & Announcements Board
- **Dedicated Notice Board:** Official circulars, exam datesheets, and event notices from the administration.
- **Categorization Pills:** Academic, Exam, Events, Urgent, Placement, and Bookmarked.
- **Pinned Notices:** Important circulars pinned at the top.
- **Detailed Circular Preview Modal:** Read full announcements with verified digital signatures and mock PDF attachment downloads.
- **Notice Bookmarking:** Star notices for quick retrieval.
- **Publish Notice Modal:** Facility to create new announcements.

### 5. Settings & Profile
- Student credentials management (Name, Roll Number, Department, Semester, CGPA, Institution).
- Configurable target attendance threshold (default 75%).
- Theme switcher: Light Mode and Dark Mode support.
- Reset demo data button to restore initial state at any time.

---

## 🛠 Tech Stack

- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS (Dark Mode enabled)
- **Icons:** Lucide React
- **State Management:** React Context API with automatic `localStorage` persistence

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL printed in the terminal).

### 3. Build for Production
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```

