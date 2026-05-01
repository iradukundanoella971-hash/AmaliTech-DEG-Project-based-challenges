import './Sidebar.css';

function Sidebar({ onCategorySelect, selectedCategory }) {
  const fileSystemItems = [
    { icon: '⚖️', name: 'Legal Records', count: '1,284', filter: 'legal' },
    { icon: '🏦', name: 'Bank Audits', count: '847', filter: 'audit' },
    { icon: '🔒', name: 'Secure Vault', count: '2,492', filter: 'vault' },
    { icon: '🗑️', name: 'Trash', count: '23', filter: 'trash' }
  ];

  const handleItemClick = (item) => {
    if (onCategorySelect) {
      onCategorySelect(item.filter);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🔒</span>
          <span className="logo-text">SECUREVAULT</span>
        </div>
        <div className="version">FILE SYSTEM<br/>V3.4.6-STABLE</div>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">Corporate Files</div>
        <p className="section-desc">Manage encrypted organizational assets and confidential documentation.</p>
        
        <div className="file-system-list">
          {fileSystemItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`fs-item ${selectedCategory === item.filter ? 'active' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <span className="fs-icon">{item.icon}</span>
              <span className="fs-name">{item.name}</span>
              <span className="fs-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="session-info">
          <div className="session-title">ACTIVE SESSIONS</div>
          <div className="session-item">🖥️ Terminal Hub-A</div>
          <div className="session-ip">IP: 44.112.90.1</div>
          <div className="session-item">📱 Mobile Auth-Node</div>
          <div className="session-ip">IP: 82.111.235.9</div>
        </div>
        
        <div className="integrity-status">
          <div className="status-indicator"></div>
          <div className="status-text">
            <strong>Integrity Status: Stable</strong>
            <span>All data shards verified. Zero packet loss in last 24h.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;