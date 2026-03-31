// Supabase Configuration
(function() {
  if (window.supabaseClient) return;

  const SUPABASE_URL = "https://nxplxutlvvlqqhlsnxdx.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_eK75ppbv13cJ0okn3v5O3A_WWCaUSkV";

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Configuración de Supabase incompleta. Verifica .env');
    return;
  }

  if (!window.supabase) {
    console.error('Supabase library not loaded');
    return;
  }

  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase initialized with URL:', SUPABASE_URL);
})();