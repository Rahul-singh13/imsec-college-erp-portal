/**
 * BACKEND / ACADEMIC SERVICE
 * 
 * Handles business logic for notices, attendance calculations,
 * admit card eligibility, and course materials.
 */

import { mockDatabase } from './mockDatabase';

export const academicService = {
  // Get all active notices
  getNotices: () => {
    return mockDatabase.notices;
  },

  // Get subject-wise attendance calculation
  getSubjectAttendance: () => {
    const records = mockDatabase.attendance;
    const totalDelivered = records.reduce((acc, curr) => acc + curr.total, 0);
    const totalAttended = records.reduce((acc, curr) => acc + curr.present, 0);
    const overallPercentage = ((totalAttended / totalDelivered) * 100).toFixed(2);

    return {
      records,
      summary: {
        totalDelivered,
        totalAttended,
        totalMissed: totalDelivered - totalAttended,
        overallPercentage: `${overallPercentage}%`,
        isEligibleForExams: overallPercentage >= 75
      }
    };
  },

  // Student Profile Record
  getStudentProfile: () => {
    return mockDatabase.students[0];
  }
};

export default academicService;
