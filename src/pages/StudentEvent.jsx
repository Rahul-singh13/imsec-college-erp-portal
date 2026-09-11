import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockStudentEvents } from '../data/misc';
import { Trophy, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function StudentEvent() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleRegister = (event) => {
    setSelectedEvent(event);
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setSelectedEvent(null);
      alert('[DEMO]: Event registration confirmed! Your team registration pass has been generated.');
    }, 1200);
  };

  return (
    <div>
      <Breadcrumb
        title="Sports & Cultural Events"
        subtitle="Annual college fest (VIBGYOR), sports meet (Athena), national hackathons, and extracurricular registrations"
        items={[{ label: 'Events & Sports', link: null }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {mockStudentEvents.map((ev) => (
          <div key={ev.id} className="erp-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="erp-card-header" style={{ background: '#f8fafc' }}>
              <h3 style={{ fontSize: '14px' }}>
                <Trophy size={16} color="#253973" />
                {ev.title}
              </h3>
              <StatusBadge status={ev.registrationStatus} />
            </div>

            <div className="erp-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12.5px', color: '#555', lineHeight: '1.6', marginBottom: '15px' }}>
                  {ev.description}
                </p>

                <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '3px', border: '1px solid #e2e8f0', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="#253973" />
                    <span><strong>Dates:</strong> {ev.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color="#253973" />
                    <span><strong>Venue:</strong> {ev.venue}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={13} color="#253973" />
                    <span><strong>Prize Pool / Rewards:</strong> {ev.prizePool}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '18px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="erp-btn erp-btn-default erp-btn-sm"
                  onClick={() => {
                    alert(`[DEMO]: Certificate of Participation for "${ev.title}" will be generated after event conclusion.`);
                  }}
                >
                  <Award size={13} /> Participation Certificate
                </button>
                <button
                  type="button"
                  className="erp-btn erp-btn-primary erp-btn-sm"
                  onClick={() => handleRegister(ev)}
                >
                  Register / Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={`Register for ${selectedEvent?.title}`}
        maxWidth="550px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSelectedEvent(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-success"
              onClick={submitRegistration}
            >
              Confirm Registration
            </button>
          </>
        }
      >
        {selectedEvent && (
          <form onSubmit={submitRegistration}>
            {registerSuccess && (
              <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Registration successfully received!
              </div>
            )}

            <div className="form-group">
              <label>Participant / Team Name <span className="required-star">*</span></label>
              <input type="text" className="form-control" defaultValue="Team CodeCraft (Demo)" required />
            </div>

            <div className="form-group">
              <label>Primary Contact Phone <span className="required-star">*</span></label>
              <input type="text" className="form-control" defaultValue="+91 98765 43210" required />
            </div>

            <div className="form-group">
              <label>Number of Team Members</label>
              <select className="form-control" defaultValue="4">
                <option value="1">Individual / 1 Member</option>
                <option value="2">2 Members</option>
                <option value="3">3 Members</option>
                <option value="4">4 Members</option>
              </select>
            </div>

            <div className="form-group">
              <label>Specific Sub-Event / Track</label>
              <input type="text" className="form-control" placeholder="e.g. AI track, Web track, Badminton singles" />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
