import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No Records Found', message = 'There are currently no records to display matching your criteria.' }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
      <Inbox size={48} color="#ccc" style={{ marginBottom: '12px' }} />
      <h4 style={{ margin: '0 0 6px 0', color: '#555', fontSize: '15px' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '12px' }}>{message}</p>
    </div>
  );
}
