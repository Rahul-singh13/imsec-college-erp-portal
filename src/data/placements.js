export const mockCompanies = [
  {
    id: 1,
    name: "Tata Consultancy Services (TCS)",
    role: "System Engineer / Ninja / Digital",
    packageCTC: "₹ 3.6 - 7.5 LPA",
    driveDate: "20-Sep-2024",
    lastDateToApply: "15-Sep-2024",
    location: "Pan India / Noida / Gurugram",
    eligibilityCriteria: "60% or 6.0 CGPA throughout (10th, 12th, B.Tech), Max 1 active backlog",
    status: "Applied",
    driveType: "On Campus",
    rounds: ["Online Cognitive & Coding Test", "Technical Interview", "Managerial & HR Round"],
    bond: "1 Year",
    description: "TCS is inviting applications for its flagship graduate trainee hiring drive across various business units."
  },
  {
    id: 2,
    name: "Infosys Limited",
    role: "Specialist Programmer & Digital Specialist Engineer",
    packageCTC: "₹ 6.25 - 9.5 LPA",
    driveDate: "28-Sep-2024",
    lastDateToApply: "22-Sep-2024",
    location: "Bengaluru / Pune / Hyderabad",
    eligibilityCriteria: "65% or 6.5 CGPA in B.Tech CSE/IT, No active backlogs",
    status: "Eligible (Registration Open)",
    driveType: "Virtual Campus Drive",
    rounds: ["HackWithInfy / Online Coding Round", "Technical Round 1", "HR Round"],
    bond: "None",
    description: "Infosys high-package developer roles focusing on full-stack development, cloud architecture, and AI integrations."
  },
  {
    id: 3,
    name: "Capgemini India",
    role: "Senior Analyst / Software Engineer",
    packageCTC: "₹ 4.25 - 5.75 LPA",
    driveDate: "05-Oct-2024",
    lastDateToApply: "30-Sep-2024",
    location: "Noida / Mumbai / Bengaluru",
    eligibilityCriteria: "60% in 10th & 12th, 6.0 CGPA in Graduation",
    status: "Eligible (Registration Open)",
    driveType: "Pool Campus",
    rounds: ["Pseudocode & English Test", "Game-Based Aptitude", "Technical & HR Interview"],
    bond: "None",
    description: "Global consulting leader hiring technology enthusiasts for consulting and software engineering assignments."
  },
  {
    id: 4,
    name: "Cognizant (CTS)",
    role: "GenC Next Developer",
    packageCTC: "₹ 6.75 LPA",
    driveDate: "12-Oct-2024",
    lastDateToApply: "05-Oct-2024",
    location: "Gurugram / Chennai / Kolkata",
    eligibilityCriteria: "65% throughout, Strong proficiency in Java/Python/C++",
    status: "Eligible (Registration Open)",
    driveType: "On Campus",
    rounds: ["Skill-based Assessment", "Live Coding Interview", "HR Discussion"],
    bond: "None",
    description: "Premium engineering cohort focusing on enterprise software engineering and cloud transformations."
  },
  {
    id: 5,
    name: "Wipro Technologies",
    role: "Project Engineer (Turbo / Elite)",
    packageCTC: "₹ 3.5 - 6.5 LPA",
    driveDate: "18-Oct-2024",
    lastDateToApply: "10-Oct-2024",
    location: "Noida / Pune / Hyderabad",
    eligibilityCriteria: "60% throughout, No active backlogs",
    status: "Eligible (Registration Open)",
    driveType: "National Level Drive",
    rounds: ["National Talent Hunt Assessment", "Written Communication", "Technical & HR"],
    bond: "1 Year",
    description: "Wipro Elite National Talent Hunt hiring fresh engineering talent for software engineering projects."
  }
];

export const mockPlacementRules = [
  "Every student is entitled to receive ONE Dream Offer (>= 6.0 LPA) and ONE Regular Offer.",
  "Attendance in all CRC training sessions, mock interviews, and aptitude tests is mandatory (minimum 85%).",
  "Once shortlisted for a company's final interview rounds, the candidate must attend the interview without fail.",
  "Any misbehavior, proxy attendance, or falsification of resumes will result in immediate debarment from the placement season.",
  "Students must wear formal college attire during all offline and virtual interview drives."
];

export const mockUploadedDocuments = [
  { id: 1, docType: "Curriculum Vitae (Resume)", fileName: "Demo_Student_Resume_v3.pdf", uploadDate: "01-Sep-2024", status: "Verified by CRC", size: "245 KB" },
  { id: 2, docType: "10th Marksheet", fileName: "Demo_10th_Marksheet.pdf", uploadDate: "10-Aug-2024", status: "Verified by CRC", size: "512 KB" },
  { id: 3, docType: "12th Marksheet", fileName: "Demo_12th_Marksheet.pdf", uploadDate: "10-Aug-2024", status: "Verified by CRC", size: "480 KB" },
  { id: 4, docType: "B.Tech All Semester Marksheets", fileName: "Demo_BTech_Sem1_to_4_Consolidated.pdf", uploadDate: "15-Aug-2024", status: "Verified by CRC", size: "1.2 MB" },
  { id: 5, docType: "Aadhaar Card", fileName: "Demo_Aadhaar_Masked.pdf", uploadDate: "10-Aug-2024", status: "Verified by CRC", size: "320 KB" },
  { id: 6, docType: "Technical Certifications (AWS / Java)", fileName: "AWS_Certified_Cloud_Practitioner.pdf", uploadDate: "05-Sep-2024", status: "Verified by CRC", size: "650 KB" }
];
