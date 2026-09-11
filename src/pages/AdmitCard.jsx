import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { mockAdmitCard } from '../data/exams';
import { Printer, Download, Award, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdmitCard() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Breadcrumb
        title="Examination Admit Card / Hall Ticket"
        subtitle="Official examination entry pass, candidate credentials, subject schedule, and exam centre guidelines"
        items={[{ label: 'Examination', link: null }, { label: 'Admit Card', link: null }]}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '15px' }}>
        <button
          type="button"
          className="erp-btn erp-btn-default"
          onClick={handlePrint}
        >
          <Printer size={14} /> Print Admit Card
        </button>
        <button
          type="button"
          className="erp-btn erp-btn-primary"
          onClick={() => {
            alert('[DEMO]: Generating official signed PDF admit card package...');
          }}
        >
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* Printable Hall Ticket Card */}
      <div
        className="erp-card print-area"
        style={{
          border: '2px solid #253973',
          padding: '25px',
          background: '#ffffff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #253973', paddingBottom: '15px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '6px' }}>
            <img
              src="/logo_IMSEC.png"
              alt="IMSEC Logo"
              style={{ height: '50px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#253973', margin: 0, textTransform: 'uppercase' }}>
                {mockAdmitCard.instituteName}
              </h2>
              <div style={{ fontSize: '12px', color: '#555', fontWeight: 600 }}>
                Affiliated to Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow
              </div>
            </div>
          </div>
          <div
            style={{
              background: '#253973',
              color: '#fff',
              display: 'inline-block',
              padding: '4px 20px',
              borderRadius: '3px',
              fontSize: '13px',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              marginTop: '5px'
            }}
          >
            ADMIT CARD - {mockAdmitCard.examSession.toUpperCase()}
          </div>
        </div>

        {/* Student Credential Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: '15px', marginBottom: '20px' }}>
          <div>
            <table className="erp-table light-header" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <th style={{ width: '40%' }}>Student Name</th>
                  <td><strong>{mockAdmitCard.studentName}</strong></td>
                </tr>
                <tr>
                  <th>Father's Name</th>
                  <td>{mockAdmitCard.fatherName}</td>
                </tr>
                <tr>
                  <th>Roll Number</th>
                  <td><strong style={{ color: '#253973' }}>{mockAdmitCard.rollNo}</strong></td>
                </tr>
                <tr>
                  <th>Enrollment No</th>
                  <td>{mockAdmitCard.enrollmentNo}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table className="erp-table light-header" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <th style={{ width: '40%' }}>Course / Branch</th>
                  <td><strong>{mockAdmitCard.course} ({mockAdmitCard.branch})</strong></td>
                </tr>
                <tr>
                  <th>Semester</th>
                  <td>{mockAdmitCard.semester}</td>
                </tr>
                <tr>
                  <th>Institute Code</th>
                  <td>{mockAdmitCard.instituteCode}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td><span className="badge badge-success">{mockAdmitCard.status}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Student Photo & Signature Mock */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '110px',
                height: '125px',
                border: '1px solid #ccc',
                background: '#f7f9fa',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: '#888'
              }}
            >
              <Award size={36} color="#253973" style={{ marginBottom: '4px' }} />
              <span>CANDIDATE</span>
              <span>PHOTO</span>
            </div>
            <div
              style={{
                width: '110px',
                height: '32px',
                border: '1px dashed #aaa',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontFamily: 'cursive'
              }}
            >
              Demo Student
            </div>
          </div>
        </div>

        {/* Exam Centre Info */}
        <div style={{ background: '#f4f7fb', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '3px', marginBottom: '18px', fontSize: '12.5px' }}>
          <strong>Examination Centre:</strong> {mockAdmitCard.examCenterName} (Centre Code: {mockAdmitCard.examCenterCode})
        </div>

        {/* Subject Timetable Table */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#253973', fontSize: '13.5px', fontWeight: 'bold', marginBottom: '8px' }}>
            Schedule of Examination Papers
          </h4>
          <table className="erp-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                <th style={{ width: '110px' }}>Subject Code</th>
                <th>Subject Name</th>
                <th style={{ width: '120px' }}>Exam Date</th>
                <th style={{ width: '220px' }}>Shift / Timing</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Invigilator Sign</th>
              </tr>
            </thead>
            <tbody>
              {mockAdmitCard.subjects.map((sub, idx) => (
                <tr key={sub.code}>
                  <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td><strong>{sub.code}</strong></td>
                  <td>{sub.name}</td>
                  <td>{sub.date}</td>
                  <td style={{ fontSize: '11.5px' }}>{sub.shift}</td>
                  <td style={{ textAlign: 'center', color: '#ccc' }}>___________</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px', marginBottom: '25px' }}>
          <h4 style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#c0392b', marginBottom: '6px' }}>
            Important Instructions for the Candidate:
          </h4>
          <ol style={{ paddingLeft: '20px', fontSize: '11.5px', color: '#555', lineHeight: '1.6' }}>
            {mockAdmitCard.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ol>
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px dashed #ccc' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{ borderBottom: '1px solid #333', marginBottom: '4px', height: '25px' }}></div>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>Candidate Signature</span>
          </div>

          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{ borderBottom: '1px solid #333', marginBottom: '4px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#253973', fontWeight: 'bold', fontSize: '11px' }}>
              [Digitally Verified]
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600 }}>Controller of Examination (COE)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
