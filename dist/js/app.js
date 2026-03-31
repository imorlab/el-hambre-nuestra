let restaurantes = [];
let zonas = [];
let visitas = [];
let currentFilter = 'all';
let searchQuery = '';

async function loadData() {
  try {
    restaurantes = await getRestaurantes();
    zonas = await getZonas();
    visitas = await getVisitas();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function renderAuthScreen() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo" style="text-align: center; font-size: 28px; margin-bottom: 8px;">El Hambre <span>Nuestra</span></div>
        <div class="auth-subtitle">Gestiona tus restaurantes favoritos</div>
        
        <div id="authForm" class="auth-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" id="authEmail" class="form-input" placeholder="tu@email.com">
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <input type="password" id="authPassword" class="form-input" placeholder="••••••••">
          </div>
          <button id="authToggle" class="btn btn-primary" style="width: 100%;">Registrarse</button>
          <button id="authSwitch" class="btn btn-secondary" style="width: 100%;">¿Ya tienes cuenta? Inicia sesión</button>
        </div>
      </div>
    </div>
  `;

  let isSignUp = true;
  const authToggle = document.getElementById('authToggle');
  const authSwitch = document.getElementById('authSwitch');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');

  authToggle.addEventListener('click', async () => {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      authToggle.disabled = true;
      authToggle.textContent = 'Procesando...';

      if (isSignUp) {
        await signUp(email, password);
        alert('Registro exitoso. Por favor inicia sesión.');
        isSignUp = false;
        authToggle.textContent = 'Inicia sesión';
        authSwitch.textContent = '¿No tienes cuenta? Regístrate';
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      authToggle.disabled = false;
    }
  });

  authSwitch.addEventListener('click', () => {
    isSignUp = !isSignUp;
    authToggle.textContent = isSignUp ? 'Registrarse' : 'Inicia sesión';
    authSwitch.textContent = isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate';
  });
}

async function renderApp() {
  await loadData();

  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <div class="header-top">
        <div class="logo">El Hambre <span>Nuestra</span></div>
        <div class="header-actions">
          <button id="btnAdmin" class="btn-icon" title="Administración">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
          <div class="user-badge" id="userBadge"></div>
          <button id="btnLogout" class="btn-icon" title="Cerrar sesión">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
      <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="searchInput" class="form-input" placeholder="Buscar restaurante...">
      </div>
      <div class="filters" id="filters"></div>
    </header>

    <main id="main"></main>

    <div class="stats-bar">
      <div class="stat">
        <div class="stat-value" id="statTotal">0</div>
        <div class="stat-label">Total</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <div class="stat-value" id="statVisited">0</div>
        <div class="stat-label">Visitados</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <div class="stat-value" id="statPct">0%</div>
        <div class="stat-label">Completado</div>
      </div>
    </div>
  `;

  const userBadge = document.getElementById('userBadge');
  userBadge.textContent = currentUser.email.split('@')[0];

  document.getElementById('btnLogout').addEventListener('click', async () => {
    await signOut();
  });

  document.getElementById('btnAdmin').addEventListener('click', () => {
    showAdminModal();
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderRestaurants();
  });

  renderFilters();
  renderRestaurants();
}

function renderFilters() {
  const filters = document.getElementById('filters');
  filters.innerHTML = `
    <button class="filter-btn active" data-filter="all">Todos</button>
    <button class="filter-btn" data-filter="visitado">✓ Visitados</button>
    <button class="filter-btn" data-filter="pendiente">Por ir</button>
    <select id="zonaFilter" class="filter-select">
      <option value="">Todas las zonas</option>
      ${zonas.map(z => `<option value="zona-${z.id}">${z.nombre}</option>`).join('')}
    </select>
  `;

  filters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('zonaFilter').value = '';
      currentFilter = btn.dataset.filter;
      renderRestaurants();
    });
  });

  document.getElementById('zonaFilter').addEventListener('change', (e) => {
    if (e.target.value) {
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      currentFilter = e.target.value;
    } else {
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      filters.querySelector('[data-filter="all"]').classList.add('active');
      currentFilter = 'all';
    }
    renderRestaurants();
  });
}

function matchesFilter(r) {
  if (currentFilter === 'visitado') {
    return visitas.some(v => v.restaurante_id === r.id);
  }
  if (currentFilter === 'pendiente') {
    return !visitas.some(v => v.restaurante_id === r.id);
  }
  if (currentFilter.startsWith('zona-')) {
    const zonaId = parseInt(currentFilter.split('-')[1]);
    return r.zona_id === zonaId;
  }
  return true;
}

function matchesSearch(r) {
  if (!searchQuery) return true;
  return r.nombre.toLowerCase().includes(searchQuery) ||
         (r.location || '').toLowerCase().includes(searchQuery) ||
         (r.tipo || '').toLowerCase().includes(searchQuery);
}

function renderRestaurants() {
  const main = document.getElementById('main');
  const filtered = restaurantes.filter(r => matchesFilter(r) && matchesSearch(r));

  const total = restaurantes.length;
  const visited = visitas.length;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statVisited').textContent = visited;
  document.getElementById('statPct').textContent = total > 0 ? Math.round(visited / total * 100) + '%' : '0%';

  if (filtered.length === 0) {
    main.innerHTML = `<div class="empty-state"><div class="emoji">🍽️</div>No se encontraron restaurantes</div>`;
    return;
  }

  const grouped = {};
  filtered.forEach(r => {
    if (!grouped[r.zona_id]) {
      grouped[r.zona_id] = [];
    }
    grouped[r.zona_id].push(r);
  });

  let html = '';
  zonas.forEach(zona => {
    const items = grouped[zona.id] || [];
    if (!items.length) return;

    html += `
      <div class="section" data-zona="${zona.id}">
        <div class="section-header" onclick="toggleSection(${zona.id})">
          <div class="section-title-wrap">
            <div class="section-dot" style="background:${zona.color}"></div>
            <div class="section-title">${zona.nombre}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="section-count">${items.length}</span>
            <svg class="section-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="section-body" style="max-height:9999px">
          <div class="restaurant-list">
            ${items.map(r => renderCard(r)).join('')}
          </div>
          <div style="height:8px"></div>
        </div>
      </div>
    `;
  });

  main.innerHTML = html;
}

function renderCard(r) {
  const isVisited = visitas.some(v => v.restaurante_id === r.id);
  let tags = '';
  if (isVisited) tags += `<span class="tag tag-visitado">✓ Visitado</span>`;
  if (r.niños) tags += `<span class="tag tag-niños">👶 Niños</span>`;
  if (r.tipo) tags += `<span class="tag tag-tipo">${r.tipo}</span>`;

  return `
    <div class="card ${isVisited ? 'visited' : ''}" id="card-${r.id}">
      <div class="card-left">
        <div class="card-name">${r.nombre}</div>
        ${r.location ? `<div class="card-location">${r.location}</div>` : ''}
        ${tags ? `<div class="card-tags">${tags}</div>` : ''}
      </div>
      <div class="card-check" onclick="toggleVisitaCard(${r.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
    </div>
  `;
}

function toggleSection(zonaId) {
  const sec = document.querySelector(`[data-zona="${zonaId}"]`);
  sec.classList.toggle('collapsed');
}

async function toggleVisitaCard(restauranteId) {
  try {
    await toggleVisita(restauranteId);
    await loadData();
    renderRestaurants();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

function showAdminModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Administración</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 16px; margin-bottom: 12px; color: var(--gold);">Zonas</h3>
        <div id="zonasList" style="margin-bottom: 12px;"></div>
        <button id="btnAddZona" class="btn btn-primary" style="width: 100%;">+ Agregar Zona</button>
      </div>

      <div>
        <h3 style="font-size: 16px; margin-bottom: 12px; color: var(--gold);">Restaurantes</h3>
        <div id="restaurantesList" style="margin-bottom: 12px;"></div>
        <button id="btnAddRestaurante" class="btn btn-primary" style="width: 100%;">+ Agregar Restaurante</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const zonasList = overlay.querySelector('#zonasList');
  zonasList.innerHTML = zonas.map(z => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--bg); border-radius: 6px; margin-bottom: 6px;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${z.color};"></div>
      <span style="flex: 1;">${z.nombre}</span>
      <button class="btn-icon" style="width: 24px; height: 24px; padding: 0;" onclick="editZona(${z.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="btn-icon" style="width: 24px; height: 24px; padding: 0;" onclick="deleteZonaConfirm(${z.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    </div>
  `).join('');

  const restaurantesList = overlay.querySelector('#restaurantesList');
  restaurantesList.innerHTML = restaurantes.map(r => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--bg); border-radius: 6px; margin-bottom: 6px;">
      <span style="flex: 1; font-size: 13px;">${r.nombre}</span>
      <button class="btn-icon" style="width: 24px; height: 24px; padding: 0;" onclick="editRestaurante(${r.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="btn-icon" style="width: 24px; height: 24px; padding: 0;" onclick="deleteRestauranteConfirm(${r.id})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    </div>
  `).join('');

  overlay.querySelector('#btnAddZona').addEventListener('click', showZonaForm);
  overlay.querySelector('#btnAddRestaurante').addEventListener('click', showRestauranteForm);
}

function showZonaForm(zonaId = null) {
  const zona = zonaId ? zonas.find(z => z.id === zonaId) : null;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${zona ? 'Editar Zona' : 'Nueva Zona'}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      
      <div class="form-group">
        <label class="form-label">Nombre</label>
        <input type="text" id="zonaName" class="form-input" value="${zona?.nombre || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Color</label>
        <input type="color" id="zonaColor" class="form-input" style="height: 40px;" value="${zona?.color || '#c9a84c'}">
      </div>

      <div class="btn-group">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
        <button id="btnSaveZona" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#btnSaveZona').addEventListener('click', async () => {
    const nombre = overlay.querySelector('#zonaName').value.trim();
    const color = overlay.querySelector('#zonaColor').value;

    if (!nombre) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      if (zona) {
        await updateZona(zona.id, nombre, color);
      } else {
        await createZona(nombre, color);
      }
      overlay.remove();
      await loadData();
      renderFilters();
      renderRestaurants();
      showAdminModal();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

function showRestauranteForm(restauranteId = null) {
  const restaurante = restauranteId ? restaurantes.find(r => r.id === restauranteId) : null;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${restaurante ? 'Editar Restaurante' : 'Nuevo Restaurante'}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      
      <div class="form-group">
        <label class="form-label">Nombre</label>
        <input type="text" id="restName" class="form-input" value="${restaurante?.nombre || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Ubicación</label>
        <input type="text" id="restLocation" class="form-input" value="${restaurante?.location || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Zona</label>
        <select id="restZona" class="form-select">
          <option value="">Selecciona una zona</option>
          ${zonas.map(z => `<option value="${z.id}" ${restaurante?.zona_id === z.id ? 'selected' : ''}>${z.nombre}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tipo de Comida</label>
        <input type="text" id="restTipo" class="form-input" placeholder="Ej: Italiano, Mariscos..." value="${restaurante?.tipo || ''}">
      </div>
      <div class="form-group">
        <label class="form-checkbox">
          <input type="checkbox" id="restNiños" ${restaurante?.niños ? 'checked' : ''}>
          <span>Apto para niños</span>
        </label>
      </div>

      <div class="btn-group">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
        <button id="btnSaveRestaurante" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#btnSaveRestaurante').addEventListener('click', async () => {
    const nombre = overlay.querySelector('#restName').value.trim();
    const location = overlay.querySelector('#restLocation').value.trim();
    const zona_id = parseInt(overlay.querySelector('#restZona').value);
    const tipo = overlay.querySelector('#restTipo').value.trim() || null;
    const niños = overlay.querySelector('#restNiños').checked;

    if (!nombre || !zona_id) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    try {
      if (restaurante) {
        await updateRestaurante(restaurante.id, nombre, location, zona_id, tipo, niños);
      } else {
        await createRestaurante(nombre, location, zona_id, tipo, niños);
      }
      overlay.remove();
      await loadData();
      renderRestaurants();
      showAdminModal();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

async function deleteZonaConfirm(zonaId) {
  if (confirm('¿Estás seguro de que quieres eliminar esta zona?')) {
    try {
      await deleteZona(zonaId);
      await loadData();
      renderFilters();
      renderRestaurants();
      showAdminModal();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
}

async function deleteRestauranteConfirm(restauranteId) {
  if (confirm('¿Estás seguro de que quieres eliminar este restaurante?')) {
    try {
      await deleteRestaurante(restauranteId);
      await loadData();
      renderRestaurants();
      showAdminModal();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
}

function editZona(zonaId) {
  document.querySelector('.modal-overlay').remove();
  showZonaForm(zonaId);
}

function editRestaurante(restauranteId) {
  document.querySelector('.modal-overlay').remove();
  showRestauranteForm(restauranteId);
}

initAuth();
