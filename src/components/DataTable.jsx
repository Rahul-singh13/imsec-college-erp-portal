import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, Printer } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  searchPlaceholder = 'Search records...',
  defaultPageSize = 10,
  showActions = true,
  onExportCsv,
  emptyMessage = 'No matching records found'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val || '').toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (onExportCsv) {
      onExportCsv();
      return;
    }
    // Default CSV export
    const headers = columns.map((c) => `"${c.header}"`).join(',');
    const rows = filteredData.map((row) =>
      columns.map((c) => `"${row[c.accessor] || ''}"`).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'erp_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="erp-card">
      <div className="erp-filter-bar">
        <div className="filter-group">
          <label>Show</label>
          <select
            className="erp-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <label>entries</label>
        </div>

        <div className="filter-group">
          {showActions && (
            <>
              <button
                type="button"
                className="erp-btn erp-btn-default erp-btn-sm"
                onClick={handleExport}
                title="Export to CSV"
              >
                <Download size={13} /> Export CSV
              </button>
              <button
                type="button"
                className="erp-btn erp-btn-default erp-btn-sm"
                onClick={handlePrint}
                title="Print table"
              >
                <Printer size={13} /> Print
              </button>
            </>
          )}

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="erp-input"
              style={{ paddingLeft: '28px', width: '220px' }}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search
              size={14}
              color="#888"
              style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: '50px', textAlign: 'center' }}>#</th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    width: col.width || 'auto',
                    textAlign: col.align || 'left'
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td style={{ textAlign: 'center', color: '#777', fontWeight: 'bold' }}>
                    {(currentPage - 1) * pageSize + rowIdx + 1}
                  </td>
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      style={{
                        textAlign: col.align || 'left'
                      }}
                    >
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 15px',
          borderTop: '1px solid var(--erp-border-light)',
          background: '#fcfcfc',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '12px'
        }}
      >
        <div style={{ color: '#666' }}>
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <button
            type="button"
            className="erp-btn erp-btn-default erp-btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={13} /> Previous
          </button>
          <span style={{ padding: '0 8px', fontWeight: 600, color: '#253973' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="erp-btn erp-btn-default erp-btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
