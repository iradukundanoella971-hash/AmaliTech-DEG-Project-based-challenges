import { useState } from 'react';
import './PasswordModal.css';

function PasswordModal({ isOpen, onClose, onSuccess, folderName }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123') {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">🔒</span>
          <h3>Secure Vault Access</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>You are trying to access <strong>{folderName}</strong></p>
          <p className="modal-warning">This folder is password protected.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Enter Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter vault password"
                autoFocus
                className="password-input"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-unlock">
                🔓 Unlock
              </button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <small>Hint: Default password is 123</small>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;