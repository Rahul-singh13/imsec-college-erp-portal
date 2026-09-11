import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Modal from '../components/Modal';
import { mockHostelInfo } from '../data/hostel';
import { Building, Phone, User, Utensils, CheckCircle2, Bed } from 'lucide-react';

export default function HostelRequest() {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomType, setRoomType] = useState('2-Seater (Air Conditioned)');
  const [remarks, setRemarks] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
      alert('[DEMO]: Hostel room reallocation request registered with Chief Warden Office!');
    }, 1000);
  };

  return (
    <div>
      <Breadcrumb
        title="Hostel Registration & Room Allocation"
        subtitle="Current hostel room allotment, warden contacts, mess catering details, and room change requests"
        items={[{ label: 'Hostel', link: null }, { label: 'Hostel Registration', link: null }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1.4fr)', gap: '20px' }}>
        
        {/* Left Side: Current Room Allocation */}
        <div className="erp-card">
          <div className="erp-card-header">
            <h3>
              <Building size={16} color="#253973" />
              Current Hostel Allotment (2024-25)
            </h3>
            <span className="badge badge-success">{mockHostelInfo.currentStatus}</span>
          </div>

          <div className="erp-card-body">
            <table className="erp-table">
              <tbody>
                <tr>
                  <th style={{ width: '35%' }}>Hostel Building</th>
                  <td><strong>{mockHostelInfo.hostelName}</strong></td>
                </tr>
                <tr>
                  <th>Room Number</th>
                  <td><strong style={{ color: '#253973', fontSize: '14px' }}>{mockHostelInfo.roomNo}</strong></td>
                </tr>
                <tr>
                  <th>Room Type</th>
                  <td>{mockHostelInfo.roomType}</td>
                </tr>
                <tr>
                  <th>Allotted Bed</th>
                  <td>{mockHostelInfo.bedNo}</td>
                </tr>
                <tr>
                  <th>Chief Warden</th>
                  <td>{mockHostelInfo.wardenName} ({mockHostelInfo.wardenPhone})</td>
                </tr>
                <tr>
                  <th>Hostel Caretaker</th>
                  <td>{mockHostelInfo.caretakerName} ({mockHostelInfo.caretakerPhone})</td>
                </tr>
                <tr>
                  <th>Mess Plan</th>
                  <td>{mockHostelInfo.messCategory}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '15px' }}>
              <button
                type="button"
                className="erp-btn erp-btn-primary"
                onClick={() => setModalOpen(true)}
              >
                <Bed size={14} /> Request Room Change / Next Year Renewal
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Mess Menu & Timings */}
        <div className="erp-card">
          <div className="erp-card-header">
            <h3>
              <Utensils size={16} color="#253973" />
              Hostel Mess Timings & Schedule
            </h3>
          </div>

          <div className="erp-card-body" style={{ fontSize: '12.5px' }}>
            <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, color: '#253973' }}>Breakfast</div>
              <div style={{ color: '#666' }}>07:30 AM - 09:00 AM &bull; Parathas, Poha, Milk, Tea, Eggs/Bananas</div>
            </div>

            <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, color: '#253973' }}>Lunch</div>
              <div style={{ color: '#666' }}>12:30 PM - 02:30 PM &bull; Dal Makhani / Rajma, Rice, Roti, Seasonal Veg, Curd</div>
            </div>

            <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, color: '#253973' }}>Evening Snacks & Tea</div>
              <div style={{ color: '#666' }}>05:00 PM - 06:00 PM &bull; Samosa / Cutlet / Sandwiches & Hot Tea</div>
            </div>

            <div style={{ padding: '8px 0' }}>
              <div style={{ fontWeight: 600, color: '#253973' }}>Dinner</div>
              <div style={{ color: '#666' }}>08:00 PM - 09:45 PM &bull; Shahi Paneer / Chicken (Wednesday), Dal, Rice, Sweet Dish</div>
            </div>
          </div>
        </div>

      </div>

      {/* Room Request Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Hostel Room Renewal / Reallocation Request"
        maxWidth="500px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {submitSuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              Request submitted to Warden Office!
            </div>
          )}

          <div className="form-group">
            <label>Preferred Room Configuration <span className="required-star">*</span></label>
            <select
              className="form-control"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="2-Seater (Air Conditioned)">2-Seater (Air Conditioned)</option>
              <option value="3-Seater (Air Conditioned)">3-Seater (Air Conditioned)</option>
              <option value="2-Seater (Non AC / Air Cooled)">2-Seater (Non AC / Air Cooled)</option>
              <option value="Single Seater (Final Year Only)">Single Seater (Final Year Only)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Roommate Preference (Roll No / Name)</label>
            <input type="text" className="form-control" placeholder="e.g. 2201430100042 - Rohan Verma" />
          </div>

          <div className="form-group">
            <label>Reason / Special Requirements</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="e.g. Medical request or floor preference..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}
