# Configurar Supabase Local con Docker

## Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Git
- Node.js (opcional, para CLI de Supabase)

## Instalación Rápida

### 1. Clonar Supabase (Opción Recomendada)

```bash
cd c:\
git clone --depth 1 https://github.com/supabase/supabase.git
cd supabase\docker
cp .env.example .env
```

### 2. Iniciar Supabase con Docker Compose

```bash
cd c:\supabase\docker
docker-compose up -d
```

Esto levantará:
- PostgreSQL en `localhost:5432`
- Supabase Studio en `http://localhost:3000`
- API REST en `http://localhost:8000`

### 3. Acceder a Supabase Studio

1. Abre http://localhost:3000 en tu navegador
2. Email: `admin@example.com`
3. Password: `password`

### 4. Crear Proyecto Local

1. En Supabase Studio, crea un nuevo proyecto
2. Copia las credenciales:
   - **Project URL**: `http://localhost:8000`
   - **Anon Key**: (se muestra en Settings → API)

### 5. Actualizar config.js

Edita `js/config.js`:

```javascript
(function() {
  if (window.supabaseClient) return;
  
  const SUPABASE_URL = 'http://localhost:8000';
  const SUPABASE_ANON_KEY = 'tu-anon-key-local';
  
  if (!window.supabase) {
    console.error('Supabase library not loaded');
    return;
  }
  
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
```

### 6. Ejecutar SQL Setup

1. En Supabase Studio, ve a **SQL Editor**
2. Crea una nueva query
3. Copia el contenido de `sql/setup.sql`
4. Ejecuta la query

### 7. Probar Localmente

```bash
# En Laragon o tu servidor local
http://localhost/el-hambre-nuestra/
```

## Comandos Útiles

```bash
# Ver logs
docker-compose logs -f

# Detener Supabase
docker-compose down

# Reiniciar Supabase
docker-compose restart

# Eliminar todo (datos incluidos)
docker-compose down -v
```

## Cambiar entre Local y Producción

### Para Desarrollo Local (Docker)
```javascript
const SUPABASE_URL = 'http://localhost:8000';
const SUPABASE_ANON_KEY = 'tu-anon-key-local';
```

### Para Producción (GitHub Pages)
```javascript
const SUPABASE_URL = 'https://nxplxutlvvlqqhlsnxdx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eK75ppbv13cJ0okn3v5O3A_WWCaUSkV';
```

## Solución de Problemas

### Puerto 5432 ya está en uso
```bash
docker-compose down
# O cambiar puerto en docker-compose.yml
```

### No puedo acceder a Supabase Studio
- Verifica que Docker Desktop esté ejecutándose
- Espera 30 segundos después de `docker-compose up`
- Intenta http://localhost:3000

### Errores de conexión desde la app
- Verifica que `SUPABASE_URL` sea `http://localhost:8000`
- Comprueba que la Anon Key sea correcta
- Abre la consola (F12) para ver errores

## Notas

- Los datos se guardan en volúmenes de Docker
- Usar `docker-compose down -v` elimina todos los datos
- Para desarrollo, es más rápido que la versión en la nube
- Perfecto para testing sin depender de internet
