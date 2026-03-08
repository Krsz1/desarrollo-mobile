# Challenge 03 - Task Manager

## Configuración Inicial

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm run dev
```

3. **Ejecutar pruebas:**
```bash
npm run test
```

4. **Build para producción:**
```bash
npm run build
```

## Estructura del Proyecto

```
challenge-03/
├── .vscode/              # Configuración de VS Code
├── android/              # Configuración de Android (Capacitor)
├── cypress/              # Pruebas end-to-end
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── public/               # Archivos estáticos
├── src/                  # Código fuente
│   ├── components/       # Componentes reutilizables
│   ├── pages/           # Páginas de la aplicación
│   ├── App.tsx          # Componente raíz
│   ├── main.tsx         # Punto de entrada
│   ├── App.css          # Estilos principales
│   └── index.css        # Estilos globales
├── .browserslistrc      # Configuración de navegadores soportados
├── capacitor.config.ts  # Configuración de Capacitor
├── cypress.config.ts    # Configuración de Cypress
├── eslint.config.js     # Configuración de ESLint
├── ionic.config.json    # Configuración de Ionic
├── index.html           # Archivo HTML principal
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
├── tsconfig.node.json   # Configuración de TypeScript para herramientas
└── vite.config.ts       # Configuración de Vite
```

## Tecnologías Utilizadas

- **Ionic 7** - Framework para aplicaciones móviles
- **React 18** - Biblioteca UI
- **TypeScript** - Lenguaje tipado
- **Vite** - Herramienta de construcción
- **React Router 5** - Enrutamiento
- **Cypress** - Testing E2E
- **ESLint** - Linting
- **Capacitor** - Acceso a APIs nativas

## Características

✅ Administrador de tareas completo
✅ Persistencia en localStorage
✅ Interfaz responsiva
✅ Tests E2E con Cypress
✅ Configuración para mobile (Capacitor)

---

**Challenge 03 - Desarrollado con Ionic, React y TypeScript** 🚀
