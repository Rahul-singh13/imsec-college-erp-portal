export const mockLibraryBooks = [
  {
    accessionNo: "ACC-CS-44102",
    isbn: "978-0131103627",
    title: "Database System Concepts (6th Edition)",
    author: "Abraham Silberschatz, Henry F. Korth",
    publisher: "McGraw-Hill Education",
    issueDate: "20-Aug-2024",
    dueDate: "20-Sep-2024",
    returnDate: null,
    status: "Issued (Active)",
    fine: "₹ 0.00"
  },
  {
    accessionNo: "ACC-CS-38914",
    isbn: "978-0262033848",
    title: "Introduction to Algorithms (CLRS 3rd Edition)",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    publisher: "MIT Press",
    issueDate: "20-Aug-2024",
    dueDate: "20-Sep-2024",
    returnDate: null,
    status: "Issued (Active)",
    fine: "₹ 0.00"
  },
  {
    accessionNo: "ACC-CS-29104",
    isbn: "978-0132143011",
    title: "Compilers: Principles, Techniques, and Tools (Dragon Book)",
    author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi",
    publisher: "Pearson",
    issueDate: "20-Aug-2024",
    dueDate: "20-Sep-2024",
    returnDate: null,
    status: "Issued (Active)",
    fine: "₹ 0.00"
  },
  {
    accessionNo: "ACC-CS-18451",
    isbn: "978-0131103627",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin",
    publisher: "Wiley",
    issueDate: "15-Jan-2024",
    dueDate: "15-May-2024",
    returnDate: "14-May-2024",
    status: "Returned",
    fine: "₹ 0.00"
  },
  {
    accessionNo: "ACC-CS-12903",
    isbn: "978-0132350884",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    issueDate: "10-Feb-2024",
    dueDate: "25-Feb-2024",
    returnDate: "24-Feb-2024",
    status: "Returned",
    fine: "₹ 0.00"
  }
];

export const mockLibraryCatalog = [
  { id: 1, title: "Computer Networks (5th Edition)", author: "Andrew S. Tanenbaum", copiesAvailable: 14, location: "Shelf CS-04" },
  { id: 2, title: "Software Engineering: A Practitioner's Approach", author: "Roger S. Pressman", copiesAvailable: 9, location: "Shelf CS-08" },
  { id: 3, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell, Peter Norvig", copiesAvailable: 6, location: "Shelf AI-02" },
  { id: 4, title: "Design Patterns: Elements of Reusable Object-Oriented Software", author: "Erich Gamma, Richard Helm (GoF)", copiesAvailable: 11, location: "Shelf CS-11" },
  { id: 5, title: "Discrete Mathematics and Its Applications", author: "Kenneth H. Rosen", copiesAvailable: 18, location: "Shelf MATH-03" }
];
