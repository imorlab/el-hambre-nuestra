// Supabase Configuration
(async function() {
  if (window.supabaseClient) return;
  
  try {
    const response = await fetch('../config.json');
    const config = await response.json();
    
    const SUPABASE_URL = config.supabase.url;
    const SUPABASE_ANON_KEY = config.supabase.anonKey;
    
    if (!window.supabase) {
      console.error('Supabase library not loaded');
      return;
    }
    
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized with URL:', SUPABASE_URL);
  } catch (error) {
    console.error('Error loading config:', error);
  }
})();
