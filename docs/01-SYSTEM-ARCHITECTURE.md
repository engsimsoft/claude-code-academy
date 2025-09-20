# 🏗 System Architecture

**Проект:** Claude Code Academy
**Версия:** 1.0.0
**Дата:** 2024-09-20

## 🎯 Архитектурный обзор

### Принципы дизайна
- **Простота превыше всего** — минимальная сложность для MVP
- **Performance First** — быстрая загрузка и отзывчивость
- **Progressive Enhancement** — работает везде, лучше там где поддерживается
- **Accessibility** — доступно для всех пользователей

### Архитектурный стиль
**Jamstack** — статические файлы + JavaScript + API (в будущем)

## 🏛 Высокоуровневая архитектура

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  Static HTML + CSS + Vanilla JS                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │   Header    │ │   Sections  │ │   Footer    │               │
│  │             │ │             │ │             │               │
│  │ Navigation  │ │ Interactive │ │   Links     │               │
│  │   Logo      │ │  Content    │ │ Copyright   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         STATIC HOSTING                          │
├─────────────────────────────────────────────────────────────────┤
│  Vercel CDN                                                     │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Global Edge Network                                        │ │
│  │  - Automatic HTTPS                                          │ │
│  │  - Gzip Compression                                         │ │
│  │  - Browser Caching                                          │ │
│  │  - Image Optimization                                       │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FUTURE INTEGRATIONS                        │
├─────────────────────────────────────────────────────────────────┤
│  Claude Code API (Planned)                                     │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  - Authentication                                           │ │
│  │  - Interactive Terminal                                     │ │
│  │  - Progress Tracking                                        │ │
│  │  │  User Database                                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🧩 Компонентная архитектура

### Frontend Components (Current)

```
index.html
├── Header Component
│   ├── Logo + Brand Name
│   ├── Navigation Menu
│   └── Responsive Mobile Menu (Hidden)
├── Hero Section
│   ├── Main Title + Subtitle
│   ├── CTA Button
│   └── Background Gradient
├── Problem Section
│   ├── Section Title
│   ├── Problem Cards Grid
│   └── Card Hover Effects
├── Solution Section
│   ├── Features List
│   ├── Icon Components
│   └── Feature Descriptions
├── Lessons Section
│   ├── Lesson Cards Grid
│   ├── Progress Bars
│   ├── Interactive Click Handlers
│   └── Progress State Management
├── Demo Section
│   ├── Terminal Simulator
│   ├── Typing Animation
│   ├── Command Examples
│   └── Claude Response Simulation
└── Footer Component
    ├── Links Grid
    ├── Social Links
    └── Copyright Info
```

## 🎨 Design System Architecture

### CSS Architecture (ITCSS inspired)

```css
/* 1. Settings */
:root {
  /* Color Palette */
  --color-bg: #F7F5F3;
  --color-text: #2D1B0E;
  --color-accent: #FF6B35;
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont;
  /* Spacing */
  --space-sm: 8px;
  --space-md: 16px;
}

/* 2. Tools - Mixins would go here (N/A for vanilla CSS) */

/* 3. Generic */
* { box-sizing: border-box; }
body { margin: 0; padding: 0; }

/* 4. Elements */
h1, h2, h3 { font-weight: 700; }
a { text-decoration: none; }

/* 5. Objects - Layout patterns */
.container { max-width: 1200px; margin: 0 auto; }
.grid { display: grid; gap: 32px; }

/* 6. Components - UI components */
.header { /* header styles */ }
.hero { /* hero styles */ }
.button { /* button styles */ }

/* 7. Utilities - Helpers */
.text-center { text-align: center; }
.mb-24 { margin-bottom: 24px; }
```

### Component State Management

```javascript
// Simple state management for interactive components
const AppState = {
  // Lesson progress tracking
  lessons: [
    { id: 1, progress: 100, completed: true },
    { id: 2, progress: 75, completed: false },
    { id: 3, progress: 40, completed: false },
    { id: 4, progress: 0, completed: false }
  ],

  // Terminal demo state
  terminal: {
    currentCommand: 0,
    commands: ['cd projects', 'git status', 'npm install', 'python main.py'],
    isTyping: false
  },

  // UI state
  ui: {
    headerVisible: true,
    lastScrollY: 0
  }
};
```

## 📱 Responsive Architecture

### Breakpoint System

```css
/* Mobile First Approach */
/* Base styles: 320px+ (mobile) */

@media (min-width: 768px) {
  /* Tablet: 768px+ */
  .hero-title { font-size: 48px; }
  .nav { display: flex; }
}

@media (min-width: 1200px) {
  /* Desktop: 1200px+ */
  .hero-title { font-size: 64px; }
  .container { max-width: 1200px; }
}
```

### Grid System

```css
/* Adaptive Grid System */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.grid-lessons {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

## ⚡ Performance Architecture

### Loading Strategy
1. **Critical CSS** — встроен в `<head>`
2. **Non-critical JavaScript** — загружается асинхронно
3. **Images** — оптимизированы и сжаты
4. **Fonts** — system fonts для мгновенной загрузки

### Caching Strategy
```javascript
// Browser caching через HTTP headers (Vercel автоматически)
{
  "Cache-Control": "public, max-age=31536000, immutable", // Static assets
  "Cache-Control": "public, max-age=0, must-revalidate"   // HTML
}
```

## 🔮 Future Architecture (v2.0)

### Backend Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  Next.js + React + TypeScript                                  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                │
│  Vercel Serverless Functions                                   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Claude Code   │ │   User Auth    │ │   Progress     │
│     API        │ │   (Auth0)      │ │   Database     │
│                │ │                │ │   (Supabase)   │
└────────────────┘ └────────────────┘ └────────────────┘
```

### Data Flow Architecture (Future)

```
User Action → Frontend → API Gateway → Claude Code API → Response
     ↓                                         ↓
Progress Update ← Database ← Progress Service ← Command Execution
```

## 🛡 Security Architecture

### Current (Static Site)
- ✅ **HTTPS** — принудительно через Vercel
- ✅ **CSP Headers** — Content Security Policy
- ✅ **No sensitive data** — только статические файлы

### Future (с Backend)
- [ ] **Authentication** — JWT токены через Auth0
- [ ] **Rate Limiting** — защита от спама
- [ ] **Input Validation** — санитизация команд
- [ ] **Audit Logging** — логирование действий пользователей

## 📊 Monitoring & Analytics

### Current
- Vercel Analytics — автоматический трекинг
- Core Web Vitals мониторинг

### Planned
- User behavior analytics
- Performance monitoring
- Error tracking (Sentry)
- A/B testing framework

## 🔧 Development Architecture

### Build Process
```bash
# Current (No build needed)
open index.html

# Future (with build)
npm run build     # Build for production
npm run dev       # Development server
npm run test      # Run tests
npm run lint      # Code linting
```

### CI/CD Pipeline (Vercel)
```
GitHub Push → Vercel Build → Deploy to CDN → Cache Invalidation
```

---

**Архитектура спроектирована для максимальной простоты сейчас и гибкого расширения в будущем.**