import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import FileItem from './FileItem';
import './FileExplorer.css';

const FileExplorer = forwardRef(({ data, onSelectFile, selectedFileId, searchQuery = '' }, ref) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [flattenedItems, setFlattenedItems] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useImperativeHandle(ref, () => ({
    moveFocusUp: () => {
      setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
    },
    moveFocusDown: () => {
      setFocusedIndex(prev => prev < flattenedItems.length - 1 ? prev + 1 : prev);
    },
    expandCurrentFolder: () => {
      const item = flattenedItems[focusedIndex];
      if (item?.type === 'folder' && !expandedFolders.has(item.name)) {
        toggleFolder(item);
      }
    },
    collapseCurrentFolder: () => {
      const item = flattenedItems[focusedIndex];
      if (item?.type === 'folder' && expandedFolders.has(item.name)) {
        toggleFolder(item);
      }
    },
    selectCurrentItem: () => {
      const item = flattenedItems[focusedIndex];
      if (item?.type === 'file') {
        onSelectFile(item);
      }
    }
  }));

 const toggleFolder = (folder) => {
  // Check if this folder requires password
  if (folder.name === 'Secure Vault' && !expandedFolders.has(folder.name)) {
    // Ask for password before expanding
    if (window.confirm('🔒 Secure Vault is password protected. Enter password 123 to access?')) {
      const password = prompt('Enter vault password:');
      if (password === '123') {
        // Password correct, expand folder
        const newExpanded = new Set(expandedFolders);
        newExpanded.add(folder.name);
        setExpandedFolders(newExpanded);
      } else {
        alert('❌ Invalid password! Access denied.');
      }
    }
    return;
  }
  
  const newExpanded = new Set(expandedFolders);
  if (newExpanded.has(folder.name)) {
    newExpanded.delete(folder.name);
  } else {
    newExpanded.add(folder.name);
  }
  setExpandedFolders(newExpanded);
};

  const flattenTree = (item, depth = 0, parentPath = '') => {
    const items = [];
    const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    
    const matchesSearch = searchQuery && searchQuery.trim() !== '' && 
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
  
    if (searchQuery && searchQuery.trim() !== '') {
      console.log(`Checking "${item.name}" - matches: ${matchesSearch}`);
    }
    let isExpanded = expandedFolders.has(item.name);
  
    if (searchQuery && searchQuery.trim() !== '') {
      const hasMatchingChild = (node) => {
        if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        if (node.children) {
          return node.children.some(child => hasMatchingChild(child));
        }
        return false;
      };
      
      if (matchesSearch || (item.children && hasMatchingChild(item))) {
        isExpanded = true;
      }
    }
    
    items.push({
      ...item,
      depth,
      isExpanded,
      path: currentPath,
      matchesSearch
    });
    
    // RECURSION: Call itself for children
    if (item.type === 'folder' && isExpanded && item.children) {
      for (const child of item.children) {
        items.push(...flattenTree(child, depth + 1, currentPath));
      }
    }
    
    return items;
  };

  // Update flattened items when dependencies change
  useEffect(() => {
    console.log('Rebuilding tree with search:', searchQuery);
    const flat = flattenTree(data);
    setFlattenedItems(flat);
    setFocusedIndex(-1);
  }, [expandedFolders, data, searchQuery]);

  const handleSelect = (item, index) => {
    if (item.type === 'file') {
      onSelectFile(item);
    }
    setFocusedIndex(index);
  };

  // Filter items based on search (only show matches)
  const visibleItems = searchQuery && searchQuery.trim() !== '' 
    ? flattenedItems.filter(item => item.matchesSearch)
    : flattenedItems;

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <span className="header-title">File System</span>
        <span className="header-stats">
          Managing {visibleItems.filter(i => i.type === 'file').length} encrypted objects
          {searchQuery && ` (filtered from ${flattenedItems.filter(i => i.type === 'file').length})`}
        </span>
      </div>
      <div className="explorer-tree">
        {visibleItems.length === 0 && searchQuery ? (
          <div className="no-results">
            <span>🔍</span>
            <p>No files match "{searchQuery}"</p>
          </div>
        ) : (
          visibleItems.map((item, index) => (
            <FileItem
              key={item.path}
              item={item}
              depth={item.depth}
              isSelected={selectedFileId === item.name}
              isFocused={focusedIndex === index}
              onSelect={() => handleSelect(item, index)}
              onToggle={() => toggleFolder(item)}
              isExpanded={item.isExpanded}
            />
          ))
        )}
      </div>
    </div>
  );
});

FileExplorer.displayName = 'FileExplorer';

export default FileExplorer;