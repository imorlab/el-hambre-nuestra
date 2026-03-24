-- Crear tabla de zonas
CREATE TABLE zonas (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de restaurantes
CREATE TABLE restaurantes (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  location TEXT,
  zona_id BIGINT NOT NULL REFERENCES zonas(id) ON DELETE CASCADE,
  tipo TEXT,
  niños BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de visitas (usuario + restaurante)
CREATE TABLE visitas (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurante_id BIGINT NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, restaurante_id)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE zonas ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitas ENABLE ROW LEVEL SECURITY;

-- Políticas para zonas (cualquiera puede leer, solo admin puede escribir)
CREATE POLICY "zonas_select" ON zonas FOR SELECT USING (true);
CREATE POLICY "zonas_insert" ON zonas FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "zonas_update" ON zonas FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "zonas_delete" ON zonas FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para restaurantes (cualquiera puede leer, solo auth pueden escribir)
CREATE POLICY "restaurantes_select" ON restaurantes FOR SELECT USING (true);
CREATE POLICY "restaurantes_insert" ON restaurantes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "restaurantes_update" ON restaurantes FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "restaurantes_delete" ON restaurantes FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para visitas (cada usuario solo ve sus propias visitas)
CREATE POLICY "visitas_select" ON visitas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "visitas_insert" ON visitas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "visitas_delete" ON visitas FOR DELETE USING (auth.uid() = user_id);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_restaurantes_zona_id ON restaurantes(zona_id);
CREATE INDEX idx_visitas_user_id ON visitas(user_id);
CREATE INDEX idx_visitas_restaurante_id ON visitas(restaurante_id);
