export const mockFeeStructure = [
  {
    head: "Tuition Fee",
    amount: "₹ 1,15,000.00",
    paid: "₹ 1,15,000.00",
    balance: "₹ 0.00",
    status: "Paid"
  },
  {
    head: "University Examination & Development Fee",
    amount: "₹ 10,000.00",
    paid: "₹ 10,000.00",
    balance: "₹ 0.00",
    status: "Paid"
  },
  {
    head: "Student Activity & Training Development Fund",
    amount: "₹ 5,000.00",
    paid: "₹ 5,000.00",
    balance: "₹ 0.00",
    status: "Paid"
  },
  {
    head: "Medical & Insurance Charges",
    amount: "₹ 2,000.00",
    paid: "₹ 2,000.00",
    balance: "₹ 0.00",
    status: "Paid"
  },
  {
    head: "Hostel & Mess Charges (Annual)",
    amount: "₹ 85,000.00",
    paid: "₹ 85,000.00",
    balance: "₹ 0.00",
    status: "Paid"
  }
];

export const mockTransactions = [
  {
    txnId: "TXN2024081598214",
    orderNo: "ORD-IMSEC-2024-8841",
    date: "12-Aug-2024, 02:45 PM",
    amount: "₹ 1,32,000.00",
    mode: "Online Payment Gateway (HDFC SmartHub)",
    status: "Success",
    receiptNo: "REC-2024-55410",
    accountHead: "Academic Year 2024-25 Full Tuition Fee"
  },
  {
    txnId: "TXN2024081598215",
    orderNo: "ORD-IMSEC-2024-8842",
    date: "14-Aug-2024, 11:20 AM",
    amount: "₹ 85,000.00",
    mode: "Net Banking (SBI)",
    status: "Success",
    receiptNo: "REC-2024-55411",
    accountHead: "Hostel & Mess Annual Fee 2024-25"
  },
  {
    txnId: "TXN2024011244102",
    orderNo: "ORD-IMSEC-2024-3101",
    date: "10-Jan-2024, 04:12 PM",
    amount: "₹ 7,500.00",
    mode: "UPI / QR Code",
    status: "Success",
    receiptNo: "REC-2024-21094",
    accountHead: "Even Semester University Exam Fee"
  }
];

export const mockNoDuesDepartments = [
  { department: "Accounts Department", remarks: "All academic dues cleared for 2024-25", status: "Cleared / No Dues", date: "15-Aug-2024", officer: "Shri V. K. Goel (Finance Officer)" },
  { department: "Central Library", remarks: "All book bank sets and reference books returned", status: "Cleared / No Dues", date: "20-Aug-2024", officer: "Dr. S. K. Singh (Librarian)" },
  { department: "Departmental Labs (CSE)", remarks: "Lab kits & equipment verified intact", status: "Cleared / No Dues", date: "22-Aug-2024", officer: "Lab Incharge (CSE Dept)" },
  { department: "Hostel Warden Office", remarks: "No room inventory damage or mess dues pending", status: "Cleared / No Dues", date: "18-Aug-2024", officer: "Mr. Satish Kumar (Chief Warden)" },
  { department: "Sports & Gymnasium", remarks: "Sports equipment returned in good order", status: "Cleared / No Dues", date: "22-Aug-2024", officer: "Mr. R. P. Yadav (Sports Officer)" },
  { department: "Training & Placement Cell (CRC)", remarks: "Placement registration & documents verified", status: "Cleared / No Dues", date: "25-Aug-2024", officer: "CRC Coordinator" },
  { department: "Head of Department (CSE)", remarks: "Approved for semester registration and examinations", status: "Cleared / No Dues", date: "26-Aug-2024", officer: "HOD CSE" }
];
