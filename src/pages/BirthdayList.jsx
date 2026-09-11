import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { mockBirthdays } from '../data/misc';
import { Cake, Heart, Sparkles, Send } from 'lucide-react';

export default function BirthdayList() {
  const [wished, setWished] = useState({});

  const handleWish = (id, name) => {
    setWished((prev) => ({ ...prev, [id]: true }));
    alert(`[DEMO]: Birthday greeting card & notification sent to ${name}! 🎂🎉`);
  };

  return (
    <div>
      <Breadcrumb
        title="Birthdays of the Month (September)"
        subtitle="Celebrate campus birthdays with batchmates, faculty members, and student peers"
        items={[{ label: 'Birthdays', link: null }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {mockBirthdays.map((b) => (
          <div key={b.id} className="erp-card" style={{ textAlign: 'center', padding: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: b.avatarColor || '#253973',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                marginBottom: '12px',
                boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
              }}
            >
              <Cake size={26} />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#253973', margin: '0 0 4px 0' }}>
              {b.name}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#666', margin: '0 0 10px 0' }}>{b.course}</p>

            <div
              style={{
                display: 'inline-block',
                background: '#fef3c7',
                color: '#92400e',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderRadius: '12px',
                marginBottom: '18px'
              }}
            >
              🎉 Birthday: {b.date}
            </div>

            <div>
              {wished[b.id] ? (
                <button
                  type="button"
                  className="erp-btn erp-btn-success erp-btn-sm"
                  disabled
                  style={{ width: '100%' }}
                >
                  <Heart size={13} /> Greeting Sent!
                </button>
              ) : (
                <button
                  type="button"
                  className="erp-btn erp-btn-primary erp-btn-sm"
                  onClick={() => handleWish(b.id, b.name)}
                  style={{ width: '100%' }}
                >
                  <Send size={13} /> Send Birthday Wishes
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
