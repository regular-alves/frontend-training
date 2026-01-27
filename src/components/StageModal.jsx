import { useState } from 'react';

function StageModal({ title, label, placeholder, buttonText, onSubmit, onClose }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>{label}</label>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={placeholder}
                autoFocus
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!text.trim()}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StageModal;
