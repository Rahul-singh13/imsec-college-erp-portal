import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { mockStudent } from '../data/student';
import { User, Phone, Mail, MapPin, Award, BookOpen, Building, CheckCircle } from 'lucide-react';

export default function ViewAdmission() {
  const [activeTab, setActiveTab] = useState('academic');

  return (
    <div>
      <Breadcrumb
        title="Student Admission & Profile"
        subtitle="Complete institutional registration details, personal credentials, and academic enrollment record"
        items={[{ label: 'Admission Profile', link: null }]}
      />

      {/* Profile Header Card */}
      <div className="erp-card">
        <div
          className="erp-card-body"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'linear-gradient(to right, #ffffff, #f7f9fa)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                background: '#253973',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 'bold',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}
            >
              DS
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#253973', margin: '0 0 4px 0' }}>
                {mockStudent.name}
              </h2>
              <div style={{ fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                <strong>{mockStudent.course}</strong> &bull; {mockStudent.stream}
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#777', flexWrap: 'wrap' }}>
                <span>Admission No: <strong style={{ color: '#253973' }}>{mockStudent.admissionNo}</strong></span>
                <span>Roll No: <strong style={{ color: '#253973' }}>{mockStudent.rollNo}</strong></span>
                <span>Semester: <strong>{mockStudent.currentSemester}</strong> (Section {mockStudent.section})</span>
              </div>
            </div>
          </div>

          <div>
            <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <CheckCircle size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
              Admission Verified & Active
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="erp-nav-tabs">
        {[
          { key: 'academic', label: 'Academic & Enrollment' },
          { key: 'personal', label: 'Personal Details' },
          { key: 'guardian', label: 'Guardian & Parent Info' },
          { key: 'mentor', label: 'Faculty Mentor' },
          { key: 'hostel', label: 'Hostel & Residence' }
        ].map((tab) => (
          <div key={tab.key} className="erp-nav-tab-item">
            <button
              type="button"
              className={`erp-nav-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </div>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="erp-card">
        <div className="erp-card-body">
          {activeTab === 'academic' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <table className="erp-table">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Student ID / Admission No</th>
                      <td><strong>{mockStudent.admissionNo}</strong></td>
                    </tr>
                    <tr>
                      <th>University Roll No</th>
                      <td><strong>{mockStudent.rollNo}</strong></td>
                    </tr>
                    <tr>
                      <th>Degree / Course</th>
                      <td>{mockStudent.course}</td>
                    </tr>
                    <tr>
                      <th>Discipline / Branch</th>
                      <td>{mockStudent.stream}</td>
                    </tr>
                    <tr>
                      <th>Current Academic Year</th>
                      <td>{mockStudent.currentYear}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <table className="erp-table">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Current Semester</th>
                      <td>Semester {mockStudent.currentSemester}</td>
                    </tr>
                    <tr>
                      <th>Section Assigned</th>
                      <td>Section {mockStudent.section}</td>
                    </tr>
                    <tr>
                      <th>Admission Session / Batch</th>
                      <td>{mockStudent.batch}</td>
                    </tr>
                    <tr>
                      <th>Admission Status</th>
                      <td><span className="badge badge-success">Regular Full-Time</span></td>
                    </tr>
                    <tr>
                      <th>Overall CGPA (Current)</th>
                      <td><strong>{mockStudent.cgpa} / 10.0</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <table className="erp-table">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Full Name</th>
                      <td>{mockStudent.name}</td>
                    </tr>
                    <tr>
                      <th>Date of Birth</th>
                      <td>{mockStudent.dob}</td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td>{mockStudent.gender}</td>
                    </tr>
                    <tr>
                      <th>Blood Group</th>
                      <td>{mockStudent.bloodGroup}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <table className="erp-table">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Category</th>
                      <td>{mockStudent.category}</td>
                    </tr>
                    <tr>
                      <th>Primary Email</th>
                      <td>{mockStudent.email}</td>
                    </tr>
                    <tr>
                      <th>Contact Phone</th>
                      <td>{mockStudent.phone}</td>
                    </tr>
                    <tr>
                      <th>Current Address</th>
                      <td>{mockStudent.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'guardian' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <table className="erp-table">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Father's Name</th>
                      <td>{mockStudent.fatherName}</td>
                    </tr>
                    <tr>
                      <th>Mother's Name</th>
                      <td>{mockStudent.motherName}</td>
                    </tr>
                    <tr>
                      <th>Father's Occupation</th>
                      <td>Business / Private Enterprise</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <table className="erp-table">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Emergency Contact</th>
                      <td>+91 98110 54321</td>
                    </tr>
                    <tr>
                      <th>Permanent Address</th>
                      <td>{mockStudent.permanentAddress}</td>
                    </tr>
                    <tr>
                      <th>Parent Email</th>
                      <td>ramesh.sharma@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'mentor' && (
            <div style={{ maxWidth: '600px' }}>
              <table className="erp-table">
                <tbody>
                  <tr>
                    <th style={{ width: '35%' }}>Assigned Faculty Mentor</th>
                    <td><strong>{mockStudent.mentor}</strong></td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>Computer Science & Engineering</td>
                  </tr>
                  <tr>
                    <th>Official Email</th>
                    <td>{mockStudent.mentorContact}</td>
                  </tr>
                  <tr>
                    <th>Cabin Location</th>
                    <td>Academic Block-A, Cabin No. 208</td>
                  </tr>
                  <tr>
                    <th>Mentoring Schedule</th>
                    <td>Every Wednesday 03:00 PM - 04:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'hostel' && (
            <div style={{ maxWidth: '600px' }}>
              <table className="erp-table">
                <tbody>
                  <tr>
                    <th style={{ width: '35%' }}>Hostel Resident Status</th>
                    <td><span className="badge badge-success">Hostel Resident</span></td>
                  </tr>
                  <tr>
                    <th>Hostel Building</th>
                    <td>{mockStudent.hostelDetails.hostelName}</td>
                  </tr>
                  <tr>
                    <th>Allotted Room & Bed</th>
                    <td>{mockStudent.hostelDetails.roomNo} (Bed {mockStudent.hostelDetails.bedNo})</td>
                  </tr>
                  <tr>
                    <th>Chief Warden</th>
                    <td>{mockStudent.hostelDetails.wardenName}</td>
                  </tr>
                  <tr>
                    <th>Warden Contact</th>
                    <td>{mockStudent.hostelDetails.wardenContact}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
