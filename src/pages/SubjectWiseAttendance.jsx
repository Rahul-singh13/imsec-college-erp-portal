import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockSubjectWiseAttendance } from '../data/attendance';
import { mockStudent } from '../data/student';
import { CalendarCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SubjectWiseAttendance() {
  const [semesterFilter, setSemesterFilter] = useState('5');

  const overallTotal = mockSubjectWiseAttendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const overallPresent = mockSubjectWiseAttendance.reduce((acc, curr) => acc + curr.present, 0);
  const overallPct = ((overallPresent / overallTotal) * 100).toFixed(2);

  const columns = [
    {
      header: 'Subject Code',
      accessor: 'code',
      width: '100px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Subject Name',
      accessor: 'name',
      render: (val, row) => (
        <div>
          <span style={{ fontWeight: 600, color: '#253973' }}>{val}</span>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
            Faculty: {row.faculty} &bull; Type: <strong>{row.type}</strong>
          </div>
        </div>
      )
    },
    {
      header: 'Total Classes',
      accessor: 'totalClasses',
      width: '100px',
      align: 'center'
    },
    {
      header: 'Present',
      accessor: 'present',
      width: '90px',
      align: 'center',
      render: (val) => <span style={{ color: '#28a745', fontWeight: 'bold' }}>{val}</span>
    },
    {
      header: 'Absent',
      accessor: 'absent',
      width: '90px',
      align: 'center',
      render: (val) => <span style={{ color: '#dc3545', fontWeight: 'bold' }}>{val}</span>
    },
    {
      header: 'Attendance %',
      accessor: 'percentage',
      width: '180px',
      render: (val) => (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
            <strong style={{ color: val >= 75 ? '#28a745' : '#dc3545' }}>{val}%</strong>
            <span style={{ fontSize: '10px', color: '#888' }}>Min 75%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${val}%`,
                height: '100%',
                background: val >= 75 ? '#28a745' : '#dc3545',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Eligibility Status',
      accessor: 'status',
      width: '140px',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Subject Wise Attendance Report"
        subtitle="Detailed subject-by-subject lecture count, present/absent logs, and AKTU 75% exam eligibility verification"
        items={[{ label: 'Attendance Reports', link: null }, { label: 'Subject Wise', link: null }]}
      />

      {/* Summary Banner */}
      <div
        className="erp-card"
        style={{
          background: 'linear-gradient(90deg, #253973 0%, #1b2a56 100%)',
          color: '#ffffff',
          marginBottom: '20px'
        }}
      >
        <div
          className="erp-card-body"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '18px 24px'
          }}
        >
          <div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Cumulative Odd Semester 2024-25 Attendance</div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '4px 0', color: '#ffffff' }}>
              {overallPct}% (Overall: {overallPresent} / {overallTotal} Lectures)
            </h2>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>
              Student: {mockStudent.name} ({mockStudent.admissionNo}) &bull; Section: {mockStudent.section}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Total Delivered</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{overallTotal}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Attended</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#68c39f' }}>{overallPresent}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Missed</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffb3b3' }}>{overallTotal - overallPresent}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="erp-filter-bar">
        <div className="filter-group">
          <label>Academic Session:</label>
          <select className="erp-select" defaultValue="2024-25">
            <option value="2024-25">2024-2025 (Odd Semester)</option>
            <option value="2023-24">2023-2024 (Even Semester)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Semester:</label>
          <select
            className="erp-select"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <option value="5">Semester 5 (Current)</option>
            <option value="4">Semester 4</option>
            <option value="3">Semester 3</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockSubjectWiseAttendance}
        searchPlaceholder="Search subject by name, code, faculty..."
      />
    </div>
  );
}
