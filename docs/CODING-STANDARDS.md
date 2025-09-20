# 💻 Claude Code Academy - Coding Standards

## 📋 Overview

This document defines technical coding standards for Claude Code Academy. These standards ensure consistent, maintainable, and high-performance code across all development sessions and AI interactions.

---

## 📝 HTML Standards

### 🏗️ Semantic Structure

**✅ DO - Use semantic HTML5 elements:**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Урок 1: Основы Claude Code</title>
</head>
<body>
  <header>
    <nav aria-label="Главная навигация">
      <ul>
        <li><a href="#lessons">Уроки</a></li>
        <li><a href="#tools">Инструменты</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section aria-labelledby="lesson-title">
      <h1 id="lesson-title">Основы работы с файлами</h1>
      <article class="lesson-content">
        <!-- Содержимое урока -->
      </article>
    </section>
  </main>

  <aside class="lesson-sidebar">
    <!-- Дополнительная информация -->
  </aside>

  <footer>
    <!-- Подвал страницы -->
  </footer>
</body>
</html>
```

**❌ DON'T - Avoid div soup:**
```html
<!-- Плохо -->
<div class="header">
  <div class="navigation">
    <div class="menu-item">Главная</div>
  </div>
</div>
<div class="content">
  <div class="lesson">...</div>
</div>
```

### ♿ Accessibility Requirements

**ARIA Labels and Roles:**
```html
<!-- Интерактивные элементы -->
<button aria-label="Запустить терминал" onclick="startTerminal()">
  <svg aria-hidden="true">...</svg>
  Запуск
</button>

<!-- Состояния элементов -->
<div role="tabpanel" aria-expanded="false" aria-labelledby="lesson-tab-1">
  <!-- Содержимое вкладки -->
</div>

<!-- Навигация -->
<nav aria-label="Навигация по урокам">
  <ol>
    <li><a href="lesson-1.html" aria-current="page">Урок 1</a></li>
    <li><a href="lesson-2.html">Урок 2</a></li>
  </ol>
</nav>
```

### 📱 Meta Tags and SEO

**Required meta tags for every page:**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Изучите Claude Code через интерактивные уроки">
  <meta name="keywords" content="Claude Code, обучение, программирование, AI">
  <title>Claude Code Academy - Интерактивные уроки</title>

  <!-- Open Graph для социальных сетей -->
  <meta property="og:title" content="Claude Code Academy">
  <meta property="og:description" content="Изучите Claude Code через практику">
  <meta property="og:type" content="website">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
</head>
```

---

## 🎨 CSS Standards

### 🎯 CSS Custom Properties (Variables)

**✅ DO - Use CSS custom properties:**
```css
:root {
  /* Цвета */
  --color-bg-primary: #F7F5F3;
  --color-accent-primary: #FF6B35;
  --color-text-primary: #2D1B0E;
  --color-surface-primary: #FFFFFF;
  --color-button-primary: #1a1a1a;

  /* Размеры */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Радиусы */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Тени */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 10px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* Переходы */
  --transition-fast: 0.15s ease;
  --transition-smooth: 0.3s ease;

  /* Шрифты */
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
}
```

### 📐 Layout Systems

**CSS Grid для основных layout'ов:**
```css
/* Responsive сетка для карточек уроков */
.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

/* Основной layout страницы */
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

.page-header { grid-area: header; }
.page-main { grid-area: main; }
.page-footer { grid-area: footer; }
```

**Flexbox для компонентов:**
```css
/* Горизонтальное выравнивание */
.button-group {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  justify-content: center;
}

/* Вертикальное выравнивание */
.lesson-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.lesson-card__content {
  flex: 1; /* Займет все доступное пространство */
}

.lesson-card__actions {
  margin-top: auto; /* Прижмется к низу */
}
```

### 📱 Mobile-First Responsive Design

**✅ DO - Mobile-first подход:**
```css
/* Базовые стили для мобильных устройств */
.container {
  padding: var(--spacing-md);
  max-width: 100%;
}

.lesson-card {
  margin-bottom: var(--spacing-md);
}

/* Планшеты (768px+) */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
  }

  .lesson-card {
    margin-bottom: var(--spacing-lg);
  }
}

/* Десктопы (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-xl);
  }

  .lessons-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Большие экраны (1440px+) */
@media (min-width: 1440px) {
  .lessons-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 🎯 Component Patterns

**Кнопки (стандартные стили):**
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-md);

  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: 500;
  text-decoration: none;

  cursor: pointer;
  transition: var(--transition-fast);

  min-height: 44px; /* Accessibility: минимум для touch */
  min-width: 44px;
}

.button--primary {
  background-color: var(--color-button-primary);
  color: #FFFFFF;
}

.button--primary:hover {
  background-color: #333333;
  transform: translateY(-1px);
}

.button--primary:active {
  transform: translateY(0);
}

.button--secondary {
  background-color: transparent;
  color: var(--color-accent-primary);
  border: 2px solid var(--color-accent-primary);
}

.button--secondary:hover {
  background-color: var(--color-accent-primary);
  color: #FFFFFF;
}
```

**Карточки:**
```css
.card {
  background-color: var(--color-surface-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  transition: var(--transition-smooth);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card__header {
  margin-bottom: var(--spacing-md);
}

.card__title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
}

.card__subtitle {
  margin: 0;
  font-size: var(--font-size-sm);
  color: #666666;
}

.card__content {
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}

.card__actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}
```

---

## ⚡ JavaScript Standards

### 🎯 ES6+ Syntax Requirements

**✅ DO - Modern JavaScript patterns:**
```javascript
// Используй const/let вместо var
const CONFIG = {
  animationDuration: 300,
  breakpoints: {
    tablet: 768,
    desktop: 1024
  }
};

let currentLesson = null;

// Стрелочные функции для коротких callback'ов
const lessons = [
  { id: 1, title: 'Основы' },
  { id: 2, title: 'Файлы' }
].filter(lesson => lesson.id > 0);

// Деструктуризация для читаемости
const { animationDuration, breakpoints } = CONFIG;
const { tablet, desktop } = breakpoints;

// Template literals для строк
const createLessonHTML = (lesson) => `
  <div class="lesson-card" data-lesson-id="${lesson.id}">
    <h3 class="lesson-card__title">${lesson.title}</h3>
    <button class="button button--primary" onclick="startLesson(${lesson.id})">
      Начать урок
    </button>
  </div>
`;

// Async/await для асинхронных операций
async function loadLessonData(lessonId) {
  try {
    // Симуляция загрузки данных
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id: lessonId, content: 'Lesson content...' };
  } catch (error) {
    console.error('Ошибка загрузки урока:', error);
    throw error;
  }
}
```

### 🏗️ Module Patterns

**Объектная организация кода:**
```javascript
// Основной модуль управления уроками
const LessonManager = {
  // Приватные переменные через замыкание
  _currentLesson: null,
  _lessons: [],

  // Инициализация
  init() {
    this.loadLessons();
    this.bindEvents();
    this.setupAccessibility();
  },

  // Публичные методы
  async loadLessons() {
    try {
      // Загрузка конфигурации уроков
      this._lessons = await this.fetchLessonsConfig();
      this.renderLessonsGrid();
    } catch (error) {
      this.handleError('Не удалось загрузить уроки', error);
    }
  },

  startLesson(lessonId) {
    const lesson = this._lessons.find(l => l.id === lessonId);
    if (!lesson) {
      this.handleError(`Урок с ID ${lessonId} не найден`);
      return;
    }

    this._currentLesson = lesson;
    this.showLessonModal(lesson);
  },

  // Event handling
  bindEvents() {
    // Event delegation для производительности
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-lesson-start]')) {
        const lessonId = parseInt(e.target.dataset.lessonStart);
        this.startLesson(lessonId);
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._currentLesson) {
        this.closeLessonModal();
      }
    });
  },

  // Error handling
  handleError(message, error = null) {
    console.error(message, error);

    // Показать пользователю дружелюбное сообщение
    this.showNotification(message, 'error');
  }
};
```

### 🎯 Event Handling Best Practices

**Event Delegation:**
```javascript
// ✅ DO - Используй event delegation
document.addEventListener('click', function(e) {
  // Обработка кликов по кнопкам уроков
  if (e.target.matches('.lesson-start-btn')) {
    const lessonId = e.target.dataset.lessonId;
    LessonManager.startLesson(lessonId);
  }

  // Обработка кликов по закрытию модалов
  if (e.target.matches('.modal-close') ||
      e.target.matches('.modal-backdrop')) {
    closeModal();
  }
});

// ❌ DON'T - Не добавляй listener'ы на каждый элемент
document.querySelectorAll('.lesson-start-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Неэффективно для большого количества элементов
  });
});
```

**Debouncing для производительности:**
```javascript
// Utility функция debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Использование для поиска
const searchInput = document.querySelector('#lesson-search');
const debouncedSearch = debounce(function(query) {
  LessonManager.filterLessons(query);
}, 300);

searchInput?.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### 🛡️ Error Handling

**Comprehensive error handling:**
```javascript
// Глобальный обработчик ошибок
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);

  // Отправка ошибки в систему мониторинга (если есть)
  // Показ пользователю дружелюбного сообщения
  showErrorNotification('Что-то пошло не так. Попробуйте обновить страницу.');
});

// Обработка Promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
  e.preventDefault(); // Предотвратить вывод в консоль

  showErrorNotification('Ошибка загрузки данных. Проверьте соединение с интернетом.');
});

// Try-catch для критических операций
async function initializeApp() {
  try {
    await LessonManager.init();
    setupTerminalSimulator();
    enableProgressTracking();
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);

    // Fallback UI
    document.body.innerHTML = `
      <div class="error-state">
        <h1>Ошибка загрузки</h1>
        <p>Не удалось загрузить Claude Code Academy.</p>
        <button onclick="location.reload()" class="button button--primary">
          Обновить страницу
        </button>
      </div>
    `;
  }
}
```

---

## 💬 Commenting Guidelines

### 📝 When to Comment

**✅ DO - Comment complex logic:**
```javascript
// Вычисляем позицию элемента относительно viewport
// для точного позиционирования tooltip'а
function calculateTooltipPosition(trigger, tooltip) {
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Проверяем, поместится ли tooltip справа от trigger'а
  const hasSpaceRight = triggerRect.right + tooltipRect.width < viewportWidth;

  // Проверяем, поместится ли tooltip снизу от trigger'а
  const hasSpaceBelow = triggerRect.bottom + tooltipRect.height < viewportHeight;

  return {
    x: hasSpaceRight ? triggerRect.right : triggerRect.left - tooltipRect.width,
    y: hasSpaceBelow ? triggerRect.bottom : triggerRect.top - tooltipRect.height
  };
}
```

**CSS comments for sections:**
```css
/* =================================
   БАЗОВЫЕ СТИЛИ И СБРОС
   ================================= */

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* =================================
   СИСТЕМА ДИЗАЙНА - ПЕРЕМЕННЫЕ
   ================================= */

:root {
  --color-primary: #FF6B35;
  /* Остальные переменные... */
}

/* =================================
   LAYOUT КОМПОНЕНТЫ
   ================================= */

.container {
  /* Основной контейнер для контента */
}

/* =================================
   UI КОМПОНЕНТЫ
   ================================= */

.button {
  /* Базовые стили кнопок */
}

/* =================================
   УТИЛИТАРНЫЕ КЛАССЫ
   ================================= */

.sr-only {
  /* Скрытие элементов для screen reader'ов */
}
```

### ❌ Don't Over-Comment

**❌ DON'T - Avoid obvious comments:**
```javascript
// Плохо - очевидные комментарии
const button = document.querySelector('button'); // Получаем кнопку
button.addEventListener('click', handleClick); // Добавляем обработчик клика
```

---

## 🚀 Performance Standards

### ⚡ Loading Optimization

**Critical CSS inlining:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Критические стили в head для мгновенного рендеринга -->
  <style>
    /* Критические стили для above-the-fold контента */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background-color: #F7F5F3;
      margin: 0;
    }

    .header, .hero-section {
      /* Стили для видимой части страницы */
    }
  </style>
</head>
<body>
  <!-- Контент -->

  <!-- Некритические стили в конце body -->
  <style>
    /* Стили для остального контента */
    .footer, .modal {
      /* ... */
    }
  </style>
</body>
</html>
```

**JavaScript optimization:**
```javascript
// Используй DocumentFragment для множественных DOM операций
function renderLessons(lessons) {
  const fragment = document.createDocumentFragment();

  lessons.forEach(lesson => {
    const lessonElement = createLessonCard(lesson);
    fragment.appendChild(lessonElement);
  });

  // Один DOM update вместо множественных
  document.querySelector('.lessons-container').appendChild(fragment);
}

// Lazy loading для изображений (если используются)
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}
```

### 🎨 Animation Performance

**Используй transform вместо изменения layout свойств:**
```css
/* ✅ DO - Hardware accelerated animations */
.lesson-card {
  transition: transform 0.3s ease;
}

.lesson-card:hover {
  transform: translateY(-4px) scale(1.02);
}

/* ❌ DON'T - Layout-thrashing animations */
.lesson-card-bad {
  transition: top 0.3s ease, width 0.3s ease;
}

.lesson-card-bad:hover {
  top: -4px;
  width: 102%;
}
```

---

## 📱 Mobile Guidelines

### 👆 Touch Interaction

**Minimum touch target sizes:**
```css
/* Минимум 44px для touch элементов */
.button, .link, .checkbox {
  min-height: 44px;
  min-width: 44px;
}

/* Увеличенные отступы для мобильных */
@media (max-width: 767px) {
  .button {
    padding: 16px 24px;
    font-size: 18px;
  }

  .form-input {
    padding: 16px;
    font-size: 16px; /* Предотвращает zoom в iOS */
  }
}
```

### 📱 Responsive Typography

**Fluid typography:**
```css
/* Адаптивные размеры шрифтов */
.heading-1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

.heading-2 {
  font-size: clamp(1.25rem, 3vw, 2rem);
  line-height: 1.3;
}

.body-text {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}
```

---

## ✅ Quality Checklist

### 🔍 Pre-Commit Checklist

**HTML:**
- [ ] Semantic HTML5 структура
- [ ] Все изображения имеют alt атрибуты
- [ ] ARIA labels для интерактивных элементов
- [ ] Валидная разметка (без ошибок W3C)
- [ ] Meta теги для SEO и responsive

**CSS:**
- [ ] CSS custom properties используются
- [ ] Mobile-first media queries
- [ ] Нет !important (кроме utility классов)
- [ ] Consistent spacing using CSS variables
- [ ] Hover и focus состояния определены

**JavaScript:**
- [ ] ES6+ syntax используется
- [ ] Нет глобальных переменных (кроме необходимых)
- [ ] Error handling реализован
- [ ] Event delegation используется
- [ ] Performance optimizations применены

**Accessibility:**
- [ ] Keyboard navigation работает
- [ ] Screen reader совместимость
- [ ] Color contrast > 4.5:1
- [ ] Focus indicators видимы
- [ ] ARIA labels корректны

**Performance:**
- [ ] Critical CSS inline
- [ ] JavaScript не блокирует рендеринг
- [ ] Images оптимизированы
- [ ] Page load < 3 seconds на 3G
- [ ] Нет layout shift при загрузке

### 🧪 Testing Checklist

**Cross-Browser:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

**Device Testing:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

**Functionality:**
- [ ] Все интерактивные элементы работают
- [ ] Forms отправляются корректно
- [ ] Модальные окна открываются/закрываются
- [ ] Animations smooth и не мешают UX
- [ ] Error states отображаются правильно

---

## 🎯 Success Metrics

### 📊 Code Quality Metrics

**Maintainability:**
- Consistent naming conventions: 100%
- Proper commenting: Critical logic documented
- No duplicate code: DRY principle followed
- Modular structure: Clear separation of concerns

**Performance:**
- Page load time: < 2 seconds
- First Contentful Paint: < 1.5 seconds
- Largest Contentful Paint: < 2.5 seconds
- Cumulative Layout Shift: < 0.1

**Accessibility:**
- WCAG 2.1 AA compliance: 100%
- Keyboard navigation: Full support
- Screen reader compatibility: Verified
- Color contrast: > 4.5:1 ratio

---

*Following these coding standards ensures that every piece of code in Claude Code Academy maintains enterprise-level quality, performance, and accessibility standards. These guidelines work together with the project's backup system and AI-to-AI workflow to create a robust, maintainable codebase.*