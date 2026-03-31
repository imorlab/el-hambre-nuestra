import { useState } from 'react';
import ToastProvider from './components/ToastProvider';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import StatsBar from './components/StatsBar';
import AdminModal from './components/AdminModal';
import { initSupabase } from './services/supabase';

initSupabase();

export default function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const { zonas, restaurantes, visitas, reload } = useData(user);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return <AuthScreen signIn={signIn} signUp={signUp} />;
  }

  const filteredRestaurantes = restaurantes.filter(r => {
    const matchesFilter = (() => {
      if (currentFilter === 'visitado') return visitas.some(v => v.restaurante_id === r.id);
      if (currentFilter === 'pendiente') return !visitas.some(v => v.restaurante_id === r.id);
      if (currentFilter.startsWith('zona-')) {
        const zonaId = parseInt(currentFilter.split('-')[1]);
        return r.zona_id === zonaId;
      }
      return true;
    })();

    const matchesSearch = !searchQuery || 
      r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.tipo || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <ToastProvider>
      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={signOut}
        onAdmin={() => setShowAdmin(true)}
      />
      <main>
        <div className="filters">
          <button 
            className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${currentFilter === 'visitado' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('visitado')}
          >
            ✓ Visitados
          </button>
          <button 
            className={`filter-btn ${currentFilter === 'pendiente' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('pendiente')}
          >
            Por ir
          </button>
          <select 
            className="filter-select"
            value={currentFilter.startsWith('zona-') ? currentFilter : ''}
            onChange={(e) => setCurrentFilter(e.target.value || 'all')}
          >
            <option value="">Todas las zonas</option>
            {zonas.map(z => (
              <option key={z.id} value={`zona-${z.id}`}>{z.nombre}</option>
            ))}
          </select>
        </div>
        <RestaurantList
          zonas={zonas}
          restaurantes={filteredRestaurantes}
          visitas={visitas}
          userId={user.id}
          onReload={reload}
        />
      </main>
      <StatsBar total={restaurantes.length} visited={visitas.length} />
      {showAdmin && (
        <AdminModal
          zonas={zonas}
          restaurantes={restaurantes}
          onClose={() => setShowAdmin(false)}
          onReload={reload}
        />
      )}
    </ToastProvider>
  );
}