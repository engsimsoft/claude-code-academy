# 🏗 Architecture

**Claude Code Academy** — техническая архитектура и принципы дизайна

## 🎯 Архитектурные принципы

### Основные принципы
- **Модульность** — четкое разделение ответственности
- **Performance First** — оптимизированная загрузка и отзывчивость
- **Progressive Enhancement** — работает везде, лучше там где поддерживается
- **Accessibility** — доступно для всех пользователей
- **Vanilla Tech Stack** — минимальные зависимости

### Архитектурный стиль
**Modular Static Site** — модульные CSS/JS + статический HTML

## 🛠 Технологический стек

### Frontend
- **HTML5** — семантическая разметка с ARIA атрибутами
- **CSS3** — Custom Properties, Grid, Flexbox, модульная архитектура
- **JavaScript ES6+** — нативные API, EventListeners, DOM manipulation
- **Design System** — точная копия Claude.ai фирменного стиля

### Infrastructure
- **Vercel** — статический хостинг с автоматическим деплоем
- **GitHub** — версионирование и CI/CD pipeline
- **Global CDN** — быстрая доставка контента по всему миру

## 📁 Структура проекта

```text
claude-code-academy/
├── index.html              # Главная страница (345 строк)
├── lesson-*.html           # Интерактивные уроки (4 файла)
├── css/                    # Модульные стили (5 файлов)
│   ├── design-system.css   # CSS переменные и базовые стили
│   ├── layout.css          # Grid/Flexbox системы
│   ├── components.css      # Кнопки, карточки, компоненты
│   ├── sections.css        # Секции страниц
│   └── animations.css      # Hover эффекты и анимации
├── js/                     # Модульная логика (5 файлов)
│   ├── utils.js            # Helper функции
│   ├── navigation.js       # Smooth scroll, header auto-hide
│   ├── lessons.js          # Управление уроками и прогрессом
│   ├── terminal-demo.js    # Анимация терминала
│   └── main.js             # Инициализация приложения
└── docs/                   # Документация
```

## 🎨 CSS Architecture

### Модульная система
Стили разделены на 5 специализированных модулей:

1. **design-system.css** — CSS Custom Properties, цветовая палитра, типографика
2. **layout.css** — Grid системы, контейнеры, responsive breakpoints
3. **components.css** — Переиспользуемые компоненты (кнопки, карточки)
4. **sections.css** — Стили для конкретных секций страниц
5. **animations.css** — Hover эффекты, transitions, keyframes

### Claude Design System
```css
:root {
  /* Цветовая палитра */
  --color-bg: #F7F5F3;           /* Кремовый фон */
  --color-text: #2D1B0E;         /* Темно-коричневый текст */
  --color-accent: #FF6B35;       /* Оранжевый акцент */
  --color-button: #1a1a1a;       /* Черные кнопки */
  --color-card: #ffffff;         /* Белые карточки */
  
  /* Типографика */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  
  /* Компоненты */
  --border-radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
}
```

## ⚙️ JavaScript Architecture

### Модульная система
JavaScript разделен на 5 специализированных модулей:

1. **utils.js** — Helper функции, debounce, localStorage utilities
2. **navigation.js** — Smooth scroll, header auto-hide, scroll spy
3. **lessons.js** — Управление уроками, progress tracking, синхронизация
4. **terminal-demo.js** — Typing animation, command cycling
5. **main.js** — Инициализация приложения, error handling

### Пример модуля
```javascript
// js/navigation.js
const Navigation = {
  init() {
    this.setupSmoothScroll();
    this.setupHeaderAutoHide();
  },
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll);
    });
  }
};
```

## 📱 Responsive Design

### Breakpoint система
```css
/* Mobile First подход */
/* Base: 320px+ (mobile) */

@media (min-width: 768px) {
  /* Tablet: 768px+ */
}

@media (min-width: 1200px) {
  /* Desktop: 1200px+ */
}
```

### Grid система
```css
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}
```

## ⚡ Performance Architecture

### Loading Strategy
1. **Critical CSS inline** — мгновенный first paint (3KB)
2. **Resource preloading** — параллельная загрузка CSS/JS модулей
3. **Deferred JavaScript** — non-blocking script execution
4. **HTTP/2 multiplexing** — эффективная загрузка 11 ресурсов

### Оптимизации
- **System fonts** — мгновенная загрузка типографики
- **No external dependencies** — нет блокирующих запросов
- **Minified resources** — сжатие CSS/JS
- **Browser caching** — модули кешируются отдельно

### Метрики производительности
- **LCP**: < 1.0s (Largest Contentful Paint)
- **CLS**: 0.00 (Cumulative Layout Shift)
- **FID**: < 50ms (First Input Delay)
- **Total size**: ~25KB

## 🧭 Navigation System

### Унифицированная навигация
Консистентная система навигации на всех страницах:

**Главная страница:**
```
[⚡ Claude Code Academy] | [Проблема] [Решение] [Уроки] [Демо]
```

**Страницы уроков:**
```
[⚡ Claude Code Academy] | [← Все уроки] | [Прогресс]
```

### Принципы навигации
- **Простота** — минимальное количество элементов
- **Консистентность** — одинаковая структура везде
- **Отсутствие дублирования** — избегание повторения функций главной страницы

## 💾 Data Management

### Progress Tracking
```javascript
// Сохранение прогресса урока
const saveProgress = (lessonId, step, total) => {
  const progress = {
    currentStep: step,
    totalSteps: total,
    percentage: Math.round((step / total) * 100),
    lastUpdated: new Date().toISOString()
  };
  
  localStorage.setItem(`lesson${lessonId}-progress`, JSON.stringify(progress));
};
```

### Real-time синхронизация
- Автоматическое обновление прогресса каждые 2 секунды
- Синхронизация между уроками и главной страницей
- Сохранение состояния в localStorage

## 🔮 Future Architecture

### Планируемые улучшения
- **Backend API** — Node.js/Python для реальной интеграции с Claude Code
- **Database** — Supabase/PlanetScale для пользовательских данных
- **Authentication** — Auth0/Firebase для авторизации
- **PWA** — Progressive Web App возможности

### Масштабирование
- **Component system** — переход к компонентной архитектуре
- **State management** — централизованное управление состоянием
- **Testing** — unit и integration тесты
- **CI/CD** — расширенный pipeline с тестированием

---

*Архитектура спроектирована для enterprise-level качества с фокусом на производительность и maintainability*
