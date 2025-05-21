# BOOK

Una aplicación web moderna para entusiastas de la lectura que permite descubrir, guardar y gestionar sus libros guardados.

## Descripción

Aplicación de Libros es una plataforma que permite a los usuarios explorar libros de diversas categorías, guardar sus favoritos y gestionar sus listas de lectura. Construida con tecnologías modernas que incluyen Next.js, Clerk para autenticación y Supabase para la funcionalidad de base de datos.

## Características

- Autenticación de usuarios y gestión de perfiles
- Exploración y búsqueda de libros
- Organización de libros por categorías
- Guardar libros favoritos en colección personal
- Páginas de perfil de usuario
- Diseño responsivo para todos los dispositivos

## Tecnologías

- Next.js 15 con App Router
- React 19
- TypeScript
- Clerk para autenticación
- Supabase para base de datos

## Despliegue

### Requisitos previos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Clerk (para autenticación)
- Cuenta de Supabase (para base de datos)

### Instalación

1. Clonar el repositorio:

   ```
   git clone https://github.com/katy-paola/book-hackaton-clerk.git
   cd book-hackaton-clerk
   ```

2. Instalar dependencias:

   ```
   npm install
   ```

3. Configurar variables de entorno:
   Crear un archivo `.env` en el directorio raíz con las siguientes variables:

   ```
   # Autenticación de Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publica
   CLERK_SECRET_KEY=tu_clave_secreta
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio_de_supabase
   ```

4. Ejecutar el servidor de desarrollo:

   ```
   npm run dev
   ```

5. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

### Despliegue en producción

1. Construir la aplicación:

   ```
   npm run build
   ```

2. Iniciar el servidor de producción:
   ```
   npm start
   ```

## Diseño

[Enlace al diseño en Figma](https://www.figma.com/design/C7ZgnEHXqpqy5pCuNeBZKx/BooK---Hackaton-Clerk?node-id=27-683&t=D0ft8M5OFdQuxyb6-1)

## Demo en vivo

[Ver la aplicación en vivo](https://book-hackaton-clerk.vercel.app/)

## Autores

- [Katy Barboza](https://github.com/katy-paola)
- [Andrés Vizcaíno](https://github.com/pipegoods)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.
