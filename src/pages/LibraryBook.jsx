import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockLibraryBooks, mockLibraryCatalog } from '../data/library';
import { Search, RotateCcw } from 'lucide-react';

export default function LibraryBook() {
  const [activeTab, setActiveTab] = useState('issued');
  const [booksList, setBooksList] = useState(mockLibraryBooks);
  const [catalogSearch, setCatalogSearch] = useState('');

  const handleRenew = (accessionNo, title) => {
    alert(`[DEMO]: Book "${title}" (Acc: ${accessionNo}) renewed for an additional 15 days! New Due Date: 05-Oct-2024`);
    setBooksList((prev) =>
      prev.map((b) =>
        b.accessionNo === accessionNo ? { ...b, dueDate: '05-Oct-2024' } : b
      )
    );
  };

  const issuedColumns = [
    {
      header: 'Accession No',
      accessor: 'accessionNo',
      width: '140px',
      render: (val) => <code>{val}</code>
    },
    {
      header: 'Book Title & Author',
      accessor: 'title',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973' }}>{val}</strong>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
            Author: {row.author} &bull; Publisher: {row.publisher} &bull; ISBN: {row.isbn}
          </div>
        </div>
      )
    },
    {
      header: 'Issue Date',
      accessor: 'issueDate',
      width: '110px'
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      width: '110px',
      render: (val) => <strong style={{ color: '#dc3545' }}>{val}</strong>
    },
    {
      header: 'Fine Due',
      accessor: 'fine',
      width: '100px',
      align: 'right',
      render: (val) => <span>{val}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '140px',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Action',
      accessor: 'accessionNo',
      width: '110px',
      align: 'center',
      render: (val, row) => (
        row.status.includes('Active') ? (
          <button
            type="button"
            className="erp-btn erp-btn-default erp-btn-sm"
            onClick={() => handleRenew(val, row.title)}
          >
            <RotateCcw size={12} /> Renew
          </button>
        ) : (
          <span style={{ fontSize: '11px', color: '#888' }}>--</span>
        )
      )
    }
  ];

  const filteredCatalog = mockLibraryCatalog.filter((b) =>
    b.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    b.location.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb
        title="Central Library"
        subtitle="Currently issued book bank titles, renewal manager, fine clearance, and OPAC book catalog search"
        items={[{ label: 'Library', link: null }]}
      />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <button
          type="button"
          className={`erp-btn ${activeTab === 'issued' ? 'erp-btn-primary' : 'erp-btn-default'}`}
          onClick={() => setActiveTab('issued')}
        >
          My Issued Books ({booksList.filter((b) => b.status.includes('Active')).length})
        </button>
        <button
          type="button"
          className={`erp-btn ${activeTab === 'catalog' ? 'erp-btn-primary' : 'erp-btn-default'}`}
          onClick={() => setActiveTab('catalog')}
        >
          Search Library OPAC Catalog
        </button>
      </div>

      {activeTab === 'issued' && (
        <DataTable
          columns={issuedColumns}
          data={booksList}
          searchPlaceholder="Search issued books by title, accession no..."
        />
      )}

      {activeTab === 'catalog' && (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '3px' }}>
          <h3 style={{ fontSize: '15px', color: '#253973', marginBottom: '12px' }}>
            Online Public Access Catalog (OPAC)
          </h3>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Search catalog by title, author name, shelf location..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              style={{ width: '350px', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '2px' }}
            />
          </div>

          <table className="notice-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                <th>Book Title</th>
                <th>Author</th>
                <th style={{ width: '140px', textAlign: 'center' }}>Available Copies</th>
                <th style={{ width: '160px' }}>Shelf Location</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCatalog.map((book, idx) => (
                <tr key={book.id}>
                  <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>{book.copiesAvailable} in Stock</span>
                  </td>
                  <td><code>{book.location}</code></td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="erp-btn erp-btn-default erp-btn-sm"
                      onClick={() => {
                        alert(`[DEMO]: Reserved copy of "${book.title}" at Library Circulation Desk!`);
                      }}
                    >
                      Reserve Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
