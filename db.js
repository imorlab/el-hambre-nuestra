// Database functions

async function getZonas() {
  const { data, error } = await supabase
    .from('zonas')
    .select('*')
    .order('nombre');
  if (error) throw error;
  return data || [];
}

async function createZona(nombre, color) {
  const { data, error } = await supabase
    .from('zonas')
    .insert([{ nombre, color }])
    .select();
  if (error) throw error;
  return data[0];
}

async function updateZona(id, nombre, color) {
  const { data, error } = await supabase
    .from('zonas')
    .update({ nombre, color })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

async function deleteZona(id) {
  const { error } = await supabase
    .from('zonas')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

async function getRestaurantes() {
  const { data, error } = await supabase
    .from('restaurantes')
    .select('*, zonas(nombre, color)')
    .order('nombre');
  if (error) throw error;
  return data || [];
}

async function createRestaurante(nombre, location, zona_id, tipo, niños) {
  const { data, error } = await supabase
    .from('restaurantes')
    .insert([{ nombre, location, zona_id, tipo, niños }])
    .select('*, zonas(nombre, color)');
  if (error) throw error;
  return data[0];
}

async function updateRestaurante(id, nombre, location, zona_id, tipo, niños) {
  const { data, error } = await supabase
    .from('restaurantes')
    .update({ nombre, location, zona_id, tipo, niños })
    .eq('id', id)
    .select('*, zonas(nombre, color)');
  if (error) throw error;
  return data[0];
}

async function deleteRestaurante(id) {
  const { error } = await supabase
    .from('restaurantes')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

async function getVisitas() {
  const { data, error } = await supabase
    .from('visitas')
    .select('*')
    .eq('user_id', currentUser.id);
  if (error) throw error;
  return data || [];
}

async function toggleVisita(restaurante_id) {
  const { data: existing } = await supabase
    .from('visitas')
    .select('id')
    .eq('user_id', currentUser.id)
    .eq('restaurante_id', restaurante_id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('visitas')
      .delete()
      .eq('id', existing.id);
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from('visitas')
      .insert([{ user_id: currentUser.id, restaurante_id }]);
    if (error) throw error;
    return true;
  }
}
