import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockScheduleWiseAttendance } from '../data/attendance';
import { Calendar, Filter } from 'lucide-react';

export default function ScheduleWiseAttendance() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  const filteredData = mockScheduleWiseAttendance.filter((item) => {
    const matchesSubject = selectedSubject === 'ALL' || item.subject.includes(selectedSubject);
    const matchesDate = !selectedDate || item.date.includes(selectedDate);
    return matchesSubject && matchesDate;
  });

  const columns = [
    {
      header: 'Lecture Date',
      accessor: 'date',
      width: '110px'
    },
    {
      header: 'Time Slot & Period',
      accessor: 'time',
      width: '180px',
      render: (val, row) => (
        <div>
          <strong>{val}</strong>
          <div style={{ fontSize: '11px', color: '#666' }}>{row.period}</div>
        </div>
      )
    },
    {
      header: 'Subject & Class Details',
      accessor: 'subject',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973' }}>{val}</strong>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
            Faculty: <strong>{row.faculty}</strong> &bull; Room: <strong>{row.room}</strong> &bull; Type: {row.attendanceType}
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '120px',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Schedule Wise Attendance Log"
        subtitle="Daily lecture timetable attendance logs, class timings, assigned faculty, and classroom records"
        items={[{ label: 'Attendance Reports', link: null }, { label: 'Schedule Wise', link: null }]}
      />

      {/* Filter toolbar */}
      <div className="erp-filter-bar">
        <div className="filter-group">
          <label>Filter By Subject:</label>
          <select
            className="erp-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="ALL">All Subjects</option>
            <option value="KCS-501">KCS-501 - DBMS</option>
            <option value="KCS-502">KCS-502 - Compiler Design</option>
            <option value="KCS-503">KCS-503 - DAA</option>
            <option value="KCS-054">KCS-054 - OOSD</option>
            <option value="KNC-501">KNC-501 - Constitution of India</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Quick Date Search:</label>
          <input
            type="text"
            className="erp-input"
            placeholder="e.g. 11-Sep or 10-Sep"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Search schedule by subject, faculty, period, room..."
      />
    </div>
  );
}
