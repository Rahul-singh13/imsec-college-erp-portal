/**
 * BACKEND / FINANCE SERVICE
 * 
 * Handles fee due calculations, payment processing simulation,
 * and ledger transaction history.
 */

import { mockDatabase } from './mockDatabase';

export const financeService = {
  // Get Fee Dues & Ledger Breakdown
  getFeeDetails: () => {
    return {
      feeStructure: mockDatabase.fees,
      dueAmount: '0.00',
      hostelDueAmount: '0.00',
      status: 'NO DUES'
    };
  },

  // Simulate online fee transaction payment
  processPayment: (paymentData) => {
    return {
      success: true,
      transactionId: 'TXN' + Math.floor(100000000 + Math.random() * 900000000),
      timestamp: new Date().toISOString(),
      amount: paymentData.amount,
      mode: paymentData.mode || 'Online NetBanking/UPI',
      receiptUrl: '#/download_receipt'
    };
  }
};

export default financeService;
