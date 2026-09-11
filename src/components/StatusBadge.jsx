import React from 'react';

export default function StatusBadge({ status }) {
  if (!status) return null;

  const st = String(status).toLowerCase();

  let badgeClass = 'badge-secondary';

  if (st.includes('present') || st.includes('eligible') || st.includes('success') || st.includes('resolved') || st.includes('cleared') || st.includes('verified') || st.includes('approved') || st.includes('paid') || st.includes('active') || st.includes('completed')) {
    badgeClass = 'badge-success';
  } else if (st.includes('absent') || st.includes('not eligible') || st.includes('failed') || st.includes('unpaid') || st.includes('rejected') || st.includes('debarred') || st.includes('cancelled')) {
    badgeClass = 'badge-danger';
  } else if (st.includes('pending') || st.includes('in progress') || st.includes('open') || st.includes('warning') || st.includes('due') || st.includes('applied')) {
    badgeClass = 'badge-warning';
  } else if (st.includes('submitted') || st.includes('info') || st.includes('stage') || st.includes('registered')) {
    badgeClass = 'badge-info';
  }

  return <span className={`badge ${badgeClass}`}>{status}</span>;
}
