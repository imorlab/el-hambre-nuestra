import { useState } from 'react';
import { toggleVisita } from '../services/db';
import { openInMaps } from '../services/geocode';
import { useToast } from '../hooks/useToast';

function RestaurantCard({ restaurante, visitas, userId, onReload }) {
  const isVisited = visitas.some(v => v.restaurante_id === restaurante.id);
  const { showSuccess, showError } = useToast();
  const [showDescription, setShowDescription] = useState(false);

  const handleToggle = async (e) => {
    e.stopPropagation();
    try {
      const wasVisited = isVisited;
      await toggleVisita(userId, restaurante.id);
      await onReload();
      if (wasVisited) {
        showSuccess('Eliminado de visitados');
      } else {
        showSuccess('¡Marcado como visitado! 🎉');
      }
    } catch (error) {
      showError('Error: ' + error.message);
    }
  };

  const handleLocationClick = (e) => {
    e.stopPropagation();
    openInMaps(restaurante.nombre, restaurante.location);
  };

  return (
    <div className={`card ${isVisited ? 'visited' : ''}`}>
      <div className="card-left">
        <div className="card-name">{restaurante.nombre}</div>
        {restaurante.location && (
          <div 
            className="card-location clickable"
            onClick={handleLocationClick}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{restaurante.location}</span>
          </div>
        )}
        <div className="card-tags">
          {isVisited && <span className="tag tag-visitado">✓ Visitado</span>}
          {restaurante.niños && <span className="tag tag-niños">👶 Niños</span>}
          {restaurante.tipo && <span className="tag tag-tipo">{restaurante.tipo}</span>}
        </div>
        {restaurante.description && (
          <div className="card-description">
            <button className="description-toggle" onClick={() => setShowDescription(!showDescription)}>
              {showDescription ? 'Ocultar info' : 'Ver info'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points={showDescription ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/>
              </svg>
            </button>
            {showDescription && (
              <div className="description-text">{restaurante.description}</div>
            )}
          </div>
        )}
      </div>
      <button className="card-check" onClick={handleToggle}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
    </div>
  );
}

export default function RestaurantList({ zonas, restaurantes, visitas, userId, onReload }) {
  const [collapsed, setCollapsed] = useState({});

  const grouped = {};
  restaurantes.forEach(r => {
    if (!grouped[r.zona_id]) {
      grouped[r.zona_id] = [];
    }
    grouped[r.zona_id].push(r);
  });

  if (restaurantes.length === 0) {
    return (
      <div className="empty-state">
        <div className="emoji">🍽️</div>
        <div>No se encontraron restaurantes</div>
      </div>
    );
  }

  return (
    <div className="restaurant-list-container">
      {zonas.map(zona => {
        const items = grouped[zona.id] || [];
        if (!items.length) return null;

        const isCollapsed = collapsed[zona.id];

        return (
          <div key={zona.id} className={`section ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="section-header" onClick={() => setCollapsed(prev => ({ ...prev, [zona.id]: !prev[zona.id] }))}>
              <div className="section-title-wrap">
                <div className="section-dot" style={{ background: zona.color }}></div>
                <div className="section-title">{zona.nombre}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="section-count">{items.length}</span>
                <svg className="section-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <div className="section-body">
              <div className="restaurant-list">
                {items.map(r => (
                  <RestaurantCard
                    key={r.id}
                    restaurante={r}
                    visitas={visitas}
                    userId={userId}
                    onReload={onReload}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}