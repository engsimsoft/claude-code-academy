# 🎯 Template Prompts for Claude Code Academy

## 📋 Overview

This document contains ready-to-use prompt templates for the AI-to-AI workflow between Claude Web Chat and Claude Code. These templates ensure consistent development quality and accelerate feature implementation.

---

## 📚 NEW LESSON CREATION

### 🎯 Basic Lesson Template

**Use this prompt in Claude Code:**

```
# ЗАДАЧА: Создать урок "LESSON_TITLE" для Claude Code Academy

## КОНТЕКСТ:
- Проект: Claude Code Academy (обучающая платформа)
- Целевая аудитория: разработчики изучающие Claude Code
- Формат: Интерактивный урок с практическими примерами

## ТЕХНИЧЕСКОЕ ЗАДАНИЕ:

### СОЗДАТЬ: lesson-N.html
**Название:** "LESSON_TITLE"
**Сложность:** DIFFICULTY_LEVEL
**Продолжительность:** ESTIMATED_TIME минут

**Обязательное содержание:**
- 🎯 Цели урока (что изучит пользователь)
- 📖 Теоретическая часть с примерами кода
- 💻 Интерактивные практические задания
- ✅ Система прогресса и feedback
- 🎉 Заключение с summary

**Интерактивные элементы:**
- [ ] Terminal simulator для практики команд
- [ ] Code editor с syntax highlighting
- [ ] Step-by-step tutorial с navigation
- [ ] Progress tracker с checkpoints
- [ ] Quiz или практические задания

## СТРОГИЕ ТРЕБОВАНИЯ:

### Дизайн-система (ОБЯЗАТЕЛЬНО):
```css
/* Используй ТОЛЬКО эти цвета и стили из .claude-rules */
--color-bg-primary: #F7F5F3
--color-accent-primary: #FF6B35
--color-text-primary: #2D1B0E
--color-surface-primary: #FFFFFF
--color-button-primary: #1a1a1a
```

### Технологический стек:
- ✅ HTML5 semantic markup
- ✅ CSS3 с custom properties
- ✅ Vanilla JavaScript ES6+
- ✅ Mobile-first responsive design
- ❌ НЕТ внешних библиотек или фреймворков

### Accessibility requirements:
- ARIA labels для всех интерактивных элементов
- Keyboard navigation support
- Screen reader friendly content
- Color contrast > 4.5:1

## РЕЗУЛЬТАТ:
Полностью функциональный урок готовый для production, следующий всем стандартам проекта.
```

### 🔧 Advanced Interactive Lesson

**For complex lessons with simulations:**

```
# ADVANCED ЗАДАЧА: Создать интерактивный урок с симулятором для Claude Code Academy

## СПЕЦИАЛЬНЫЕ ТРЕБОВАНИЯ:

### СОЗДАТЬ: lesson-N-TOPIC.html с симуляторами:

**Terminal Simulator:**
- Реалистичный command line интерфейс
- Поддержка команд: ls, cd, pwd, mkdir, touch, cat
- Файловая система в памяти JavaScript
- History команд (стрелки вверх/вниз)
- Tab completion для файлов и команд
- Цветной output с syntax highlighting

**Code Editor Simulator:**
- Syntax highlighting для различных языков
- Line numbers и folding
- Автодополнение базовых конструкций
- Live preview результатов (если применимо)
- Error highlighting и подсказки

**Step-by-Step Tutorial Engine:**
- Прогресс бар с checkpoint'ами
- Система подсказок и hints
- Валидация выполнения заданий
- Automatic advancement или manual control
- Возможность пропуска или повтора шагов

## ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ:

### Progress Tracking:
```javascript
const ProgressTracker = {
  saveProgress(lessonId, stepId, data) {
    // Сохранение в localStorage
  },

  loadProgress(lessonId) {
    // Загрузка из localStorage
  },

  resetProgress(lessonId) {
    // Сброс прогресса урока
  }
};
```

### Achievement System:
- Badges за выполнение заданий
- Progress indicators
- Completion certificates
- Social sharing capabilities

Создай cutting-edge интерактивный опыт обучения!
```

---

## 🎨 COMPONENT CREATION

### 🔧 Interactive Component Template

```
# ЗАДАЧА: Создать интерактивный компонент "COMPONENT_NAME"

## КОНТЕКСТ ПРОЕКТА:
- Claude Code Academy
- Встраивается в существующие уроки
- Должен соответствовать design system

## ТЕХНИЧЕСКИЕ СПЕЦИФИКАЦИИ:

### Функциональность:
- [ ] MAIN_FUNCTION_1
- [ ] MAIN_FUNCTION_2
- [ ] MAIN_FUNCTION_3

### Интеграция:
```html
<!-- Легкая интеграция в любой урок -->
<div id="component-container">
  <div class="component-name" data-config='{"option": "value"}'>
    <!-- Автоматический рендеринг -->
  </div>
</div>

<script>
// Простая инициализация
ComponentName.init({
  container: '#component-container',
  options: {...}
});
</script>
```

### Accessibility & UX:
- Keyboard navigation support
- ARIA labels и descriptions
- Mobile touch optimization
- Loading states и error handling
- Smooth animations (CSS transforms)

## ДИЗАЙН ТРЕБОВАНИЯ:
Строго следуй .claude-rules файлу:
- Цвета из design system
- Typography system
- Spacing grid (8px increments)
- Border radius standards
- Shadow system

Создай polished, production-ready компонент!
```

---

## 🐛 BUG FIXING & OPTIMIZATION

### 🔧 Bug Fix Template

```
# ЗАДАЧА: Исправить проблему "BUG_DESCRIPTION"

## АНАЛИЗ ПРОБЛЕМЫ:
- **Симптомы:** OBSERVED_BEHAVIOR
- **Ожидаемое поведение:** EXPECTED_BEHAVIOR
- **Воспроизведение:** STEPS_TO_REPRODUCE
- **Затронутые устройства:** AFFECTED_DEVICES
- **Браузеры:** AFFECTED_BROWSERS

## ДИАГНОСТИКА:

### 1. Изучи существующий код:
- Прочитай связанные файлы
- Найди root cause проблемы
- Определи scope изменений

### 2. Проверь соответствие стандартам:
- [ ] Следует ли код .claude-rules?
- [ ] Соблюдается ли design system?
- [ ] Есть ли accessibility issues?
- [ ] Responsive design работает?

### 3. Тестирование fix'а:
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] Mobile Chrome
- [ ] Mobile Safari

## ОГРАНИЧЕНИЯ:
- ❌ НЕ нарушай существующую функциональность
- ❌ НЕ изменяй core файлы (index.html, docs/, etc.)
- ✅ Минимальные изменения для решения проблемы
- ✅ Поддержи backward compatibility

## РЕЗУЛЬТАТ:
Чистое, протестированное решение с документацией изменений.
```

### ⚡ Performance Optimization Template

```
# ЗАДАЧА: Оптимизировать производительность "TARGET_FEATURE"

## ТЕКУЩЕЕ СОСТОЯНИЕ:
- **Измеренная производительность:** CURRENT_METRICS
- **Проблемные области:** IDENTIFIED_BOTTLENECKS
- **Целевые метрики:** TARGET_PERFORMANCE

## ПЛАН ОПТИМИЗАЦИИ:

### 1. Critical Path Analysis:
- Определи критический rendering path
- Найди blocking resources
- Измерь Core Web Vitals

### 2. Optimization Techniques:
```javascript
// CSS optimization
// - Inline critical CSS
// - Remove unused styles
// - Optimize selectors

// JavaScript optimization
// - Code splitting
// - Lazy loading
// - Event delegation
// - Debouncing

// Asset optimization
// - Image compression
// - SVG optimization
// - Font subsetting
```

### 3. Measurement & Validation:
- До и после метрики
- Cross-device testing
- Performance budget compliance

## SUCCESS CRITERIA:
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3s

Создай blazing fast user experience!
```

---

## 🎨 DESIGN SYSTEM UPDATES

### 🎯 Component Styling Template

```
# ЗАДАЧА: Обновить стили компонента "COMPONENT_NAME"

## DESIGN REQUIREMENTS:

### 1. Следуй строго .claude-rules:
```css
/* Используй ТОЛЬКО существующие цвета */
:root {
  --color-bg-primary: #F7F5F3;
  --color-accent-primary: #FF6B35;
  --color-text-primary: #2D1B0E;
  /* и т.д. из .claude-rules */
}
```

### 2. Responsive Design:
```css
/* Mobile-first подход */
.component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  /* Tablet enhancements */
}

@media (min-width: 1024px) {
  /* Desktop optimizations */
}
```

### 3. Interactive States:
- Default state
- Hover effects
- Focus indicators
- Active/pressed states
- Disabled states
- Loading states

### 4. Animation Guidelines:
```css
/* Используй transform для performance */
.component {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.component:hover {
  transform: translateY(-2px);
}
```

## ACCESSIBILITY CHECKS:
- [ ] Color contrast > 4.5:1
- [ ] Focus indicators видимы
- [ ] Touch targets > 44px
- [ ] Screen reader friendly
- [ ] Keyboard navigation

Создай визуально perfect компонент!
```

---

## 📱 RESPONSIVE DESIGN FIXES

### 🔧 Mobile Optimization Template

```
# ЗАДАЧА: Оптимизировать "FEATURE_NAME" для мобильных устройств

## МОБИЛЬНЫЕ ТРЕБОВАНИЯ:

### 1. Touch Interaction:
```css
/* Минимальные размеры для touch */
.button, .interactive-element {
  min-height: 44px;
  min-width: 44px;
  padding: 16px;
}

/* Увеличенные отступы */
@media (max-width: 767px) {
  .container {
    padding: 16px;
  }

  .form-input {
    font-size: 16px; /* Предотвращает zoom в iOS */
  }
}
```

### 2. Layout Optimization:
- Single column layout
- Collapsed navigation
- Simplified interactions
- Optimized typography
- Reduced visual complexity

### 3. Performance на мобильных:
- Minimal JavaScript execution
- Optimized images
- Reduced network requests
- Fast touch response
- Smooth scrolling

## ТЕСТИРОВАНИЕ:
- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] Android средний (360px)
- [ ] iPad (768px)
- [ ] Landscape orientations

## SUCCESS METRICS:
- Touch response < 100ms
- Smooth 60fps animations
- No horizontal scroll
- Readable text without zoom
- Accessible navigation

Создай excellent mobile experience!
```

---

## ✅ CODE REVIEW & QUALITY

### 🔍 Quality Check Template

```
# ЗАДАЧА: Code review и quality check для "TARGET_CODE"

## QUALITY CHECKLIST:

### 1. Code Standards (docs/CODING-STANDARDS.md):
- [ ] HTML semantic и валидный
- [ ] CSS follows conventions
- [ ] JavaScript ES6+ syntax
- [ ] Proper error handling
- [ ] Performance optimized

### 2. Design System Compliance:
- [ ] Colors из .claude-rules
- [ ] Typography system
- [ ] Spacing grid
- [ ] Component patterns
- [ ] Interactive states

### 3. Accessibility Audit:
```javascript
// Проверь эти аспекты:
const accessibilityChecks = {
  semanticHTML: 'Используется ли правильная разметка?',
  ariaLabels: 'Есть ли ARIA labels?',
  keyboardNav: 'Работает ли keyboard navigation?',
  colorContrast: 'Достаточный ли color contrast?',
  focusIndicators: 'Видны ли focus indicators?'
};
```

### 4. Performance Analysis:
- Bundle size impact
- Loading performance
- Runtime performance
- Memory usage
- Network requests

### 5. Cross-browser Testing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

## IMPROVEMENT SUGGESTIONS:
Предложи конкретные улучшения:
- Code organization
- Performance optimizations
- Accessibility enhancements
- UX improvements

Создай detailed quality report!
```

---

## 🚀 DEPLOYMENT & MAINTENANCE

### 📦 Release Preparation Template

```
# ЗАДАЧА: Подготовить релиз "RELEASE_NAME"

## PRE-RELEASE CHECKLIST:

### 1. Code Quality:
- [ ] Все файлы соответствуют .claude-rules
- [ ] Code review пройден
- [ ] Нет console errors
- [ ] Performance тесты пройдены

### 2. Testing Complete:
- [ ] Functional testing
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility testing
- [ ] Performance testing

### 3. Backup & Safety:
```bash
# Создай backup перед релизом
./backup-system.sh

# Проверь что backup создался
ls ~/backups/claude-code-academy/
```

### 4. Documentation:
- [ ] README.md обновлен (если нужно)
- [ ] Changelog создан
- [ ] API documentation актуальна
- [ ] User guides обновлены

## DEPLOYMENT PROCESS:

### 1. Final Validation:
- [ ] Local build successful
- [ ] All tests passing
- [ ] No broken links
- [ ] SEO meta tags correct

### 2. Deploy to Production:
- [ ] Git commit с описательным сообщением
- [ ] Git push to main branch
- [ ] Vercel auto-deployment triggered
- [ ] Production site verification

### 3. Post-Deploy Testing:
- [ ] Live site functional test
- [ ] Mobile responsiveness check
- [ ] Loading performance test
- [ ] Error monitoring setup

## ROLLBACK PLAN:
В случае проблем:
```bash
# Быстрый rollback
./restore-project.sh
# Выбрать предыдущий стабильный backup
```

Обеспечь smooth, безопасный релиз!
```

---

## 🎯 AI-TO-AI WORKFLOW OPTIMIZATION

### 🤖 Session Handoff Template

```
# AI-TO-AI HANDOFF: Передача контекста между сессиями

## CURRENT STATE SUMMARY:
- **Активные задачи:** CURRENT_TASKS
- **Последние изменения:** RECENT_CHANGES
- **Известные проблемы:** KNOWN_ISSUES
- **Планы развития:** FUTURE_PLANS

## PROJECT CONTEXT:
- **Архитектура:** Single-page app + lessons
- **Технологии:** HTML5, CSS3, Vanilla JS
- **Design System:** Строго следовать .claude-rules
- **Backup System:** ./backup-system.sh доступен

## IMPORTANT FILES:
```
.claude-rules - ОБЯЗАТЕЛЬНО читать первым
docs/PROJECT-GUIDELINES.md - архитектурные принципы
docs/CODING-STANDARDS.md - технические стандарты
index.html - НЕ ИЗМЕНЯТЬ (751 строка, стабильная версия)
```

## ACTIVE DEVELOPMENT AREAS:
- lesson-*.html создание
- Интерактивные компоненты
- Mobile optimization
- Performance improvements

## QUALITY GATES:
- [ ] Следовать .claude-rules строго
- [ ] Mobile-first responsive
- [ ] Accessibility compliance
- [ ] Performance < 2s load time
- [ ] Cross-browser compatibility

## NEXT STEPS:
1. Прочитать .claude-rules
2. Изучить текущий код
3. Создать backup перед изменениями
4. Следовать техническим стандартам
5. Тестировать на реальных устройствах

Обеспечь seamless continuity между AI сессиями!
```

---

## 🎉 SUCCESS METRICS

### 📊 Template Effectiveness

These templates are designed to achieve:

**Consistency:** 100% adherence to project standards
**Speed:** 3x faster development with ready prompts
**Quality:** Enterprise-level code every time
**Maintainability:** Clear patterns for future development

### 🎯 Usage Guidelines

1. **Copy entire template** - don't modify structure
2. **Replace placeholders** with specific values
3. **Add context** specific to your task
4. **Include success criteria** for validation
5. **Reference .claude-rules** in every prompt

### 🚀 Continuous Improvement

As the project evolves, these templates should be updated to:
- Reflect new architectural decisions
- Include lessons learned from development
- Optimize for better AI-to-AI communication
- Maintain alignment with project goals

---

*These templates form the foundation of consistent, high-quality development for Claude Code Academy. Use them as starting points and customize based on specific requirements while maintaining the core structure and quality standards.*