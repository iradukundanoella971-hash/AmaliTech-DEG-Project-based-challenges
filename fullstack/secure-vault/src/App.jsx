import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import './styles/design-system.css';
import Sidebar from './components/Sidebar';
import FileExplorer from './components/FileExplorer';
import PropertiesPanel from './components/PropertiesPanel';
import PasswordModal from './components/PasswordModal';
import fileData from './data/data.json';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolder, setCurrentFolder] = useState(fileData);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingFolder, setPendingFolder] = useState(null);
  const [unlockedVault, setUnlockedVault] = useState(false);
  const fileExplorerRef = useRef(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // Check if folder requires password
  const handleFolderAccess = (folder) => {
    if (folder.name === 'Secure Vault' && !unlockedVault) {
      setPendingFolder(folder);
      setIsPasswordModalOpen(true);
      return false;
    }
    return true;
  };

  // Handle successful password entry
  const handlePasswordSuccess = () => {
    setUnlockedVault(true);
    setIsPasswordModalOpen(false);
    if (pendingFolder) {
      setCurrentFolder(pendingFolder);
      setPendingFolder(null);
    }
  };

  // Navigate to different folders when sidebar is clicked
  const handleCategorySelect = (category) => {
    setSearchQuery('');
    setSelectedFile(null);
    
    const findFolder = (node, name) => {
      if (node.name === name) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findFolder(child, name);
          if (found) return found;
        }
      }
      return null;
    };

    let targetFolder = null;
    switch(category) {
      case 'legal':
        targetFolder = findFolder(fileData, 'Legal Records');
        break;
      case 'audit':
        targetFolder = findFolder(fileData, 'Bank Audits');
        break;
      case 'vault':
        targetFolder = findFolder(fileData, 'Secure Vault');
        break;
      case 'trash':
        targetFolder = findFolder(fileData, 'Trash');
        break;
      default:
        targetFolder = fileData;
    }
    
    if (targetFolder) {
      // Check if this folder needs password
      if (targetFolder.name === 'Secure Vault' && !unlockedVault) {
        setPendingFolder(targetFolder);
        setIsPasswordModalOpen(true);
      } else {
        setCurrentFolder(targetFolder);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        fileExplorerRef.current?.moveFocusUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        fileExplorerRef.current?.moveFocusDown();
        break;
      case 'ArrowRight':
        e.preventDefault();
        fileExplorerRef.current?.expandCurrentFolder();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        fileExplorerRef.current?.collapseCurrentFolder();
        break;
      case 'Enter':
        e.preventDefault();
        fileExplorerRef.current?.selectCurrentItem();
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Flatten files for stats
  const flattenFiles = (items) => {
    let files = [];
    if (!items) return files;
    const processItem = (item) => {
      if (item.type === 'file') {
        files.push(item);
      } else if (item.children) {
        item.children.forEach(processItem);
      }
    };
    processItem(items);
    return files;
  };

  const allFiles = flattenFiles(fileData);
  const totalFiles = allFiles.length;
  const totalSize = "42.8 GB";

  const getCurrentFolderName = () => {
    return currentFolder?.name || 'File System';
  };

  return (
    <div className="app">
      <Sidebar onCategorySelect={handleCategorySelect} />
      
      <div className="main-area">
        <header className="main-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <div className="breadcrumb">
              <span>File System</span>
              <span>/</span>
              <span className="active">{getCurrentFolderName()}</span>
              {getCurrentFolderName() === 'Secure Vault' && (
                <span className="protected-badge">🔒 Protected</span>
              )}
            </div>
          </div>
          <div className="header-right">
            <div className="version-badge">V3.4.0-SDK18</div>
            <div className="user-info">
              <span>Admin User</span>
              <span className="user-ip">IP: 192.168.1.104</span>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">📁</span>
                <span className="stat-label">TOTAL FILES</span>
              </div>
              <div className="stat-value">{totalFiles.toLocaleString()}</div>
              <div className="stat-trend">+12 this week</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">💾</span>
                <span className="stat-label">STORAGE USED</span>
              </div>
              <div className="stat-value">{totalSize}</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '64%' }}></div>
                <span>of 500 GB</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">🔒</span>
                <span className="stat-label">ENCRYPTION LEVEL</span>
              </div>
              <div className="stat-value">AES-256</div>
              <div className="stat-trend">Active</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">📋</span>
                <span className="stat-label">LAST AUDIT</span>
              </div>
              <div className="stat-value">2H AGO</div>
              <div className="stat-trend">Verified</div>
            </div>
          </div>

          {/* File Explorer Section */}
          <div className="explorer-section">
            <div className="section-header">
              <h2>{getCurrentFolderName()}</h2>
              <div className="header-actions">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                <button className="action-btn">Shared Vaults</button>
                <button className="action-btn">Audit Logs</button>
              </div>
            </div>
            
            <div className="explorer-container">
              <FileExplorer
                ref={fileExplorerRef}
                data={currentFolder}
                onSelectFile={handleFileSelect}
                selectedFileId={selectedFile?.name}
                searchQuery={searchQuery}
                onFolderAccess={handleFolderAccess}
              />
              <PropertiesPanel selectedFile={selectedFile} />
            </div>
          </div>
        </div>
      </div>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
        folderName="Secure Vault"
      />
    </div>
  );
}

export default App;