# EspecializacionReactTsTwAi

Programa de especialización en desarrollo de interfaces modernas con React, TypeScript, Tailwind y desarrollo asistido con IA

---

## 🚀 Crear un Proyecto React + TypeScript con Vite

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm, yarn o pnpm

### Pasos de Instalación

#### 1. Crear el proyecto

```bash
# Con npm
npm create vite@latest nombre-proyecto -- --template react-ts

# Con yarn
yarn create vite nombre-proyecto --template react-ts

# Con pnpm
pnpm create vite nombre-proyecto --template react-ts
```

#### 2. Navegar al directorio del proyecto

```bash
cd nombre-proyecto
```

#### 3. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

#### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

---

## 📋 Comandos Fundamentales

| Comando           | Descripción                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo en `http://localhost:5173` |
| `npm run build`   | Compila el proyecto para producción en la carpeta `dist/`   |
| `npm run preview` | Previsualiza la build de producción localmente              |
| `npm run lint`    | Ejecuta ESLint para verificar el código                     |

---

## 📁 Estructura del Proyecto

```
nombre-proyecto/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🔧 Archivos de Configuración Importantes

### `vite.config.ts`

Configuración principal de Vite (plugins, alias, servidor dev, etc.)

### `tsconfig.json`

Configuración de TypeScript para el proyecto

### `package.json`

Dependencias y scripts del proyecto

---

## 📦 Instalación de Dependencias Adicionales Comunes

```bash
# React Router
npm install react-router-dom

# Axios para peticiones HTTP
npm install axios

# Estado global con Zustand
npm install zustand

# Formularios con React Hook Form
npm install react-hook-form

# Iconos con Lucide React
npm install lucide-react

# Iconos con Lucide React
npm install react-router-dom
```

---

## 💡 Tips Útiles

1. **Hot Module Replacement (HMR)**: Vite incluye HMR por defecto, los cambios se reflejan instantáneamente
2. **Path Aliases**: Configura `@/` para imports más limpios en `vite.config.ts` y `tsconfig.json`
3. **Variables de Entorno**: Usa archivos `.env` con prefijo `VITE_` para variables públicas

```typescript
// Ejemplo de variable de entorno
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔗 Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)

---

## 🎓 Sesion2: Pantalla Banking Sin Estilos + Tailwind

Objetivo de clase: partir de una UI sin estilos y luego estilizarla con utilidades de Tailwind para que los alumnos entiendan el antes y el después.

### 1. Instalar Tailwind en Sesion2

```bash
cd Sesion2
npm install -D tailwindcss @tailwindcss/postcss postcss
```

### 3. Configurar PostCSS (Tailwind v4)

Crea `Sesion2/postcss.config.js` con este contenido:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 4. Cargar Tailwind en CSS

En `Sesion2/src/index.css`, reemplaza todo por:

```css
@import "tailwindcss";
```

### 5. Verificar que Tailwind funciona

Asegurate de que `Sesion2/src/main.tsx` importe `./index.css`.

Ejecuta:

```bash
npm run dev
```

Prueba una clase en cualquier JSX, por ejemplo:

```tsx
<h1 className="text-2xl font-bold text-blue-600">Hola Tailwind</h1>
```

### Nota importante sobre `npx tailwindcss init -p`

Si usas Tailwind v4, puede aparecer el error:

`npm error could not determine executable to run`

Esto ocurre porque ese flujo corresponde a Tailwind v3.

Si quieres usar exactamente el flujo clasico (`init -p`), instala v3:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### 6. Comandos utiles

```bash
npm run dev      # entorno de desarrollo
npm run build    # build de produccion
npm run preview  # vista previa del build
npm run lint     # linting
```

---

## 📡 Sesión 4: Consumo de APIs y TanStack Query

### Instalación

```bash
# Axios - Cliente HTTP
npm install axios

# TanStack Query (React Query)
npm install @tanstack/react-query @tanstack/react-query-devtools

# JSON Server - API REST local para desarrollo
npm install -D json-server
```

### JSON Server (API REST local)

Servidor REST completo en segundos para desarrollo y pruebas.

**1. Crear `db.json` en la raíz del proyecto:**

```json
{
  "posts": [
    { "id": 1, "title": "Primer post", "body": "Contenido" },
    { "id": 2, "title": "Segundo post", "body": "Más contenido" }
  ]
}
```

**2. Script en package.json:**

```json
"scripts": {
  "server": "json-server db.json --port 3001"
}
```

**3. Ejecutar (2 terminales):**

```bash
# Terminal 1 - API
npm run server

# Terminal 2 - App React
npm run dev
```

La API queda disponible en `http://localhost:3001/posts` con GET, POST, PUT, DELETE reales.

### Conceptos Clave

#### Fetch vs Axios

| Característica              | Fetch       | Axios               |
| --------------------------- | ----------- | ------------------- |
| Nativo del navegador        | ✅          | ❌                  |
| Parseo JSON automático      | ❌ (manual) | ✅                  |
| Errores HTTP como excepción | ❌ (manual) | ✅                  |
| Interceptores               | ❌          | ✅                  |
| Configuración centralizada  | ❌          | ✅ (`axios.create`) |

#### Cliente HTTP con Bearer Token

```typescript
const http = axios.create({ baseURL: "https://api.ejemplo.com" });

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

#### TanStack Query - Estados de una consulta

- **isLoading**: Primera carga, sin datos en cache
- **isError**: La petición falló
- **isSuccess**: Datos disponibles
- **data.length === 0**: Lista vacía (empty state)

#### TanStack Query - Cache e Invalidación

```typescript
// Consulta con cache
const { data, isLoading, isError } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 1000 * 60, // 1 minuto "fresco"
});

// Mutación con invalidación
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
});
```

#### Estructura recomendada

```
src/
├── ClientHTTP/
│   └── httpClient.ts      # Instancia axios configurada
├── components/
│   ├── FetchVsAxios.tsx   # Comparación Fetch vs Axios
│   └── TanStackQueryDemo.tsx # Estados y cache
```
