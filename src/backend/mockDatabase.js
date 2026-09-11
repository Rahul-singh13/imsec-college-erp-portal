/**
 * BACKEND / MOCK DATABASE LAYER
 * 
 * Centralized in-memory mock database simulating ERP server-side models.
 * Completely offline and privacy-safe.
 */

import { mockStudent } from '../data/student';
import { mockNotices } from '../data/notices';
import { mockSubjectAttendance } from '../data/attendance';
import { mockFeeStructure } from '../data/fees';
import { mockLibraryBooks, mockLibraryCatalog } from '../data/library';
import { mockCompanies } from '../data/placements';

export const mockDatabase = {
  // Student Profile Collection
  students: [mockStudent],

  // Circulars & Notices Collection
  notices: mockNotices,

  // Attendance Records
  attendance: mockSubjectAttendance,

  // Finance & Fee Records
  fees: mockFeeStructure,

  // Library Inventory & Issued Books
  library: {
    issued: mockLibraryBooks,
    catalog: mockLibraryCatalog
  },

  // Placement Companies
  placements: mockCompanies
};

export default mockDatabase;
