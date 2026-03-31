import { useState } from 'react';
import { useToast } from '../hooks/useToast';

export default function AuthScreen({ signIn, signUp }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        showSuccess('Registro exitoso. Por favor inicia sesión.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        showSuccess('¡Bienvenido de nuevo!');
      }
    } catch (err) {
      setError(err.message);
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo" style={{ textAlign: 'center', fontSize: '28px', marginBottom: '8px' }}>
          El Hambre <span>Nuestra</span>
        </div>
        <div className="auth-subtitle">Gestiona tus restaurantes favoritos</div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Procesando...' : isSignUp ? 'Registrarse' : 'Inicia sesión'}
          </button>
          <button type="button" className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </form>
      </div>
    </div>
  );
}