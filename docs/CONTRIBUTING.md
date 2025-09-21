# 🤝 Contributing

Спасибо за интерес к проекту Claude Code Academy! Мы приветствуем вклад от сообщества.

## 🚀 Быстрый старт для разработчиков

### Настройка окружения

```bash
# 1. Fork репозиторий на GitHub
# 2. Клонировать ваш fork
git clone https://github.com/YOUR_USERNAME/claude-code-academy.git
cd claude-code-academy

# 3. Запустить локально
python3 -m http.server 8000
# Открыть http://localhost:8000
```

### Структура разработки

```bash
# Создать feature branch
git checkout -b feature/amazing-feature

# Внести изменения
# ...

# Коммит с описательным сообщением
git commit -m "✨ Add amazing feature"

# Push в ваш fork
git push origin feature/amazing-feature

# Создать Pull Request на GitHub
```

## 📝 Стандарты кода

### HTML
- Используйте семантические HTML5 теги
- Добавляйте ARIA атрибуты для accessibility
- Валидируйте разметку через W3C Validator

```html
<!-- ✅ Хорошо -->
<section class="hero" aria-labelledby="hero-title">
  <h1 id="hero-title">Claude Code Academy</h1>
</section>

<!-- ❌ Плохо -->
<div class="hero">
  <div class="title">Claude Code Academy</div>
</div>
```

### CSS
- Следуйте модульной архитектуре (5 файлов)
- Используйте CSS Custom Properties
- Mobile-first responsive design
- Соблюдайте Claude Design System

```css
/* ✅ Хорошо */
.button {
  background-color: var(--color-button);
  border-radius: var(--border-radius);
  transition: var(--transition-smooth);
}

/* ❌ Плохо */
.button {
  background-color: #1a1a1a;
  border-radius: 8px;
  transition: 0.3s;
}
```

### JavaScript
- Используйте современный ES6+ синтаксис
- Никаких внешних зависимостей
- Модульная архитектура
- Обработка ошибок

```javascript
// ✅ Хорошо
const Navigation = {
  init() {
    try {
      this.setupSmoothScroll();
    } catch (error) {
      console.error('Navigation init failed:', error);
    }
  }
};

// ❌ Плохо
function setupNav() {
  // код без обработки ошибок
}
```

## 🎨 Design Guidelines

### Claude Design System
Строго следуйте фирменному стилю Claude:

```css
/* Обязательные цвета */
--color-bg: #F7F5F3;           /* Кремовый фон */
--color-text: #2D1B0E;         /* Темно-коричневый текст */
--color-accent: #FF6B35;       /* Оранжевый акцент */
--color-button: #1a1a1a;       /* Черные кнопки */
--color-card: #ffffff;         /* Белые карточки */
```

### Компоненты
- Кнопки: черный фон, белый текст, 8px border-radius
- Карточки: белый фон, мягкие тени
- Скругления: 8-12px
- Переходы: 0.15s для hover, 0.3s для анимаций

## 🧪 Тестирование

### Обязательные проверки
- [ ] Работает на мобильных устройствах (iPhone, Android)
- [ ] Работает на планшетах (iPad)
- [ ] Работает на десктопе (Chrome, Firefox, Safari)
- [ ] Accessibility: навигация с клавиатуры
- [ ] Performance: загрузка < 2 секунд

### Браузеры для тестирования
- Chrome 90+
- Firefox 85+
- Safari 14+
- Edge 90+

## 📋 Типы вкладов

### 🐛 Исправление багов
1. Проверьте [Issues](../../issues) — возможно баг уже известен
2. Создайте новый Issue с подробным описанием
3. Приложите скриншоты и информацию о браузере
4. Создайте PR с исправлением

### ✨ Новые функции
1. Создайте Issue с тегом `enhancement`
2. Опишите желаемую функциональность
3. Дождитесь одобрения maintainer'ов
4. Реализуйте и создайте PR

### 📚 Улучшение документации
1. Исправления опечаток — сразу PR
2. Крупные изменения — сначала Issue для обсуждения
3. Следуйте markdown стандартам

### 🎨 Улучшения дизайна
1. Обязательно согласование с maintainer'ами
2. Соблюдение Claude Design System
3. Тестирование на всех устройствах

## 🔄 Git Workflow

### Commit Messages
Используйте conventional commits с эмодзи:

```bash
✨ feat: add new lesson navigation
🐛 fix: resolve progress bar sync issue
📝 docs: update architecture documentation
🎨 style: improve button hover effects
♻️ refactor: reorganize CSS modules
⚡ perf: optimize image loading
🧪 test: add navigation tests
```

### Branch Naming
```bash
feature/lesson-navigation
bugfix/progress-sync
docs/architecture-update
style/button-improvements
```

## 📞 Коммуникация

### Где обсуждать
- **GitHub Issues** — баги, новые функции, вопросы
- **Pull Requests** — код ревью, обсуждение реализации
- **GitHub Discussions** — общие вопросы о проекте

### Язык общения
- **Русский** — для пользовательских вопросов
- **Английский** — для технических обсуждений
- **Код комментарии** — на английском

## ⚡ Performance Guidelines

### Обязательные требования
- Общий размер страницы < 50KB
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- FID (First Input Delay) < 100ms

### Оптимизации
- Используйте system fonts
- Минифицируйте CSS/JS
- Оптимизируйте изображения
- Избегайте внешних зависимостей

## 🔒 Security

### Безопасность кода
- Никогда не коммитьте API ключи
- Используйте HTTPS ссылки
- Валидируйте пользовательский ввод
- Избегайте innerHTML для динамического контента

## 📊 Code Review Process

### Что проверяют reviewers
1. **Функциональность** — работает ли код как задумано
2. **Стандарты кода** — соответствие guidelines
3. **Performance** — не ухудшает ли производительность
4. **Accessibility** — доступность для всех пользователей
5. **Design consistency** — соответствие Claude Design System

### Как ускорить review
- Небольшие PR (< 300 строк изменений)
- Подробное описание изменений
- Скриншоты для UI изменений
- Тестирование на разных устройствах

## 🎉 Признание вкладов

Все участники добавляются в:
- README.md в секцию Contributors
- CHANGELOG.md для значимых изменений
- GitHub Contributors page

---

**Спасибо за ваш вклад в Claude Code Academy! 🚀**
