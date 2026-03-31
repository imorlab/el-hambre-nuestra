import { useState } from 'react';
import { createZona, updateZona, deleteZona, createRestaurante, updateRestaurante, deleteRestaurante } from '../services/db';

export default function AdminModal({ zonas, restaurantes, onClose, onReload }) {
  const [showZonaForm, setShowZonaForm] = useState(false);
  const [showRestauranteForm, setShowRestauranteForm] = useState(false);
  const [editingZona, setEditingZona] = useState(null);
  const [editingRestaurante, setEditingRestaurante] = useState(null);

  const handleDeleteZona = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta zona?')) {
      await deleteZona(id);
      await onReload();
    }
  };

  const handleDeleteRestaurante = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este restaurante?')) {
      await deleteRestaurante(id);
      await onReload();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Administración</div>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--gold)' }}>Zonas</h3>
          <div style={{ marginBottom: '12px' }}>
            {zonas.map(z => (
              <div key={z.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: z.color }}></div>
                <span style={{ flex: 1 }}>{z.nombre}</span>
                <button className="btn-icon" style={{ width: '24px', height: '24px', padding: 0 }} onClick={() => { setEditingZona(z); setShowZonaForm(true); }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button className="btn-icon" style={{ width: '24px', height: '24px', padding: 0 }} onClick={() => handleDeleteZona(z.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setEditingZona(null); setShowZonaForm(true); }}>+ Agregar Zona</button>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--gold)' }}>Restaurantes</h3>
          <div style={{ marginBottom: '12px' }}>
            {restaurantes.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'var(--bg)', borderRadius: '6px', marginBottom: '6px' }}>
                <span style={{ flex: 1, fontSize: '13px' }}>{r.nombre}</span>
                <button className="btn-icon" style={{ width: '24px', height: '24px', padding: 0 }} onClick={() => { setEditingRestaurante(r); setShowRestauranteForm(true); }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button className="btn-icon" style={{ width: '24px', height: '24px', padding: 0 }} onClick={() => handleDeleteRestaurante(r.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setEditingRestaurante(null); setShowRestauranteForm(true); }}>+ Agregar Restaurante</button>
        </div>

        {showZonaForm && (
          <ZonaForm
            zona={editingZona}
            onClose={() => setShowZonaForm(false)}
            onSave={async (nombre, color) => {
              if (editingZona) {
                await updateZona(editingZona.id, nombre, color);
              } else {
                await createZona(nombre, color);
              }
              await onReload();
              setShowZonaForm(false);
            }}
          />
        )}

        {showRestauranteForm && (
          <RestauranteForm
            restaurante={editingRestaurante}
            zonas={zonas}
            onClose={() => setShowRestauranteForm(false)}
            onSave={async (data) => {
              if (editingRestaurante) {
                await updateRestaurante(editingRestaurante.id, data.nombre, data.location, data.zona_id, data.tipo, data.niños);
              } else {
                await createRestaurante(data.nombre, data.location, data.zona_id, data.tipo, data.niños);
              }
              await onReload();
              setShowRestauranteForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function ZonaForm({ zona, onClose, onSave }) {
  const [nombre, setNombre] = useState(zona?.nombre || '');
  const [color, setColor] = useState(zona?.color || '#c9a84c');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{zona ? 'Editar Zona' : 'Nueva Zona'}</div>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-input" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Color</label>
          <input type="color" className="form-input" style={{ height: '40px' }} value={color} onChange={e => setColor(e.target.value)} />
        </div>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave(nombre, color)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

function RestauranteForm({ restaurante, zonas, onClose, onSave }) {
  const [nombre, setNombre] = useState(restaurante?.nombre || '');
  const [location, setLocation] = useState(restaurante?.location || '');
  const [zona_id, setZona_id] = useState(restaurante?.zona_id || '');
  const [tipo, setTipo] = useState(restaurante?.tipo || '');
  const [niños, setNiños] = useState(restaurante?.niños || false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{restaurante ? 'Editar Restaurante' : 'Nuevo Restaurante'}</div>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-input" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Ubicación</label>
          <input type="text" className="form-input" value={location} onChange={e => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Zona</label>
          <select className="form-select" value={zona_id} onChange={e => setZona_id(parseInt(e.target.value))}>
            <option value="">Selecciona una zona</option>
            {zonas.map(z => (
              <option key={z.id} value={z.id}>{z.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Tipo de Comida</label>
          <input type="text" className="form-input" value={tipo} onChange={e => setTipo(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-checkbox">
            <input type="checkbox" checked={niños} onChange={e => setNiños(e.target.checked)} />
            <span>Apto para niños</span>
          </label>
        </div>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave({ nombre, location, zona_id, tipo, niños })}>Guardar</button>
        </div>
      </div>
    </div>
  );
}