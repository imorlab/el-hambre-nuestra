import { getSupabase } from './supabase';

export async function getZonas() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('zonas').select('*').order('nombre');
  if (error) throw error;
  return data || [];
}

export async function createZona(nombre, color) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('zonas').insert([{ nombre, color }]).select();
  if (error) throw error;
  return data[0];
}

export async function updateZona(id, nombre, color) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('zonas').update({ nombre, color }).eq('id', id).select();
  if (error) throw error;
  return data[0];
}

export async function deleteZona(id) {
  const supabase = getSupabase();
  const { error } = await supabase.from('zonas').delete().eq('id', id);
  if (error) throw error;
}

export async function getRestaurantes() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('restaurantes').select('*, zonas(nombre, color)').order('nombre');
  if (error) throw error;
  return data || [];
}

export async function createRestaurante(nombre, location, zona_id, tipo, niños, description) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('restaurantes').insert([{ nombre, location, zona_id, tipo, niños, description }]).select();
  if (error) throw error;
  return data[0];
}

export async function updateRestaurante(id, nombre, location, zona_id, tipo, niños, description) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('restaurantes').update({ nombre, location, zona_id, tipo, niños, description }).eq('id', id).select();
  if (error) throw error;
  return data[0];
}

export async function deleteRestaurante(id) {
  const supabase = getSupabase();
  const { error } = await supabase.from('restaurantes').delete().eq('id', id);
  if (error) throw error;
}

export async function getVisitas(userId) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('visitas').select('*').eq('user_id', userId);
  if (error) throw error;
  return data || [];
}

export async function toggleVisita(userId, restauranteId) {
  const supabase = getSupabase();
  
  const { data: existing, error: queryError } = await supabase
    .from('visitas')
    .select('id')
    .eq('user_id', userId)
    .eq('restaurante_id', restauranteId)
    .maybeSingle();

  if (queryError && queryError.code !== 'PGRST116') {
    throw queryError;
  }

  if (existing) {
    const { error } = await supabase.from('visitas').delete().eq('id', existing.id);
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase.from('visitas').insert([{ user_id: userId, restaurante_id: restauranteId }]);
    if (error) throw error;
    return true;
  }
}