import { getSupabase } from './supabase';

export async function signUp(email, password) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailConfirmRedirectUrl: 'https://imorlab.github.io/el-hambre-nuestra/#',
    },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const supabase = getSupabase();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
}

export function onAuthStateChange(callback) {
  const supabase = getSupabase();
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
}