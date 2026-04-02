-- Crear zona con ID 1 para restaurantes con niños
INSERT INTO zonas (id, nombre, color) VALUES (1, 'Sevilla con niños', '#c9a84c');

-- Insertar restaurantes con niños (zona_id = 1)
INSERT INTO restaurantes (nombre, location, zona_id, tipo, niños, description) VALUES
('MYA Sushi', 'Dos Hermanas', 1, 'Buffet / Japonés', true, 'Restaurant buffet con playground interior gratuito (ideal para lluvia o calor). Reservar al lado de la zona de juego. Robot que sirve comida/bebida. Niños hasta cierta edad pagan menos.'),
('Vicentina cafe+libros', 'Sevilla', 1, 'Cafetería', true, 'Cafés, tés, cómics, novelas, cuentos, juegos. Rincón infantil y actividades.'),
('Asador El Chaparral', 'Carrión de los Céspedes', 1, 'Asador', true, 'Zona de juego de pago con monitora.'),
('Venta El Capricho', 'Mairena del Aljarafe', 1, 'Restaurante', true, 'Estructuras para trepar al aire libre, mini pista de fútbol.'),
('La Dulce Ilusión', 'Coria del Río', 1, 'Pastelería / Panadería', true, 'Sin gluten, pan, dulces, helados. Zona de juego gratuita.'),
('El Jardín de Gennes', 'Gines', 1, 'Restaurante', true, 'En Gines Plaza, parque infantil cerca.'),
('Restaurante Armanda', 'Sevilla', 1, 'Restaurante', true, 'Terraza cerrada con césped, sin coches.'),
('El Asador de Bormujos', 'Bormujos', 1, 'Asador', true, 'Junto a Macro. Playground gratuito interior.'),
('La Bastarda', 'Triana', 1, 'Restaurante', true, 'Sin gluten. Placita sin coches con parque público.'),
('Restaurante Brooklyn', 'La Palma del Condado', 1, 'Restaurante', true, 'Parque de bolas de pago. Buen ambiente por dentro.'),
('Bar Kiosco El Lago', 'Espartinas', 1, 'Bar', true, 'En parque El Teso. Hinchables algunos fines de semana.'),
('Bar Las Brisas', 'Gines', 1, 'Bar', true, 'Parque al lado con colchoneta, columpios, máquinas-gimnasio.'),
('Asador Las Dos Jotas', 'Bormujos', 1, 'Asador', true, 'Terraza al aire libre con toboganes.'),
('Bar San Rafael', 'Mairena del Aljarafe', 1, 'Bar', true, 'Montaditos, buen ambiente.'),

('QCross', 'Parque Árbol Grande', 1, NULL, true, NULL),
('Kiosco Santa Bárbara', 'Parque Buhaira', 1, NULL, true, NULL);

-- Si ya existe la zona, solo insertar restaurantes
-- DELETE FROM zonas WHERE id = 1;
-- DELETE FROM restaurantes WHERE zona_id = 1;