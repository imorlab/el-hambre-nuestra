# El Hambre Nuestra

Aplicación web para gestionar y compartir tus restaurantes favoritos con múltiples usuarios. Construida con Vanilla JS y Supabase.

## Características

- 🔐 Autenticación de usuarios
- 🍽️ Gestión de restaurantes y zonas
- ✓ Marca restaurantes como visitados
- 🔍 Búsqueda y filtros
- 📊 Estadísticas de progreso
- 👥 Múltiples usuarios simultáneos
- 📱 Diseño responsive

## Requisitos Previos

- Cuenta en [Supabase](https://supabase.com) (gratuito)
- Cuenta en [GitHub](https://github.com)

## Instalación y Configuración

### 1. Crear Proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que se inicialice (2-3 minutos)
4. Ve a **SQL Editor** y ejecuta el contenido del archivo `setup.sql`

### 2. Obtener Credenciales de Supabase

1. Ve a **Settings** → **API**
2. Copia:
   - `Project URL` (será tu `SUPABASE_URL`)
   - `anon public` key (será tu `SUPABASE_ANON_KEY`)

### 3. Configurar el Proyecto

1. Abre `config.js`
2. Reemplaza:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```
   Con tus credenciales reales

### 4. Probar Localmente

```bash
# Si usas Laragon, simplemente abre en el navegador:
http://localhost/el-hambre-nuestra/
```

### 5. Crear Repositorio en GitHub

```bash
cd c:\laragon\www\el-hambre-nuestra

# Inicializar git
git init
git add .
git commit -m "Initial commit"

# Crear repo en GitHub y agregar remote
git remote add origin https://github.com/tu-usuario/el-hambre-nuestra.git
git branch -M main
git push -u origin main
```

### 6. Desplegar en GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En "Source", selecciona `main` branch y `/root` folder
4. Espera a que se despliegue (2-3 minutos)
5. Tu sitio estará disponible en: `https://tu-usuario.github.io/el-hambre-nuestra/`

## Estructura del Proyecto

```
el-hambre-nuestra/
├── index.html                    # HTML principal
├── README.md                     # Este archivo
├── .nojekyll                     # Para GitHub Pages
├── css/
│   └── styles.css               # Estilos (Vanilla CSS)
├── js/
│   ├── config.js                # Configuración de Supabase
│   ├── auth.js                  # Funciones de autenticación
│   ├── db.js                    # Funciones de base de datos
│   └── app.js                   # Lógica principal de la app
├── sql/
│   ├── setup.sql                # Script SQL para crear tablas
│   └── seed-data.sql            # Datos iniciales
└── image/
    └── favicon/                 # Iconos de la app
```

## Uso

### Para Usuarios

1. **Registrarse**: Crea una cuenta con tu email
2. **Explorar**: Busca y filtra restaurantes
3. **Marcar Visitados**: Haz clic en el círculo para marcar como visitado
4. **Ver Progreso**: Mira tus estadísticas en la barra inferior

### Para Administradores

1. Haz clic en el icono de menú (⋮) en la esquina superior derecha
2. **Gestionar Zonas**: Agregar, editar o eliminar zonas
3. **Gestionar Restaurantes**: Agregar, editar o eliminar restaurantes

## Seguridad

- Las contraseñas se almacenan de forma segura en Supabase
- Cada usuario solo ve sus propias visitas
- Las políticas RLS (Row Level Security) protegen los datos

## Solución de Problemas

### "Error: SUPABASE_URL is not defined"
- Verifica que `config.js` tenga las credenciales correctas

### "Error: 401 Unauthorized"
- La `SUPABASE_ANON_KEY` es incorrecta
- Copia nuevamente desde Supabase Settings → API

### Los cambios no se guardan
- Verifica que el usuario esté autenticado
- Comprueba la consola del navegador (F12) para errores

## Próximas Mejoras

- [ ] Exportar datos a CSV
- [ ] Compartir listas entre usuarios
- [ ] Fotos de restaurantes
- [ ] Valoraciones y comentarios
- [ ] Integración con Google Maps

## Licencia

MIT
