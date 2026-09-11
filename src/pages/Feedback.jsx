import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { MessageSquareHeart, Star, CheckCircle2 } from 'lucide-react';

const mockSubjectsFeedback = [
  { id: 1, code: 'KCS-501', subject: 'Database Management Systems', faculty: 'Dr. Pankaj Sharma' },
  { id: 2, code: 'KCS-502', subject: 'Compiler Design', faculty: 'Prof. Amit Verma' },
  { id: 3, code: 'KCS-503', subject: 'Design and Analysis of Algorithms', faculty: 'Dr. Sunita Gupta' },
  { id: 4, code: 'KCS-054', subject: 'Object Oriented System Design', faculty: 'Prof. Rohit Saxena' },
  { id: 5, code: 'KNC-501', subject: 'Constitution of India', faculty: 'Dr. Rekha Mishra' }
];

export default function Feedback() {
  const [ratings, setRatings] = useState({
    1: { p1: 5, p2: 5, p3: 4, p4: 5 },
    2: { p1: 4, p2: 5, p3: 4, p4: 4 },
    3: { p1: 5, p2: 5, p3: 5, p4: 5 },
    4: { p1: 4, p2: 4, p3: 4, p4: 4 },
    5: { p1: 5, p2: 4, p3: 4, p4: 5 }
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (subjectId, parameter, val) => {
    setRatings((prev) => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [parameter]: val
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert('[DEMO]: Confidential faculty & course evaluation submitted successfully to Dean Academics!');
    }, 500);
  };

  return (
    <div>
      <Breadcrumb
        title="Student Faculty & Course Feedback"
        subtitle="Confidential end-semester teaching-learning evaluation form (5-point rating scale)"
        items={[{ label: 'Academics', link: null }, { label: 'Feedback', link: null }]}
      />

      {submitted ? (
        <div className="erp-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <CheckCircle2 size={54} color="#28a745" style={{ marginBottom: '15px' }} />
          <h3 style={{ color: '#253973', marginBottom: '8px' }}>Thank You for Submitting Your Feedback!</h3>
          <p style={{ color: '#666', fontSize: '13px', maxWidth: '500px', margin: '0 auto 20px auto' }}>
            Your ratings and comments have been recorded anonymously for internal academic quality assurance.
          </p>
          <button
            type="button"
            className="erp-btn erp-btn-default"
            onClick={() => setSubmitted(false)}
          >
            Review Submitted Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ background: '#eef2f9', padding: '12px 16px', borderRadius: '4px', marginBottom: '20px', fontSize: '12.5px', color: '#253973', border: '1px solid #ccd5e6' }}>
            <strong>Confidentiality Notice:</strong> Student feedback is 100% anonymous and encrypted. Ratings are compiled in aggregate for institutional faculty enhancement.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {mockSubjectsFeedback.map((sub, idx) => (
              <div key={sub.id} className="erp-card">
                <div className="erp-card-header" style={{ background: '#f8fafc' }}>
                  <h3>
                    <span className="badge badge-primary">{sub.code}</span>
                    {sub.subject}
                  </h3>
                  <span style={{ fontSize: '12.5px', color: '#555' }}>
                    Faculty: <strong>{sub.faculty}</strong>
                  </span>
                </div>

                <div className="erp-card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px' }}>
                    
                    {/* Parameter 1 */}
                    <div style={{ background: '#fafafa', padding: '10px 14px', borderRadius: '3px', border: '1px solid #eee' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        1. Subject Knowledge & Clarity of Explanation
                      </label>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(sub.id, 'p1', star)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Star
                              size={20}
                              color={star <= (ratings[sub.id]?.p1 || 0) ? '#f39c12' : '#ccc'}
                              fill={star <= (ratings[sub.id]?.p1 || 0) ? '#f39c12' : 'transparent'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Parameter 2 */}
                    <div style={{ background: '#fafafa', padding: '10px 14px', borderRadius: '3px', border: '1px solid #eee' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        2. Punctuality & Timely Syllabus Completion
                      </label>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(sub.id, 'p2', star)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Star
                              size={20}
                              color={star <= (ratings[sub.id]?.p2 || 0) ? '#f39c12' : '#ccc'}
                              fill={star <= (ratings[sub.id]?.p2 || 0) ? '#f39c12' : 'transparent'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Parameter 3 */}
                    <div style={{ background: '#fafafa', padding: '10px 14px', borderRadius: '3px', border: '1px solid #eee' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        3. Doubt Solving & Student Interaction
                      </label>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(sub.id, 'p3', star)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Star
                              size={20}
                              color={star <= (ratings[sub.id]?.p3 || 0) ? '#f39c12' : '#ccc'}
                              fill={star <= (ratings[sub.id]?.p3 || 0) ? '#f39c12' : 'transparent'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Parameter 4 */}
                    <div style={{ background: '#fafafa', padding: '10px 14px', borderRadius: '3px', border: '1px solid #eee' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        4. Quality of Notes & Study Material
                      </label>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(sub.id, 'p4', star)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                          >
                            <Star
                              size={20}
                              color={star <= (ratings[sub.id]?.p4 || 0) ? '#f39c12' : '#ccc'}
                              fill={star <= (ratings[sub.id]?.p4 || 0) ? '#f39c12' : 'transparent'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '25px', marginBottom: '30px' }}>
            <button type="submit" className="erp-btn erp-btn-primary" style={{ padding: '10px 30px', fontSize: '14px' }}>
              <CheckCircle2 size={16} /> Submit Semester Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
