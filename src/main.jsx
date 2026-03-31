import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initSupabase, getSupabase } from './services/supabase';
import './sileo.css';
import './index.css';

initSupabase();

const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
const accessToken = params.get('access_token');
const expiresAt = params.get('expires_at');

if (accessToken && expiresAt) {
  const supabase = getSupabase();
  const session = {
    access_token: accessToken,
    expires_at: parseInt(expiresAt),
    refresh_token: params.get('refresh_token'),
    token_type: params.get('token_type'),
    user: null,
  };
  
  supabase.auth.setSession(session).then(({ error }) => {
    if (!error) {
      window.location.hash = '';
      window.location.href = '/el-hambre-nuestra/';
    }
  });
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);