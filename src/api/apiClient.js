/**
 * FRONTEND API CLIENT LAYER
 * 
 * Clean REST API abstraction layer connecting Frontend pages to Backend services.
 */

import { academicService } from '../backend/academicService';
import { financeService } from '../backend/financeService';

export const erpApi = {
  // Academic Endpoints
  getNotices: async () => academicService.getNotices(),
  getAttendance: async () => academicService.getSubjectAttendance(),
  getStudentProfile: async () => academicService.getStudentProfile(),

  // Finance Endpoints
  getFeeDetails: async () => financeService.getFeeDetails(),
  submitFeePayment: async (data) => financeService.processPayment(data)
};

export default erpApi;
