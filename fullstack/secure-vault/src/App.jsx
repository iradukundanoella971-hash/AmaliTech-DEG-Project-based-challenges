import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './styles/design-system.css';
import FileExplorer from './components/FileExplorer';
import PropertiesPanel from './components/PropertiesPanel';
import SearchBar from './components/SearchBar';
import fileData from './data/data.json';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);
  const [flattenedItems, setFlattenedItems] = useState([]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e) => {
    // This will be implemented in Session 2
    console.log('Key pressed:', e.key);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🔒</span>
          <span className="logo-text">SecureVault</span>
          <span className="logo-badge">Enterprise Cloud Security</span>
        </div>
        <div className="header-actions">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </header>

      {/* Main Content */}
      <div className="app-main">
        <div className="explorer-container">
          <FileExplorer 
            data={fileData}
            onSelectFile={handleFileSelect}
            selectedFileId={selectedFile?.name}
            searchQuery={searchQuery}
          />
        </div>
        <div className="properties-container">
          <PropertiesPanel selectedFile={selectedFile} />
        </div>
      </div>

      {/* Status Bar */}
      <footer className="app-footer">
        <div className="status-item">
          <span className="status-dot"></span>
          Secure Connection (AES-256)
        </div>
        <div className="status-item">
          📁 Zero-Knowledge Encryption
        </div>
        <div className="status-item">
          ⌨️ Keyboard Shortcuts: ↑ ↓ → ← Enter (Coming Soon)
        </div>
      </footer>
    </div>
  );
}

export default App;