import './PropertiesPanel.css';

function PropertiesPanel({ selectedFile }) {
  if (!selectedFile) {
    return (
      <div className="properties-panel">
        <div className="panel-header">
          <h3>Properties</h3>
        </div>
        <div className="panel-empty">
          <span className="empty-icon">📄</span>
          <p>No file selected</p>
          <small>Click any file to view details</small>
        </div>
      </div>
    );
  }

  const getFileTypeIcon = () => {
    const ext = selectedFile.extension;
    if (ext === 'pdf') return '📑';
    if (ext === 'docx') return '📝';
    if (ext === 'xlsx') return '📊';
    if (ext === 'txt') return '📃';
    if (ext === 'md') return '📖';
    if (ext === 'csv') return '📈';
    return '📎';
  };

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3>Properties</h3>
      </div>
      <div className="panel-content">
        <div className="file-preview">
          <span className="file-preview-icon">{getFileTypeIcon()}</span>
        </div>
        
        <div className="property-group">
          <label>Name</label>
          <div className="property-value">{selectedFile.name}</div>
        </div>
        
        <div className="property-group">
          <label>Type</label>
          <div className="property-value">
            <span className="type-badge">
              {selectedFile.extension?.toUpperCase() || 'FILE'}
            </span>
          </div>
        </div>
        
        <div className="property-group">
          <label>Size</label>
          <div className="property-value">{selectedFile.size || 'Unknown'}</div>
        </div>
        
        <div className="property-group">
          <label>Security Level</label>
          <div className="property-value security-level">
            <span className="security-dot"></span>
            Encrypted (AES-256)
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPanel;