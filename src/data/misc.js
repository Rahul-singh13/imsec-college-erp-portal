export const mockProject = {
  projectTitle: "Automated AI-Powered Campus Gate Management & Security System",
  projectType: "Minor Project (Semester 5)",
  guideName: "Dr. Pankaj Sharma (Associate Professor, CSE)",
  teamId: "CSE-2024-MIN-08",
  teamMembers: [
    { rollNo: "2201430100001", name: "Demo Student (Team Leader)", role: "Full-Stack Development & Architecture" },
    { rollNo: "2201430100042", name: "Rohan Verma", role: "Computer Vision & OCR Module" },
    { rollNo: "2201430100078", name: "Priya Singh", role: "Hardware Integration & RFID Reader" },
    { rollNo: "2201430100095", name: "Aman Gupta", role: "Database Design & API Security" }
  ],
  synopsisStatus: "Approved by Project Review Committee",
  currentPhase: "Sprint 2: Algorithm Implementation & Prototyping",
  submissionDeadline: "15-Nov-2024",
  abstract: "The project aims to modernize physical security checks and gate pass authentication across institutional premises through automated License Plate Recognition (ANPR), QR code verification, and real-time student ERP telemetry synchronization."
};

export const mockTrainingMaterials = [
  {
    id: 1,
    subject: "Database Management Systems (KCS-501)",
    unit: "Unit 1: Introduction to DBMS & Relational Model",
    faculty: "Dr. Pankaj Sharma",
    title: "Lecture Notes & Slides: ER Diagrams and Relational Algebra",
    uploadedDate: "25-Aug-2024",
    fileSize: "3.4 MB",
    fileType: "PDF Document",
    fileName: "DBMS_Unit1_Lecture_Notes.pdf"
  },
  {
    id: 2,
    subject: "Database Management Systems (KCS-501)",
    unit: "Unit 2: SQL and Relational Database Design",
    faculty: "Dr. Pankaj Sharma",
    title: "Normalization Guide: 1NF, 2NF, 3NF, BCNF with Solved Examples",
    uploadedDate: "02-Sep-2024",
    fileSize: "2.1 MB",
    fileType: "PDF Document",
    fileName: "DBMS_Unit2_Normalization_Cheatsheet.pdf"
  },
  {
    id: 3,
    subject: "Compiler Design (KCS-502)",
    unit: "Unit 1: Introduction to Compilers & Lexical Analysis",
    faculty: "Prof. Amit Verma",
    title: "Phases of Compiler and Finite Automata Construction",
    uploadedDate: "28-Aug-2024",
    fileSize: "4.8 MB",
    fileType: "PDF Document",
    fileName: "CD_Unit1_Lexical_Analysis.pdf"
  },
  {
    id: 4,
    subject: "Design and Analysis of Algorithms (KCS-503)",
    unit: "Unit 1: Asymptotic Notations & Recurrence Relations",
    faculty: "Dr. Sunita Gupta",
    title: "Master Theorem & Divide and Conquer Proofs",
    uploadedDate: "29-Aug-2024",
    fileSize: "1.9 MB",
    fileType: "PDF Document",
    fileName: "DAA_Unit1_Asymptotics.pdf"
  },
  {
    id: 5,
    subject: "Object Oriented System Design (KCS-054)",
    unit: "Unit 1: Object Oriented Concepts & UML Modeling",
    faculty: "Prof. Rohit Saxena",
    title: "Complete UML Diagram Reference & Case Studies",
    uploadedDate: "01-Sep-2024",
    fileSize: "5.2 MB",
    fileType: "PPT Presentation",
    fileName: "OOSD_Unit1_UML_Case_Studies.pptx"
  }
];

export const mockStudentEvents = [
  {
    id: 1,
    title: "IMS HackX 2024: 36-Hour National Hackathon",
    category: "Technical / Hackathon",
    date: "18-Oct-2024 to 20-Oct-2024",
    venue: "Main Auditorium & Computing Labs",
    organizer: "Dept of Computer Science & CSI Chapter",
    prizePool: "₹ 1,50,000",
    registrationStatus: "Registered (Team CodeCraft)",
    description: "Build cutting-edge solutions across AI/ML, Web3, FinTech, and Smart Cities."
  },
  {
    id: 2,
    title: "Annual Sports Meet: Athena 2024",
    category: "Sports",
    date: "04-Nov-2024 to 06-Nov-2024",
    venue: "College Sports Complex & Cricket Ground",
    organizer: "Physical Education Dept",
    prizePool: "Trophies & Medals",
    registrationStatus: "Registered (Badminton Singles & Relay Race)",
    description: "Inter-departmental track, field, and indoor sports tournaments."
  },
  {
    id: 3,
    title: "VIBGYOR 2024 Cultural Night & Battle of Bands",
    category: "Cultural",
    date: "15-Nov-2024",
    venue: "Open Air Amphitheatre",
    organizer: "Cultural Club 'Tarang'",
    prizePool: "₹ 50,000",
    registrationStatus: "Open for Auditions",
    description: "Showcase musical talent, street play, classical dance, and fashion show."
  }
];

export const mockComplaints = [
  {
    id: "GR-2024-104",
    category: "Hostel & Infrastructure",
    subject: "Air conditioning cooling issue in Room B-304",
    description: "The AC unit in hostel room B-304 is making humming noise and cooling is insufficient.",
    lodgedDate: "06-Sep-2024",
    status: "Resolved",
    resolvedDate: "07-Sep-2024",
    actionTaken: "Filter cleaned and compressor gas refilled by technician."
  },
  {
    id: "GR-2024-089",
    category: "IT & Wi-Fi Network",
    subject: "Slow connection speed on Block-B 3rd Floor Access Point",
    description: "Frequent disconnection observed between 8 PM to 11 PM during peak hours.",
    lodgedDate: "25-Aug-2024",
    status: "Resolved",
    resolvedDate: "26-Aug-2024",
    actionTaken: "Channel re-configured and firmware updated on AP-B3."
  },
  {
    id: "GR-2024-118",
    category: "Academic / Timetable",
    subject: "Request for extra tutorial session for Compiler Design",
    description: "Need additional practice session for LR(1) and LALR parser numericals.",
    lodgedDate: "08-Sep-2024",
    status: "In Progress",
    resolvedDate: null,
    actionTaken: "Forwarded to HOD CSE; Saturday 11 AM tutorial class scheduled."
  }
];

export const mockRfidRequests = [
  {
    requestId: "RFID-2024-551",
    requestType: "Smart Identity Card (RFID Reissue)",
    reason: "Damaged magnetic chip on original ID Card",
    appliedDate: "02-Sep-2024",
    feePaid: "₹ 200.00",
    status: "Card Printed & Ready for Collection",
    pickupCounter: "Student Registrar Window 3"
  }
];

export const mockBirthdays = [
  { id: 1, name: "Aarav Sharma", course: "B.Tech CSE - 5th Sem", date: "11-Sep", avatarColor: "#3498db" },
  { id: 2, name: "Rohan Verma", course: "B.Tech CSE - 5th Sem", date: "12-Sep", avatarColor: "#2ecc71" },
  { id: 3, name: "Dr. Pankaj Sharma", course: "Faculty (HOD CSE)", date: "14-Sep", avatarColor: "#9b59b6" },
  { id: 4, name: "Priya Patel", course: "B.Tech IT - 5th Sem", date: "16-Sep", avatarColor: "#e67e22" },
  { id: 5, name: "Aditya Singh", course: "B.Tech CSE - 5th Sem", date: "19-Sep", avatarColor: "#e74c3c" },
  { id: 6, name: "Prof. Amit Verma", course: "Faculty (Assistant Professor)", date: "24-Sep", avatarColor: "#1abc9c" }
];

export const mockScholarships = [
  {
    scholarshipScheme: "Uttar Pradesh Post-Matric Scholarship Scheme (UP Govt)",
    academicSession: "2024-25",
    applicationId: "UP-SCH-2024-984102",
    appliedDate: "15-Aug-2024",
    sanctionedAmount: "₹ 55,000.00",
    disbursementStatus: "Verified by District Welfare Officer (DWO)",
    currentStage: "Stage 4: Pending Bank Account Credit (DBT)"
  },
  {
    scholarshipScheme: "IMSEC Meritorious Student Institutional Waiver",
    academicSession: "2023-24",
    applicationId: "IMSEC-MERIT-2023-44",
    appliedDate: "10-Jul-2023",
    sanctionedAmount: "₹ 25,000.00",
    disbursementStatus: "Fee Adjusted in Tuition Installment",
    currentStage: "Completed & Disbursed"
  }
];

export const mockStudentRepresentatives = [
  {
    role: "Head Boy / President (Student Council)",
    name: "Vikramaditya Chauhan",
    branch: "B.Tech CSE (4th Year)",
    contact: "president.council@imsec.ac.in",
    responsibilities: "College-level student representation, fest coordination, grievance delegation."
  },
  {
    role: "Head Girl / Vice President (Student Council)",
    name: "Ananya Saxena",
    branch: "B.Tech IT (4th Year)",
    contact: "vp.council@imsec.ac.in",
    responsibilities: "Academic feedback, event management, female student welfare."
  },
  {
    role: "Class Representative (CR - B.Tech CSE 5th Sem Sec-A)",
    name: "Demo Student",
    branch: "B.Tech CSE (3rd Year)",
    contact: "demo.student@imsec.ac.in",
    responsibilities: "Daily lecture attendance liaison, faculty coordination, timetable updates."
  },
  {
    role: "Cultural Committee Secretary",
    name: "Kartik Nair",
    branch: "B.Tech ECE (3rd Year)",
    contact: "cultural.sec@imsec.ac.in",
    responsibilities: "Club activities, competitions, external college invitations."
  },
  {
    role: "Training & Placement Student Coordinator",
    name: "Divya Rastogi",
    branch: "B.Tech CSE (4th Year)",
    contact: "tpo.student@imsec.ac.in",
    responsibilities: "Placement drive registrations, hospitality of recruiters, interview logistics."
  }
];

export const mockDownloadForms = [
  {
    title: "Admission Withdrawal / No Dues Form",
    file: "Admission_Withdrawal_No_Dues_Form.pdf",
    category: "Academic & Accounts",
    description: "Official procedure and clearance sheet for withdrawing admission and refund processing."
  },
  {
    title: "Hostel Withdrawal Form",
    file: "Hostel_Withdrawal_Form.pdf",
    category: "Hostel",
    description: "Form for vacating hostel room, room inventory inspection, and mess deposit refund."
  },
  {
    title: "Duplicate Marksheet Issue Application",
    file: "Duplicate_Marksheet_Issue_Form.pdf",
    category: "Examination",
    description: "Application format with university undertaking for requesting duplicate grade cards."
  },
  {
    title: "Migration Certificate Withdrawal Format",
    file: "Migration_Withdrawal_Format.pdf",
    category: "Registrar Office",
    description: "Request form for retrieving or issuing university migration and transfer certificates."
  },
  {
    title: "Original Documents Withdrawal Form",
    file: "Original_Documents_Withdrawal_Form.pdf",
    category: "Registrar Office",
    description: "Undertaking for temporary or permanent withdrawal of original 10th/12th certificates."
  }
];
