# 🎵 Soundify - Music Streaming App

Una aplicación de streaming de música moderna construida con React Native, Expo y NativeWind, que replica la experiencia de Spotify con validación robusta y una interfaz elegante.

<div align="center">
  
  <!-- Opción 1: Si subiste a assets/ -->
  ![App Demo](./assets/images/demo.gif)
  
  <!-- Opción 2: Si usas Imgur (reemplaza con tu URL) -->
  <!-- ![App Demo](https://i.imgur.com/TU_CODIGO.gif) -->
  
  *Demo de la aplicación mostrando login, navegación y funcionalidades principales*
  
</div>

## ✨ Características

- 🔐 **Sistema de Autenticación Completo**
  - Login con validación de email y contraseña
  - Registro con validación en tiempo real
  - Validación robusta usando Zod schemas
  - Mensajes de error amigables

- 🎨 **Interfaz Moderna**
  - Diseño dark mode con gradientes
  - Animaciones suaves y transiciones
  - Componentes reutilizables
  - Estilizado con NativeWind (Tailwind CSS)

- 📱 **Navegación Intuitiva**
  - Home con álbumes populares y reproducciones recientes
  - Biblioteca personal con playlists
  - Perfil de usuario con estadísticas
  - Bottom navigation bar

- 🛡️ **Validación de Formularios**
  - Email: formato válido, dominio verificado, username mínimo
  - Password: 8+ caracteres, mayúscula, minúscula, número, carácter especial
  - Indicadores visuales de fortaleza de contraseña
  - Validación en tiempo real con feedback

## 🚀 Tecnologías

- **Framework**: React Native + Expo
- **Routing**: Expo Router (file-based routing)
- **Estilos**: NativeWind (Tailwind CSS para React Native)
- **Validación**: Zod
- **TypeScript**: Tipado completo
- **Animaciones**: React Native Animated API

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/soundify-app.git
cd soundify-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar la aplicación**
```bash
# Desarrollo con Expo
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📂 Estructura del Proyecto

```
soundify-app/
├── app/                      # Pantallas (file-based routing)
│   ├── index.tsx            # Login
│   ├── register.tsx         # Registro
│   ├── home.tsx             # Home/Dashboard
│   ├── library.tsx          # Biblioteca
│   ├── profile.tsx          # Perfil
│   ├── error405.tsx         # Error personalizado
│   └── layout.tsx           # Layout principal
├── components/
│   └── ui/                  # Componentes reutilizables
│       ├── EmailInput.tsx   # Input de email con validación
│       ├── PasswordInput.tsx # Input de contraseña con fortaleza
│       ├── SimplePasswordInput.tsx # Password simple para login
│       └── EmailUtils.ts    # Utilidades para emails
├── lib/
│   ├── schemas/             # Esquemas de validación
│   │   └── LoginValidation.ts
│   └── constants/           # Constantes y mensajes
│       └── ErrorMessages.ts
├── assets/                  # Imágenes e iconos
└── global.css              # Estilos globales de Tailwind
```

## 🎯 Características Principales

### 1. Sistema de Validación

La aplicación implementa un sistema robusto de validación usando **Zod** schemas:

```typescript
// Email validation
const emailSchema = z
  .string()
  .min(1, 'REQUIRED')
  .email('INVALID_FORMAT')
  .min(5, 'TOO_SHORT')
  .refine(hasValidUsername, { message: 'USERNAME_TOO_SHORT' })
  .refine(isValidEmailDomain, { message: 'INVALID_DOMAIN' });

// Password validation
const passwordSchema = z
  .string()
  .min(8, 'TOO_SHORT')
  .regex(/[A-Z]/, 'NO_UPPERCASE')
  .regex(/[a-z]/, 'NO_LOWERCASE')
  .regex(/[0-9]/, 'NO_NUMBER')
  .regex(/[^A-Za-z0-9]/, 'NO_SPECIAL');
```

### 2. Componentes UI Personalizados

- **EmailInput**: Validación en tiempo real con feedback visual
- **PasswordInput**: Indicador de fortaleza y requisitos de seguridad
- **SimplePasswordInput**: Versión simplificada para login

### 3. Arquitectura de Código Limpio

```
Separación de responsabilidades:
- Schemas (validación) ↔ Components (UI) ↔ Constants (mensajes)
- Lógica de negocio separada de la presentación
- Componentes reutilizables y escalables
```

## 📝 Flujo de Usuario

1. **Login/Register**: El usuario puede iniciar sesión o crear una cuenta nueva
2. **Validación**: Todos los campos son validados en tiempo real
3. **Home**: Acceso a álbumes populares y reproducciones recientes
4. **Library**: Gestión de playlists personales
5. **Profile**: Visualización de estadísticas y configuración

## 🧪 Casos de Prueba

### Email Validation
- ✅ Emails válidos: `usuario@gmail.com`, `test@empresa.com`
- ❌ Emails inválidos: `user`, `@gmail.com`, `test@.com`

### Password Validation
- ✅ Contraseñas válidas: `Password123!`, `MyP@ss2024`
- ❌ Contraseñas inválidas: `password` (sin mayúscula), `PASSWORD` (sin minúscula)

## 🔧 Configuración

El proyecto usa **Expo** con las siguientes configuraciones:

```json
{
  "expo": {
    "name": "soundify",
    "slug": "soundify",
    "platforms": ["ios", "android", "web"],
    "plugins": ["expo-router"]
  }
}
```

## 📱 Compatibilidad

- ✅ iOS 13+
- ✅ Android 6.0+
- ✅ Web (Progressive Web App)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- Diseño inspirado en Spotify
- Iconos y emojis nativos
- Comunidad de Expo y React Native

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
