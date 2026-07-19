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
