-- Insertar zonas
INSERT INTO zonas (nombre, color) VALUES
('Sevilla — Con Niños', '#c9a84c'),
('Sevilla — Sin Niños', '#c05252'),
('Barbate', '#4a8fa8'),
('Tarifa', '#5aa88a'),
('Isla Cristina', '#7a6ea8');

-- Insertar restaurantes - SEVILLA CON NIÑOS
INSERT INTO restaurantes (nombre, location, zona_id, tipo, niños) VALUES
('QCross', 'Parque Árbol Grande', 1, NULL, true),
('Kiosco Santa Bárbara', 'Parque Buhaira', 1, NULL, true),
('Bambú', 'Espartinas', 1, NULL, true),
('Miano', 'Lebrija', 1, NULL, true),
('Asador La Puebla', 'La Puebla del Río', 1, NULL, true),
('Las Pajanosas', 'Zona de servicio', 1, NULL, true),
('Cafetería Domi Vélez', 'Lebrija — zona niños', 1, NULL, true),
('MR Mamut', 'Burger Aljarafe — zona niños', 1, 'Burgers', true),
('Rancho Morancho', 'Sevilla', 1, NULL, true),
('Delantal Negro', 'Centro — marroquí', 1, 'Marroquí', true),
('Cevichano', 'Sevilla', 1, 'Peruano', true),
('Plato Plató', 'Felipe II', 1, NULL, true),
('La Brunilda', 'Sevilla', 1, NULL, true),
('El Bartolomea', 'Sevilla', 1, NULL, true),
('Torres y García', 'Centro', 1, NULL, true),
('Lobo López', 'Sevilla', 1, NULL, true),
('Perro Viejo', 'Centro', 1, NULL, true),
('Perro Chiko', 'Centro', 1, NULL, true),
('Gallinero de Sandra', 'Centro', 1, NULL, true),
('Disparate', 'Sevilla', 1, NULL, true),
('La Bernarda', 'Puente Bomberos', 1, NULL, true),
('Ovejas Negras', 'Centro', 1, NULL, true),
('García Vidal', 'Bermejales', 1, NULL, true),
('Aljibe', 'Sevilla', 1, NULL, true),
('María Trifulca', 'Sevilla', 1, NULL, true),
('Mechela', 'Sevilla', 1, NULL, true),
('La Casa del Tigre', 'Sevilla', 1, NULL, true),
('Mesón La Isla', 'Sevilla Este', 1, NULL, true),
('Taberna del Este', 'Sevilla Este', 1, NULL, true),
('Aderezo', 'Sevilla Este', 1, NULL, true),
('María Germiná', 'Sevilla Este', 1, NULL, true),
('Porta Rosa', 'Sevilla', 1, NULL, true),
('Leña al Lomo', 'Sevilla', 1, NULL, true),
('La Quinta Braseria', 'Santa Catalina', 1, NULL, true),
('Sol y Sombra', 'C/ Castilla', 1, NULL, true),
('Casa Aníbal', 'Sevilla', 1, NULL, true),
('Basque Eneko', 'Sevilla', 1, 'Vasco', true),
('Sibuya', 'Centro', 1, 'Japonés', true),
('Casa Montalvan', 'Sevilla', 1, NULL, true),
('La Majjareta', 'Montequinto', 1, NULL, true),
('Grosso Napolitano', 'Viapol', 1, 'Italiana', true),
('Picantón', 'Sevilla', 1, NULL, true),
('Casa Yaki', 'Sevilla', 1, NULL, true),
('Seis', 'Sevilla', 1, NULL, true),
('Señor Cangrejo', 'C/ Harinas', 1, NULL, true),
('Taberna La Romana', 'Santiponce', 1, NULL, true),
('El Marriqueño', 'Coria del Río', 1, NULL, true),
('Restaurante Malvaloca', 'Encarnación', 1, NULL, true),
('Restaurante Doña Encarna', 'Encarnación', 1, NULL, true),
('Ispal', 'Plaza San Sebastián — menú degustación', 1, 'Degustación', true),
('Pan y Circo', 'El Salvador', 1, NULL, true),
('La Lola', 'Hotel junto a la Alameda', 1, NULL, true),
('Casa Ozama', 'Al lado Parque M. Luisa', 1, NULL, true),
('De la O', 'Paseo Ntra. Sra. de la Ó — Triana', 1, NULL, true),
('Taberna Alabardero', 'C/ Zaragoza', 1, NULL, true),
('Recoveco', 'C/ Ortiz de Zúñiga 8', 1, NULL, true),
('Manolo León', 'C/ Guadalquivir', 1, NULL, true),
('Bar Giralda', 'C/ Mateos Gago', 1, NULL, true),
('Manolo Mayo', 'Sevilla', 1, NULL, true),
('Antigua Filomena', 'Bermejales', 1, NULL, true),
('Leartisan Bistró', 'Bermejales', 1, NULL, true),
('De la Cruz', 'Tomares', 1, NULL, true),
('Rico', 'Rinconete y Cortadillo — San Jacinto', 1, NULL, true),
('Casa Carmen', 'Centro — junto a la Plaza de Toros', 1, NULL, true),
('Taberna Caneto', 'Centro', 1, NULL, true),
('Braseros Moroncho', 'Castilleja', 1, NULL, true),
('Lola Cacerola', 'Por el río', 1, NULL, true),
('Escalona', 'La Alfalfa', 1, NULL, true),
('El Cerdo Negro', 'Pino Montano', 1, NULL, true),
('Cocoma', 'Bormujos', 1, NULL, true),
('La Cochera del Abuelo', 'Sevilla', 1, NULL, true);

-- Insertar restaurantes - SEVILLA SIN NIÑOS
INSERT INTO restaurantes (nombre, location, zona_id, tipo, niños) VALUES
('Malandro', 'Plaza de Toros — sin niños', 2, NULL, false);

-- Insertar restaurantes - BARBATE
INSERT INTO restaurantes (nombre, location, zona_id, tipo, niños) VALUES
('Peña del Atún', 'Barbate', 3, 'Atún', false),
('Peña El Cartucho', 'Barbate', 3, 'Atún', false),
('Paquete Torres', 'Barbate', 3, NULL, false),
('El Capitán', 'Barbate', 3, NULL, false),
('El Abelardo', 'Barbate', 3, NULL, false);

-- Insertar restaurantes - TARIFA
INSERT INTO restaurantes (nombre, location, zona_id, tipo, niños) VALUES
('La Pescadería', 'Tarifa', 4, 'Pescado', false),
('La Tarifeña', 'Tarifa', 4, NULL, false);

-- Insertar restaurantes - ISLA CRISTINA
INSERT INTO restaurantes (nombre, location, zona_id, tipo, niños) VALUES
('Casa Gato', 'Isla Cristina', 5, NULL, false),
('Restaurante Cristina', 'Isla Cristina — variado, no caro', 5, NULL, false),
('La Sal', 'Isla Cristina — Centro: pulpo y puntillitas', 5, 'Mariscos', false),
('Verbena Casa Manino', 'Isla Cristina — arroces, sardinas, ventresca', 5, 'Arroces', false),
('Goyo', 'Isla Cristina — araña, zamburiñas', 5, 'Mariscos', false),
('La Purísima', 'Isla Cristina — Centro', 5, NULL, false),
('Bebo''s', 'Isla Cristina', 5, 'Burgers & Pizzas', false),
('Patera', 'Isla Cristina — junto al paseo: pulpo al Luis Felipe', 5, 'Mariscos', false);
