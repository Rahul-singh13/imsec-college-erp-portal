import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function StatWidget({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme = 'green-1',
  linkTo,
  linkText = 'View Details'
}) {
  return (
    <div className={`widget ${colorScheme}`}>
      <div className="widget-content padding">
        <div className="text-box">
          <h2>{value}</h2>
          <p>{title}</p>
          {subtitle && <span style={{ fontSize: '11px', opacity: 0.85, display: 'block', marginTop: '2px' }}>{subtitle}</span>}
        </div>
        {Icon && (
          <div className="widget-icon">
            <Icon size={42} strokeWidth={1.5} />
          </div>
        )}
      </div>
      {linkTo ? (
        <Link to={linkTo} className="widget-footer">
          <span>{linkText}</span>
          <ChevronRight size={14} />
        </Link>
      ) : (
        <div className="widget-footer">
          <span>{linkText}</span>
          <ChevronRight size={14} />
        </div>
      )}
    </div>
  );
}
