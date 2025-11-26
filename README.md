# Shop-Co Frontend

Aplicación web frontend para una plataforma de e-commerce desarrollada con React, TypeScript y Vite. Esta aplicación permite a usuarios comprar productos (buyers) y a vendedores gestionar sus productos y pedidos (sellers).

## 🚀 Tecnologías Principales

- **React 19.1.1** - Biblioteca de UI
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.1.7** - Build tool y dev server
- **React Router DOM 7.9.5** - Enrutamiento
- **Zustand 5.0.8** - Gestión de estado global
- **Axios 1.13.1** - Cliente HTTP
- **Tailwind CSS 4.1.16** - Framework CSS
- **React Hook Form 7.66.0** - Manejo de formularios
- **React Hot Toast 2.6.0** - Notificaciones
- **Motion 12.23.24** - Animaciones
- **Lucide React 0.552.0** - Iconos

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x (o **yarn** / **pnpm**)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ELuisMeza/shop-co-frontend.git
cd front
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
VITE_API_URL_BACK=http://localhost:3000
VITE_CLIENT_PAYPAL=tu_codigo_de_cliente
```
> **Nota:** 
> - Ajusta `VITE_API_URL_BACK` según la configuración de tu backend.
> - Reemplaza `tu_codigo_de_cliente` con tu código de cliente de PayPal real.

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Hot Module Replacement (HMR)
- `npm run build` - Compila la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura por capas con separación de responsabilidades:

```
src/
├── components/          # Componentes reutilizables
│   ├── home/           # Componentes específicos de la página de inicio
│   ├── orders/         # Componentes relacionados con pedidos
│   ├── products/       # Componentes de productos
│   ├── seller/         # Componentes del dashboard de vendedor
│   └── siging/         # Formularios de registro
├── hooks/              # Custom hooks para lógica reutilizable
├── lib/                # Configuraciones y constantes
│   ├── routes.tsx      # Configuración de rutas
│   ├── roles.ts        # Definición de roles
│   └── navItems.tsx    # Items de navegación
├── pages/              # Componentes de página (views)
├── services/           # Servicios de API
│   ├── api.service.ts  # Cliente Axios configurado
│   ├── cart.service.ts
│   ├── login.service.ts
│   ├── orders.service.ts
│   ├── product.service.ts
│   ├── seller.service.ts
│   └── users.service.ts
├── stores/             # Estado global con Zustand
│   └── user.store.ts   # Store de autenticación y usuario
├── types/              # Definiciones de tipos TypeScript
├── utils/              # Funciones utilitarias
└── App.tsx             # Componente raíz
```

### Patrones Arquitectónicos

#### 1. **Capa de Servicios**
Los servicios encapsulan toda la lógica de comunicación con la API. Cada servicio corresponde a un dominio de negocio:
- `api.service.ts`: Cliente Axios centralizado con interceptores para autenticación
- Servicios específicos: `cart.service.ts`, `product.service.ts`, etc.

**Características:**
- Interceptores para agregar tokens de autenticación automáticamente
- Manejo centralizado de errores (401 = logout automático)
- Soporte para FormData en peticiones

#### 2. **Custom Hooks**
Los hooks encapsulan lógica de negocio y estado local:
- `useGetProducts.ts`, `useGetCartItems.ts`, etc. - Hooks para fetching de datos
- `useDebounce.ts` - Hook para optimizar búsquedas
- `useConfirmPayment.ts` - Lógica de confirmación de pago

#### 3. **Gestión de Estado**
- **Zustand**: Para estado global (autenticación, usuario)
- **React Hook Form**: Para estado de formularios
- **Estado local**: Para estado específico de componentes

#### 4. **Rutas Protegidas**
El sistema implementa dos tipos de rutas protegidas:
- `ProtectedRoute`: Redirige usuarios autenticados (para login/signup)
- `UserProtectedRoute`: Protege rutas según rol (buyer/seller)

#### 5. **Tipado Fuerte**
TypeScript se utiliza en toda la aplicación con tipos definidos en `/types`:
- `user.types.ts` - Tipos de usuario y autenticación
- `product.types.ts` - Tipos de productos
- `orders.types.ts` - Tipos de pedidos
- `cart.types.ts` - Tipos de carrito

## 🔐 Autenticación y Autorización

### Flujo de Autenticación

1. **Login/Registro**: El usuario se autentica mediante `LoginService`
2. **Almacenamiento**: El token y datos del usuario se guardan en Zustand con persistencia en localStorage
3. **Interceptores**: Axios agrega automáticamente el token en cada petición
4. **Expiración**: Si el servidor responde 401, se ejecuta logout automático
5. **Persistencia**: Los datos se persisten en localStorage con validación de expiración (1 día)

### Roles del Sistema

- **buyer**: Usuario comprador - Puede ver productos, agregar al carrito, realizar pedidos
- **seller**: Usuario vendedor - Puede gestionar productos, ver pedidos, dashboard
- **all**: Rutas accesibles para todos los usuarios 

## 🛣️ Estructura de Rutas

```
/                    → Página de inicio (pública)
/login               → Login (protegida si ya está autenticado)
/signup              → Registro (protegida si ya está autenticado)
/store               → Tienda principal (pública)
/store/product/:id   → Detalles de producto (pública)
/buyer/cart          → Carrito de compras (requiere rol buyer)
/buyer/confirm-order → Confirmación de pago (requiere rol buyer)
/buyer/my-orders     → Mis pedidos como comprador (requiere rol buyer)
/seller/dashboard    → Dashboard de vendedor (requiere rol seller)
/seller/my-orders    → Pedidos del vendedor (requiere rol seller)
/user/config         → Configuración de usuario (requiere autenticación)
```

## 🎨 Estilos

El proyecto utiliza **Tailwind CSS 4.1.16** con el plugin de Vite para estilos. Los estilos globales se encuentran en `src/index.css`.

## 📦 Build de Producción

Para generar la build de producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`. Para previsualizar la build:

```bash
npm run preview
```

## 🔍 Linting

El proyecto utiliza ESLint con configuración moderna. Para verificar el código:

```bash
npm run lint
```

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL_BACK` | URL base del backend API | `http://localhost:3000` |
| `VITE_CLIENT_PAYPAL` | Código de cliente de PayPal para integración de pagos | `tu_codigo_de_cliente` |

> **Importante**: 
> - Todas las variables de entorno en Vite deben comenzar con `VITE_` para ser accesibles en el código del cliente.
> - Asegúrate de crear el archivo `.env` en la raíz del proyecto antes de iniciar la aplicación.
> - Para producción, configura estas variables en tu plataforma de despliegue (Vercel, Netlify, etc.).

## 📝 Convenciones de Código

- **Componentes**: PascalCase (ej: `ProductCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (ej: `useGetProducts.ts`)
- **Servicios**: PascalCase con sufijo `Service` (ej: `ProductService`)
- **Tipos**: PascalCase con prefijo `Type` (ej: `TypeUser`)
- **Utilidades**: camelCase (ej: `formatPrice.ts`)

## 🚨 Manejo de Errores

- Los errores de API se manejan en los servicios y se propagan a los componentes
- Las notificaciones se muestran usando `react-hot-toast`
- Los errores 401 (no autorizado) ejecutan logout automático
- Los errores de red se manejan con mensajes amigables al usuario

## 🔄 Flujo de Datos

1. **Componente** → Llama a un **Hook** o **Servicio**
2. **Hook/Servicio** → Realiza petición HTTP mediante `apiService`
3. **apiService** → Agrega token automáticamente (interceptor)
4. **Backend** → Responde con datos
5. **Hook/Servicio** → Procesa respuesta y actualiza estado
6. **Componente** → Se re-renderiza con nuevos datos

## 📚 Dependencias Principales

### Producción
- `react` / `react-dom` - Framework UI
- `react-router-dom` - Enrutamiento
- `zustand` - Estado global
- `axios` - Cliente HTTP
- `react-hook-form` - Formularios
- `react-hot-toast` - Notificaciones
- `tailwindcss` - Estilos
- `motion` - Animaciones
- `lucide-react` - Iconos

### Desarrollo
- `typescript` - Tipado estático
- `vite` - Build tool
- `@vitejs/plugin-react-swc` - Plugin React con SWC
- `eslint` - Linter
- `typescript-eslint` - Reglas ESLint para TypeScript

---

## 🐳 Despliegue con Docker

El proyecto incluye configuración completa para desplegar con Docker.

### Requisitos

- **Docker** >= 20.x
- **Docker Compose** >= 2.x

### Archivos de Docker

| Archivo | Descripción |
|---------|-------------|
| `Dockerfile` | Build multi-stage (Node.js + Nginx) |
| `docker-compose.yml` | Orquestación de servicios |
| `.dockerignore` | Archivos excluidos del contexto |
| `nginx.conf` | Configuración del servidor web |

### Despliegue Rápido

1. **Configura las variables de entorno** creando un archivo `.env`:

```env
VITE_API_URL_BACK=http://tu-backend-api.com
VITE_CLIENT_PAYPAL=tu_codigo_de_cliente_paypal
```

2. **Construye y ejecuta el contenedor**:

```bash
docker-compose up --build
```

3. **Accede a la aplicación**: http://localhost:8080

### Comandos Docker Útiles

```bash
# Construir y ejecutar
docker-compose up --build

# Ejecutar en segundo plano (detached)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Detener contenedores
docker-compose down

# Reconstruir sin cache
docker-compose build --no-cache

# Ver contenedores en ejecución
docker-compose ps

# Reiniciar el servicio
docker-compose restart
```

### Build Manual con Docker

Si prefieres usar Docker directamente sin Docker Compose:

```bash
# Construir la imagen
docker build \
  --build-arg VITE_API_URL_BACK=http://tu-backend-api.com \
  --build-arg VITE_CLIENT_PAYPAL=tu_codigo_paypal \
  -t shop-co-frontend .

# Ejecutar el contenedor
docker run -d -p 8080:80 --name shop-co-frontend shop-co-frontend

# Detener el contenedor
docker stop shop-co-frontend

# Eliminar el contenedor
docker rm shop-co-frontend
```

### Cambiar el Puerto

Para usar un puerto diferente, modifica `docker-compose.yml`:

```yaml
ports:
  - "3000:80"   # Cambia 3000 por el puerto deseado
```

O con Docker directamente:

```bash
docker run -d -p 3000:80 shop-co-frontend
```

### Configuración de Nginx

El archivo `nginx.conf` incluye:

- ✅ Soporte para SPA (Single Page Application) con `try_files`
- ✅ Compresión gzip para mejor rendimiento
- ✅ Cache de assets estáticos (1 año)
- ✅ Headers de seguridad (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

### Variables de Entorno en Docker

> ⚠️ **Importante**: Las variables de Vite (`VITE_*`) se incrustan en el código durante el **build**, no en tiempo de ejecución. Por eso se pasan como `build args` en el Dockerfile.

| Variable | Descripción | Obligatoria |
|----------|-------------|-------------|
| `VITE_API_URL_BACK` | URL del backend API | ✅ Sí |
| `VITE_CLIENT_PAYPAL` | Client ID de PayPal | ✅ Sí |

### Despliegue en Producción

Para desplegar en un servidor de producción:

1. **Sube los archivos** al servidor:
   - `Dockerfile`
   - `docker-compose.yml`
   - `nginx.conf`
   - `.dockerignore`
   - Todo el código fuente

2. **Configura las variables de entorno** en el archivo `.env`

3. **Ejecuta**:
```bash
docker-compose up -d --build
```

4. **Configura un reverse proxy** (opcional) como Traefik o Nginx para SSL/TLS

### Estructura Docker

```
front/
├── Dockerfile           # Build multi-stage
├── docker-compose.yml   # Orquestación
├── .dockerignore        # Exclusiones
├── nginx.conf           # Config del servidor
├── .env                 # Variables de entorno (crear manualmente)
└── src/                 # Código fuente
```

### Solución de Problemas

**Error: Puerto en uso**
```bash
# Detén el contenedor anterior
docker-compose down
# O cambia el puerto en docker-compose.yml
```

**Error: Docker daemon no está corriendo**
```bash
# Windows: Abre Docker Desktop
# Linux: sudo systemctl start docker
```

**Error: Permisos denegados**
```bash
# Linux: Agrega tu usuario al grupo docker
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a iniciar
```

**Ver logs de errores**
```bash
docker-compose logs frontend
```