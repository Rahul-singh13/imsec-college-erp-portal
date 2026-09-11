export const mockTestMarks = [
  {
    subjectCode: "KCS-501",
    subjectName: "Database Management Systems",
    testType: "Sessional Test - 1",
    examDate: "15-May-2024",
    maxMarks: 50,
    obtainedMarks: 44,
    percentage: "88.0%",
    grade: "A+",
    facultyRemarks: "Excellent SQL queries & Normalization answers"
  },
  {
    subjectCode: "KCS-501",
    subjectName: "Database Management Systems",
    testType: "Sessional Test - 2",
    examDate: "20-Jun-2024",
    maxMarks: 50,
    obtainedMarks: 46,
    percentage: "92.0%",
    grade: "O",
    facultyRemarks: "Outstanding performance in Transactions and Concurrency"
  },
  {
    subjectCode: "KCS-502",
    subjectName: "Compiler Design",
    testType: "Sessional Test - 1",
    examDate: "16-May-2024",
    maxMarks: 50,
    obtainedMarks: 39,
    percentage: "78.0%",
    grade: "A",
    facultyRemarks: "Good parser construction concepts"
  },
  {
    subjectCode: "KCS-502",
    subjectName: "Compiler Design",
    testType: "Sessional Test - 2",
    examDate: "21-Jun-2024",
    maxMarks: 50,
    obtainedMarks: 42,
    percentage: "84.0%",
    grade: "A+",
    facultyRemarks: "Well documented intermediate code generation"
  },
  {
    subjectCode: "KCS-503",
    subjectName: "Design and Analysis of Algorithms",
    testType: "Sessional Test - 1",
    examDate: "17-May-2024",
    maxMarks: 50,
    obtainedMarks: 45,
    percentage: "90.0%",
    grade: "O",
    facultyRemarks: "Solid dynamic programming formulations"
  },
  {
    subjectCode: "KCS-503",
    subjectName: "Design and Analysis of Algorithms",
    testType: "Sessional Test - 2",
    examDate: "22-Jun-2024",
    maxMarks: 50,
    obtainedMarks: 43,
    percentage: "86.0%",
    grade: "A+",
    facultyRemarks: "Clear graph theory implementations"
  },
  {
    subjectCode: "KCS-054",
    subjectName: "Object Oriented System Design",
    testType: "Sessional Test - 1",
    examDate: "18-May-2024",
    maxMarks: 50,
    obtainedMarks: 40,
    percentage: "80.0%",
    grade: "A",
    facultyRemarks: "Precise UML diagrams"
  },
  {
    subjectCode: "KCS-054",
    subjectName: "Object Oriented System Design",
    testType: "Sessional Test - 2",
    examDate: "24-Jun-2024",
    maxMarks: 50,
    obtainedMarks: 41,
    percentage: "82.0%",
    grade: "A",
    facultyRemarks: "Good design patterns application"
  },
  {
    subjectCode: "KNC-501",
    subjectName: "Constitution of India, Law & Engineering",
    testType: "Sessional Test - 1",
    examDate: "19-May-2024",
    maxMarks: 50,
    obtainedMarks: 38,
    percentage: "76.0%",
    grade: "B+",
    facultyRemarks: "Clear understanding of fundamental rights"
  }
];

export const mockAdmitCard = {
  examSession: "Odd Semester Examination 2024-25",
  rollNo: "2201430100001",
  enrollmentNo: "EN2201430098",
  studentName: "DEMO STUDENT",
  fatherName: "MR. RAMESH SHARMA",
  instituteCode: "143",
  instituteName: "IMS ENGINEERING COLLEGE, GHAZIABAD",
  examCenterCode: "143",
  examCenterName: "IMS ENGINEERING COLLEGE (CAMPUS CENTRE), NH-24, GHAZIABAD",
  course: "B.TECH",
  branch: "COMPUTER SCIENCE AND ENGINEERING",
  semester: "5th Semester",
  status: "ELIGIBLE FOR EXAMINATION",
  admitCardId: "AC-2024-ODD-10001",
  issueDate: "15-Sep-2024",
  subjects: [
    { code: "KCS-501", name: "Database Management Systems", date: "25-Sep-2024", shift: "Morning (09:30 AM - 12:30 PM)" },
    { code: "KCS-502", name: "Compiler Design", date: "27-Sep-2024", shift: "Morning (09:30 AM - 12:30 PM)" },
    { code: "KCS-503", name: "Design and Analysis of Algorithms", date: "30-Sep-2024", shift: "Morning (09:30 AM - 12:30 PM)" },
    { code: "KCS-054", name: "Object Oriented System Design", date: "03-Oct-2024", shift: "Morning (09:30 AM - 12:30 PM)" },
    { code: "KNC-501", name: "Constitution of India, Law & Engineering", date: "05-Oct-2024", shift: "Morning (09:30 AM - 12:30 PM)" },
    { code: "KCS-551", name: "DBMS Lab", date: "08-Oct-2024", shift: "Practical Batch 1" },
    { code: "KCS-552", name: "Compiler Design Lab", date: "09-Oct-2024", shift: "Practical Batch 1" },
    { code: "KCS-553", name: "DAA Lab", date: "10-Oct-2024", shift: "Practical Batch 1" }
  ],
  instructions: [
    "Candidate must bring the original college ID card along with this printed Admit Card to the exam hall.",
    "No candidate will be allowed to enter the examination hall after 15 minutes of the commencement of exam.",
    "Mobile phones, smartwatches, programmable calculators, or any electronic gadgets are strictly prohibited.",
    "Check that the question paper matches your subject code before attempting answers.",
    "Use of unfair means (UFM) will result in strict disciplinary and university action."
  ]
};
