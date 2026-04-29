import { useState } from 'react';
import './FileItem.css';

function FileItem({ item, depth = 0, isSelected, onSelect, onToggle, isExpanded }) {
  const [isHovered, setIsHovered] = useState(false);
  const isFolder = item.type === 'folder';

  const getIcon = () => {
    if (isFolder) {
      return isExpanded ? '📂' : '📁';
    }
    // File icons based on extension
    const ext = item.extension;
    if (ext === 'pdf') return '📄';
    if (ext === 'docx') return '📝';
    if (ext === 'xlsx') return '📊';
    if (ext === 'txt') return '📃';
    if (ext === 'md') return '📖';
    if (ext === 'csv') return '📈';
    return '📎';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(item);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (isFolder && onToggle) {
      onToggle(item);
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isFolder && onToggle) {
      onToggle(item);
    }
  };

  return (
    <div
      className={`file-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hover' : ''}`}
      style={{ paddingLeft: `${depth * 20 + 12}px` }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="treeitem"
      aria-expanded={isFolder ? isExpanded : undefined}
    >
      <div className="file-item-content">
        <span className="file-icon">{getIcon()}</span>
        
        {isFolder && (
          <button
            className="expand-toggle"
            onClick={handleToggle}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        
        <span className="file-name">{item.name}</span>
        
        {!isFolder && (
          <span className="file-size">{item.size}</span>
        )}
        
        {isFolder && item.children && (
          <span className="folder-count">
            ({item.children.length} {item.children.length === 1 ? 'item' : 'items'})
          </span>
        )}
      </div>
    </div>
  );
}

export default FileItem;