import { useEffect, useRef } from 'react';
import './FileItem.css';

function FileItem({ item, depth, isSelected, isFocused, onSelect, onToggle, isExpanded }) {
  const itemRef = useRef(null);
  const isFolder = item.type === 'folder';

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isFocused]);

  const getStatusBadge = () => {
    if (isFolder) return null;
    return <span className="status-badge secured">SECURED</span>;
  };

  const formatDate = () => {
    // Demo date - in real app, would come from data
    return "Oct 12, 2023";
  };

  return (
    <div
      ref={itemRef}
      className={`file-item ${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''}`}
      onClick={onSelect}
      onDoubleClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (isFolder) onToggle();
          else onSelect();
        }
      }}
      tabIndex={isFocused ? 0 : -1}
      style={{ paddingLeft: `${depth * 24 + 16}px` }}
    >
      <div className="file-item-row">
        <div className="cell-name">
          <span className="file-icon">
            {isFolder ? (isExpanded ? '📂' : '📁') : '📄'}
          </span>
          <span className="file-name">{item.name}</span>
          {getStatusBadge()}
        </div>
        
        <div className="cell-status">
          {isFolder ? '—' : 'SECURED'}
        </div>
        
        <div className="cell-modified">
          {formatDate()}
        </div>
        
        <div className="cell-size">
          {item.size || '—'}
        </div>
        
        <div className="cell-actions">
          <button className="action-icon" onClick={(e) => { e.stopPropagation(); }}>⋯</button>
        </div>
      </div>
    </div>
  );
}

export default FileItem;