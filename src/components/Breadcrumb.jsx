import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ title, subtitle, items = [] }) {
  return (
    <div className="page-header-bar">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p style={{ fontSize: '12px', color: '#7a868f', marginTop: '2px' }}>{subtitle}</p>}
      </div>
      <div className="page-breadcrumb">
        <Link to="/academic" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Home size={13} /> Dashboard
        </Link>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={12} color="#999" />
            {item.link ? (
              <Link to={item.link}>{item.label}</Link>
            ) : (
              <span style={{ color: '#253973', fontWeight: 600 }}>{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
