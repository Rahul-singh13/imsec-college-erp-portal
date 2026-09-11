import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockTestMarks } from '../data/exams';
import { Award, TrendingUp, BarChart2 } from 'lucide-react';

export default function TestMarks() {
  const [selectedTestType, setSelectedTestType] = useState('ALL');

  const filteredMarks = selectedTestType === 'ALL'
    ? mockTestMarks
    : mockTestMarks.filter((m) => m.testType === selectedTestType);

  const columns = [
    {
      header: 'Subject Code',
      accessor: 'subjectCode',
      width: '110px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Subject Name',
      accessor: 'subjectName',
      render: (val) => <span style={{ fontWeight: 600, color: '#253973' }}>{val}</span>
    },
    {
      header: 'Test Name / Examination',
      accessor: 'testType',
      width: '170px',
      render: (val) => <span className="badge badge-primary">{val}</span>
    },
    {
      header: 'Exam Date',
      accessor: 'examDate',
      width: '110px'
    },
    {
      header: 'Max Marks',
      accessor: 'maxMarks',
      width: '90px',
      align: 'center'
    },
    {
      header: 'Obtained Marks',
      accessor: 'obtainedMarks',
      width: '120px',
      align: 'center',
      render: (val, row) => (
        <strong style={{ color: '#28a745', fontSize: '13px' }}>
          {val} / {row.maxMarks}
        </strong>
      )
    },
    {
      header: 'Percentage',
      accessor: 'percentage',
      width: '100px',
      align: 'center',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Grade',
      accessor: 'grade',
      width: '80px',
      align: 'center',
      render: (val) => (
        <span
          className="badge"
          style={{
            background: val === 'O' || val === 'A+' ? '#28a745' : '#17a2b8',
            color: '#fff',
            fontSize: '12px'
          }}
        >
          {val}
        </span>
      )
    },
    {
      header: 'Faculty Remarks',
      accessor: 'facultyRemarks',
      render: (val) => <span style={{ fontSize: '11.5px', color: '#666' }}>{val}</span>
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Test Marks & Sessional Performance"
        subtitle="Detailed internal assessment scorecards, Class Test (CT), Sessional I/II, and Pre-University Test (PUT) marks"
        items={[{ label: 'Examination', link: null }, { label: 'Test Marks', link: null }]}
      />

      {/* Filter toolbar */}
      <div className="erp-filter-bar">
        <div className="filter-group">
          <label>Filter By Test Type:</label>
          <select
            className="erp-select"
            value={selectedTestType}
            onChange={(e) => setSelectedTestType(e.target.value)}
          >
            <option value="ALL">All Internal Examinations</option>
            <option value="Sessional Test - 1">Sessional Test - 1</option>
            <option value="Sessional Test - 2">Sessional Test - 2</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredMarks}
        searchPlaceholder="Search by subject, code, grade..."
      />
    </div>
  );
}
