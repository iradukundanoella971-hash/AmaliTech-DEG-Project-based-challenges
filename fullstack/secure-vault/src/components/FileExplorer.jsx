import { useState, useEffect } from 'react';
import FileItem from './FileItem';
import './FileExplorer.css';

function FileExplorer({ data, onSelectFile, selectedFileId, searchQuery = '' }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [flattenedItems, setFlattenedItems] = useState([]);

  // Toggle folder expansion
  const toggleFolder = (folder) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder.name)) {
      newExpanded.delete(folder.name);
    } else {
      newExpanded.add(folder.name);
    }
    setExpandedFolders(newExpanded);
  };

  // Recursive function to flatten tree for keyboard navigation
  // AND handle search auto-expand
  const flattenTree = (item, depth = 0, parentPath = '') => {
    const items = [];
    const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    
    // Check if this item matches search
    const matchesSearch = searchQuery && 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Should this folder be expanded?
    let isExpanded = expandedFolders.has(item.name);
    
    // Auto-expand for search matches
    if (searchQuery && matchesSearch) {
      isExpanded = true;
      // Also expand parent (handled by parent calling this)
    }
    
    items.push({
      ...item,
      depth,
      isExpanded,
      path: currentPath
    });
    
    if (item.type === 'folder' && isExpanded && item.children) {
      for (const child of item.children) {
        items.push(...flattenTree(child, depth + 1, currentPath));
      }
    }
    
    return items;
  };

  // Update flattened items when expanded folders or search changes
  useEffect(() => {
    const flat = flattenTree(data);
    setFlattenedItems(flat);
  }, [expandedFolders, data, searchQuery]);

  const handleSelect = (item) => {
    if (item.type === 'file') {
      onSelectFile(item);
    }
  };

  return (
    <div className="file-explorer" role="tree">
      <div className="explorer-header">
        <span className="explorer-title">📁 SecureVault</span>
        <span className="explorer-stats">
          {flattenedItems.filter(i => i.type === 'file').length} files
        </span>
      </div>
      <div className="explorer-content">
        {flattenedItems.map((item, index) => (
          <FileItem
            key={item.path}
            item={item}
            depth={item.depth}
            isSelected={selectedFileId === item.name}
            onSelect={handleSelect}
            onToggle={() => toggleFolder(item)}
            isExpanded={item.isExpanded}
          />
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;