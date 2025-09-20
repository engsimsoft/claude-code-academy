# 🏗️ Claude Code Academy - Project Guidelines

## 📋 Overview

Claude Code Academy is an innovative educational platform designed around an **AI-to-AI workflow**. Users interact with Claude in web chat to generate prompts, which are then executed by Claude Code to create interactive lessons and features.

### 🎯 Project Mission
Create the definitive learning resource for Claude Code through hands-on interactive lessons that demonstrate real-world development patterns and best practices.

---

## 🏛️ Architectural Principles

### 1. 🎯 Single Page Architecture with Lesson Extensions

**Core Concept:**
- `index.html` serves as the main hub (751 lines, 28KB)
- Individual `lesson-*.html` files for specific tutorials
- Each lesson is self-contained but follows consistent patterns

**Implementation:**
```html
<!-- Main hub structure -->
index.html - Landing page with lesson navigation

<!-- Lesson structure -->
lesson-1.html - "Getting Started with Claude Code"
lesson-2.html - "File Operations and Navigation"
lesson-3.html - "Interactive Terminal Simulation"
```

### 2. 🎨 Unified Design System

**Color Palette (STRICT):**
```css
:root {
  --bg-primary: #F7F5F3;      /* Page background */
  --accent-primary: #FF6B35;   /* Interactive elements */
  --text-primary: #2D1B0E;     /* Main text */
  --surface-primary: #FFFFFF;  /* Cards, modals */
  --button-primary: #1a1a1a;   /* Button backgrounds */
}
```

**Typography System:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Heading Scale */
h1: 2.5rem / 40px
h2: 2rem / 32px
h3: 1.5rem / 24px
h4: 1.25rem / 20px

/* Body Scale */
body: 1rem / 16px
small: 0.875rem / 14px
```

### 3. ⚡ Performance-First Approach

**Inline Everything Strategy:**
- Critical CSS inline in `<head>`
- JavaScript functionality inline in `<script>` tags
- SVG icons inline for instant rendering
- Minimize HTTP requests to 1 (the HTML file)

**Loading Optimization:**
```html
<!-- Critical CSS first -->
<style>
/* Essential styles for above-the-fold content */
</style>

<!-- Deferred non-critical resources -->
<script defer>
/* Interactive functionality */
</script>
```

### 4. 📱 Mobile-First Responsive Design

**Breakpoint Strategy:**
```css
/* Base: Mobile (320px+) */
.lesson-card { width: 100%; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .lesson-card { width: calc(50% - 16px); }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .lesson-card { width: calc(33.333% - 16px); }
}
```

---

## 📁 File Structure and Conventions

### 🗂️ Directory Organization

```
claude-code-academy/
├── index.html              # Main hub (DO NOT MODIFY)
├── .claude-rules           # Development rules
├── lesson-*.html           # Interactive lessons
├── backup-system.sh        # Backup utilities
├── restore-project.sh      # Restore utilities
├── docs/                   # Project documentation
│   ├── PROJECT-GUIDELINES.md
│   ├── CODING-STANDARDS.md
│   ├── BACKUP-STRATEGY.md
│   └── existing-docs...
├── prompts/                # Template prompts for AI workflow
└── .gitignore
```

### 📝 Naming Conventions

**Files:**
- `lesson-[number].html` - Interactive lessons (lesson-1.html)
- `terminal-simulator.html` - Specific tools
- `kebab-case` for all filenames

**CSS Classes:**
```css
/* Component naming */
.lesson-card { }          /* Block */
.lesson-card__title { }   /* Element */
.lesson-card--featured { } /* Modifier */

/* Utility classes */
.text-center { }
.mb-4 { }
.grid-responsive { }
```

**JavaScript Variables:**
```javascript
// Variables and functions
const terminalSimulator = {};
const progressTracker = {};

// Constants
const LESSON_CONFIG = {};
const API_ENDPOINTS = {};

// Classes (rare usage)
class LessonManager {}
```

---

## 🔄 Git Workflow and Versioning

### 🌟 Branch Strategy

**Main Branch:**
- Always deployable production code
- Protected with backup system
- Never commit directly without backup

**Development Workflow:**
1. Create backup: `./backup-system.sh`
2. Make changes on local files
3. Test thoroughly on mobile/desktop
4. Commit with descriptive message
5. Deploy via Vercel

### 📝 Commit Message Format

```
feat: добавлен урок "Terminal Navigation" с интерактивным терминалом

- Создан lesson-3.html с полным терминальным симулятором
- Добавлены команды ls, cd, pwd с реалистичной обратной связью
- Реализован responsive дизайн для мобильных устройств
- Интегрированы accessibility features (keyboard navigation)

🧪 Тестировано: Chrome, Firefox, Safari, iPhone, Android
📱 Mobile-friendly: ✅
♿ Accessibility: ✅
```

### 🛡️ Backup Integration

**Before Major Changes:**
```bash
# Always backup before significant work
./backup-system.sh

# Work on changes...

# If problems occur:
./restore-project.sh
```

---

## ✅ Code Review Checklist

### 🎨 Design Consistency
- [ ] Colors match design system exactly
- [ ] Typography uses system fonts and scales
- [ ] Border radius consistent (8px buttons, 12px cards)
- [ ] Spacing follows 8px grid system
- [ ] Interactive states defined (hover, focus, active)

### 📱 Responsive Behavior
- [ ] Mobile-first approach implemented
- [ ] Works on 320px minimum width
- [ ] Tablet breakpoint (768px) optimized
- [ ] Desktop breakpoint (1024px) enhanced
- [ ] No horizontal scroll on any device
- [ ] Touch targets minimum 44px

### ⚡ Performance
- [ ] Critical CSS inlined
- [ ] JavaScript deferred when possible
- [ ] Images optimized (if any)
- [ ] No blocking resources
- [ ] Page loads < 2 seconds on 3G

### ♿ Accessibility
- [ ] Semantic HTML structure
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation works
- [ ] Color contrast > 4.5:1
- [ ] Screen reader friendly
- [ ] Focus indicators visible

### 🧪 Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 🚀 Deployment Procedures

### 🌐 Vercel Integration

The project deploys automatically on git push to main branch via Vercel.

**Deployment Checklist:**
1. [ ] Local testing complete
2. [ ] Backup created
3. [ ] All files committed
4. [ ] Git push to main
5. [ ] Verify deployment at claude-code-academy.vercel.app
6. [ ] Test live site functionality

### 🔧 Environment Configuration

**vercel.json configuration:**
```json
{
  "trailingSlash": false,
  "cleanUrls": true
}
```

---

## 🐛 Troubleshooting Guide

### Common Issues and Solutions

**Issue: Layout breaks on mobile**
```css
/* Solution: Use proper viewport units */
.container {
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
}
```

**Issue: JavaScript not working**
```html
<!-- Solution: Check script placement -->
<script>
// Put scripts at end of body for DOM availability
document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});
</script>
```

**Issue: Colors look different**
```css
/* Solution: Use exact color values */
:root {
  --accent: #FF6B35; /* Exact hex value */
}
```

### 🆘 Emergency Recovery

If something breaks critically:

1. **Don't panic** - backups exist!
2. **Run restore:** `./restore-project.sh`
3. **Select recent backup** from list
4. **Confirm restoration**
5. **Resume work** from stable state

---

## 🎯 AI-to-AI Workflow Integration

### 🤖 Claude Web Chat → Claude Code Process

**Step 1: Planning in Web Chat**
```
User: "Хочу урок по работе с файлами"
Claude Web: Создает детальный промпт для Claude Code
```

**Step 2: Claude Code Implementation**
- Читает .claude-rules для соблюдения стандартов
- Использует docs/ для понимания архитектуры
- Создает lesson-*.html следуя patterns
- Тестирует на responsive design

**Step 3: Quality Assurance**
- Проверяет соответствие design system
- Валидирует accessibility
- Тестирует performance
- Создает backup после завершения

### 📝 Prompt Templates Integration

The `prompts/` directory contains ready-to-use templates for common development tasks, enabling consistent AI-to-AI communication across sessions.

---

## 🎖️ Best Practices

### 🏆 Golden Rules

1. **Always backup before major changes**
2. **Mobile-first responsive design**
3. **Inline critical resources**
4. **Follow design system exactly**
5. **Test on real devices**
6. **Maintain semantic HTML**
7. **Progressive enhancement approach**
8. **Document complex logic**

### 💡 Pro Tips

**CSS Organization:**
```css
/* 1. CSS Custom Properties */
:root { --color: #000; }

/* 2. Base styles */
html, body { }

/* 3. Layout components */
.container, .grid { }

/* 4. UI components */
.button, .card { }

/* 5. Utilities */
.text-center, .mb-4 { }

/* 6. Media queries */
@media (min-width: 768px) { }
```

**JavaScript Structure:**
```javascript
// 1. Constants and configuration
const CONFIG = {};

// 2. Utility functions
function debounce() {}

// 3. Component logic
const lessonManager = {};

// 4. Event listeners
document.addEventListener('DOMContentLoaded', init);

// 5. Initialization
function init() {}
```

---

## 🎯 Success Metrics

### 📊 Quality Indicators

**Code Quality:**
- ✅ Passes all checklist items
- ✅ Zero console errors
- ✅ Valid HTML5 markup
- ✅ Consistent design system usage

**User Experience:**
- ✅ < 2 second load time
- ✅ Works on all target devices
- ✅ Keyboard navigation functional
- ✅ Screen reader compatible

**Maintainability:**
- ✅ Clear, readable code
- ✅ Consistent naming conventions
- ✅ Proper documentation
- ✅ Backup system integration

### 🎖️ Excellence Standards

When every aspect follows these guidelines, you achieve **enterprise-level quality** that:
- Scales across multiple developers/AI sessions
- Maintains consistency over time
- Provides predictable user experience
- Enables rapid feature development

---

*This document serves as the definitive guide for maintaining Claude Code Academy's high standards across all development activities. Always refer to these guidelines when making any changes to the project.*