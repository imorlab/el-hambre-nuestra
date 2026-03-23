// Supabase Configuration
(function() {
  if (window.supabaseClient) return; // Ya está inicializado
  
  const SUPABASE_URL = 'https://nxplxutlvvlqqhlsnxdx.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_eK75ppbv13cJ0okn3v5O3A_WWCaUSkV';
  
  if (!window.supabase) {
    console.error('Supabase library not loaded');
    return;
  }
  
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
