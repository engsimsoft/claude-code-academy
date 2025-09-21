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
├── js/                     # Модульная логика (6 файлов)
│   ├── utils.js            # Helper функции
│   ├── navigation.js       # Smooth scroll, header auto-hide
│   ├── lessons.js          # Управление уроками и прогрессом
│   ├── lesson3-interactive.js # Интерактивная логика урока 3
│   ├── terminal-demo.js    # Анимация терминала
│   └── main.js             # Инициализация приложения
└── docs/                   # Документация
```

## 🎨 CSS Architecture

### Design System
- **Claude.ai Authentic** — точная копия фирменного стиля Anthropic
- **CSS Custom Properties** — централизованные переменные в `:root`
- **Modular Structure** — 5 специализированных CSS файлов
- **Critical CSS Inline** — первоначальные стили в `<head>` для быстрой отрисовки

### CSS Modules Structure
```css
/* design-system.css - Основа */
:root {
  --color-bg: #F7F5F3;      /* Фон страницы */
  --color-accent: #FF6B35;   /* Акцентный оранжевый */
  --color-text: #2D1B0E;     /* Основной текст */
  --space-md: 24px;          /* Отступы */
  --border-radius: 8px;      /* Скругления */
}

/* components.css - Компоненты */
.lesson-number {             /* Номера уроков */
  width: 32px; height: 32px; /* Круглые на главной */
  border-radius: 50%;        /* Круглая форма */
}

/* Inline CSS в lesson-*.html - Переопределения */
.lesson-header .lesson-number {
  padding: 8px 16px !important;    /* Прямоугольные в уроках */
  border-radius: 20px !important;  /* Скругленные углы */
  width: auto !important;          /* Автоширина для текста */
}
```

### CSS Specificity Strategy
- **Base styles** в external CSS файлах
- **Page-specific overrides** с `!important` в inline CSS
- **Selector specificity** `.lesson-header .lesson-number` > `.lesson-number`
- **Consistent theming** через CSS Custom Properties

## ⚙️ JavaScript Architecture

### Модульная система
JavaScript разделен на 6 специализированных модулей:

1. **utils.js** — Helper функции, debounce, localStorage utilities
2. **navigation.js** — Smooth scroll, header auto-hide, scroll spy
3. **lessons.js** — Управление уроками, progress tracking, синхронизация
4. **lesson3-interactive.js** — Интерактивная логика урока 3 (12 шагов, @ синтаксис, Git workflow)
5. **terminal-demo.js** — Typing animation, command cycling
6. **main.js** — Инициализация приложения, error handling

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

### Логика расчета прогресса
- **Урок 1:** 8 шагов = 100% (основы Claude Code)
- **Урок 2:** 10 шагов = 100% (естественные команды)
- **Урок 3:** 12 шагов = 100% (работа с проектом, @ синтаксис, Git workflow)
- **Context Restoration:** Восстановление истории терминала при возвращении пользователя

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
