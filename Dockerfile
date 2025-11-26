# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Argumentos de build para variables de entorno
ARG VITE_API_URL_BACK
ARG VITE_CLIENT_PAYPAL

# Variables de entorno para Vite
ENV VITE_API_URL_BACK=$VITE_API_URL_BACK
ENV VITE_CLIENT_PAYPAL=$VITE_CLIENT_PAYPAL

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Producción
FROM nginx:alpine

# Copiar los archivos construidos desde el stage de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

