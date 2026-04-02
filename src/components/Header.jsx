export default function Header({ user, searchQuery, setSearchQuery, onLogout, onAdmin, showBack, onBack }) {
  return (
    <header>
      <div className="header-top">
        {showBack ? (
          <button className="back-btn" onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            <span>El Hambre <span className="back-title-italic">Nuestra</span></span>
          </button>
        ) : (
          <div className="logo">El Hambre <span>Nuestra</span></div>
        )}
        <div className="header-actions">
          <button className="btn-icon" title="Administración" onClick={onAdmin}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </button>
          <div className="user-badge">{user.email.split('@')[0]}</div>
          <button className="btn-icon" title="Cerrar sesión" onClick={onLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
      {showBack && (
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="form-input"
            placeholder="Buscar restaurante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
    </header>
  );
}