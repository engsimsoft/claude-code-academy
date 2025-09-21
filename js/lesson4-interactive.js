/**
 * CLAUDE CODE ACADEMY - LESSON 4 INTERACTIVE MODULE
 * Интерактивная логика финального урока - "Продвинутые фичи Claude Code"
 */

const Lesson4 = {
    // Состояние урока
    currentStepIndex: 0,
    completedSteps: 0,
    totalSteps: 15,

    // DOM элементы
    terminalInput: null,
    terminalOutput: null,
    progressFill: null,
    progressText: null,
    currentHint: null,
    stepCards: null,
    certificateContainer: null,
    achievementBadges: null,
    celebrationContainer: null,

    // Шаги урока
    lessonSteps: [
        {
            id: 1,
            command: '/config показать настройки',
            hint: 'Начнем с конфигурации: "/config показать настройки"',
            description: 'Настройка Claude Code',
            response: `⚙️ Текущие настройки Claude Code:

📋 **Основные параметры:**
\`\`\`yaml
model: claude-3.5-sonnet
temperature: 0.7
max_tokens: 4096
auto_save: true
syntax_highlighting: true
\`\`\`

🎨 **Интерфейс:**
\`\`\`yaml
theme: dark
font_size: 14
line_numbers: true
word_wrap: true
vim_mode: false
\`\`\`

🔧 **Продвинутые настройки:**
\`\`\`yaml
auto_complete: true
context_window: 200000
streaming: true
debug_mode: false
\`\`\`

💡 Можно изменить любую настройку: "/config set theme light"`
        },
        {
            id: 2,
            command: '/config set auto_complete advanced',
            hint: 'Улучшим автодополнение: "/config set auto_complete advanced"',
            description: 'Настройка автодополнения',
            response: `🚀 Активирую продвинутое автодополнение...

✨ **Advanced Auto-Complete включен:**

🧠 **Новые возможности:**
- **Context-aware suggestions** - предложения на основе контекста
- **Multi-file analysis** - анализ всего проекта
- **Pattern recognition** - распознавание паттернов кода
- **Smart imports** - автоматический импорт зависимостей

⚡ **Горячие клавиши:**
- \`Ctrl+Space\`  - принудительное автодополнение
- \`Tab\`  - принять предложение
- \`Ctrl+Shift+Space\`  - показать документацию
- \`Alt+/\`  - альтернативные варианты

✅ Настройка сохранена! Попробуйте набрать код...

💡 Совет: Говорите Claude Code что вы хотите создать, и он предложит лучшие варианты!`
        },
        {
            id: 3,
            command: 'настрой workflow для React проекта',
            hint: 'Автоматизация: "настрой workflow для React проекта"',
            description: 'Создание автоматизированного workflow',
            response: `🔄 Создаю оптимизированный React workflow...

📋 **Создан .claude-workflow.yml:**
\`\`\`yaml
name: "React Development Workflow"
triggers:
  - file_change: "*.jsx", "*.tsx"
  - command: "create component"
  - git: "pre-commit"

steps:
  1. analyze_file:
     - check_typescript_errors
     - validate_react_patterns
     - suggest_optimizations

  2. auto_generate:
     - create_test_file
     - add_prop_types
     - generate_storybook_story

  3. code_quality:
     - run_eslint
     - check_accessibility
     - optimize_performance

  4. documentation:
     - update_readme
     - generate_jsdoc
     - create_usage_examples
\`\`\`

⚡ **Автоматические действия активированы:**
- Создание тестов при создании компонентов
- Линтинг при сохранении файлов
- Генерация документации
- Оптимизация производительности

✅ Workflow готов! Создайте компонент и увидите магию автоматизации.`
        },
        {
            id: 4,
            command: 'создай компонент Modal с автоматизацией',
            hint: 'Тестируем workflow: "создай компонент Modal с автоматизацией"',
            description: 'Автоматизированное создание компонента',
            response: `🎭 Создаю Modal компонент с полной автоматизацией...

📝 **@src/components/Modal/Modal.tsx:**
\`\`\`tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={\`modal-content modal-\${size}\`} onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header">{title}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
\`\`\`

🤖 **Автоматически сгенерировано:**
✅ Modal.test.tsx - 12 unit тестов
✅ Modal.stories.tsx - 6 Storybook историй
✅ Modal.module.css - адаптивные стили
✅ index.ts - правильный export
✅ README.md - документация использования

📊 **Качество кода:** A+ (TypeScript, accessibility, performance)`
        },
        {
            id: 5,
            command: 'интегрируй с GitHub Actions',
            hint: 'CI/CD: "интегрируй с GitHub Actions"',
            description: 'Настройка непрерывной интеграции',
            response: `🔧 Настраиваю интеграцию с GitHub Actions...

📁 **.github/workflows/claude-code.yml:**
\`\`\`yaml
name: Claude Code CI/CD
on: [push, pull_request]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Claude Code Analysis
        uses: anthropic/claude-code-action@v1
        with:
          api_key: \${{ secrets.CLAUDE_API_KEY }}
          commands: |
            analyze code quality
            check for security issues
            suggest optimizations
            run all tests

      - name: Auto-fix Issues
        run: |
          claude-code "исправь все найденные проблемы"

      - name: Generate Report
        run: |
          claude-code "создай отчет о качестве кода"
\`\`\`

🔐 **Secrets настроены:**
- CLAUDE_API_KEY
- DEPLOYMENT_TOKEN
- SLACK_WEBHOOK (для уведомлений)

⚡ **Автоматические проверки:**
✅ Code quality analysis при каждом PR
✅ Security vulnerability scanning
✅ Performance optimization suggestions
✅ Automatic bug fixes где возможно
✅ Deployment в staging environment

💡 Теперь Claude Code работает как часть вашего CI/CD pipeline!`
        },
        {
            id: 6,
            command: 'подключи интеграцию с Figma',
            hint: 'Design-to-code: "подключи интеграцию с Figma"',
            description: 'Интеграция с дизайн-системами',
            response: `🎨 Настраиваю интеграцию Claude Code с Figma...

🔗 **Figma Claude Code Plugin настроен:**

📋 **Возможности:**
\`\`\`
/figma import <design-url>  - импорт дизайна в код
/figma sync                 - синхронизация изменений
/figma tokens              - экспорт design tokens
/figma components          - создание React компонентов
\`\`\`

🎯 **Пример использования:**
\`\`\`bash
/figma import https://figma.com/file/abc123/button-design
\`\`\`

**Результат:**
✅ Автоматически созданы компоненты из Figma
✅ Экспортированы CSS переменные
✅ Сгенерированы TypeScript типы
✅ Создана Storybook документация

🔄 **Auto-sync настроен:**
- Изменения в Figma → автоматическое обновление кода
- Уведомления в Slack о новых версиях дизайна
- Conflict resolution при различиях

💡 **Design-to-code workflow:** Дизайнер обновляет Figma → Claude Code обновляет компоненты → PR создается автоматически!`
        },
        {
            id: 7,
            command: 'создай кастомные команды для команды',
            hint: 'Team workflow: "создай кастомные команды для команды"',
            description: 'Настройка команд для команды',
            response: `👥 Создаю кастомные команды для командной работы...

📋 **.claude-team-commands.yml:**
\`\`\`yaml
team_commands:
  deploy:
    command: "deploy to staging"
    description: "Deploy current branch to staging"
    steps:
      - run_tests
      - build_production
      - deploy_vercel
      - notify_slack

  review:
    command: "prepare for review"
    description: "Prepare PR for code review"
    steps:
      - format_code
      - update_docs
      - run_linting
      - create_pr_template

  hotfix:
    command: "create hotfix"
    description: "Emergency production fix"
    steps:
      - create_hotfix_branch
      - apply_fix
      - run_critical_tests
      - deploy_production
      - notify_team

  onboard:
    command: "onboard new developer"
    description: "Setup environment for new team member"
    steps:
      - clone_repository
      - install_dependencies
      - setup_env_variables
      - run_dev_server
      - open_documentation
\`\`\`

⚡ **Команды активированы:**
\`\`\`
/team deploy          - деплой на staging
/team review          - подготовка к code review
/team hotfix "bug description" - экстренное исправление
/team onboard @username        - онбординг разработчика
\`\`\`

🔔 **Slack интеграция настроена:**
- Уведомления о деплоях
- Статус CI/CD pipeline
- Mention команды при проблемах

✅ Командная работа стала еще эффективнее!`
        },
        {
            id: 8,
            command: 'настрой AI prompting оптимизацию',
            hint: 'AI optimization: "настрой AI prompting оптимизацию"',
            description: 'Оптимизация AI промптов',
            response: `🧠 Настраиваю оптимизацию AI промптов для лучших результатов...

📚 **Claude Code Smart Prompting активирован:**

🎯 **Автоматические улучшения промптов:**
\`\`\`yaml
prompt_optimization:
  context_enhancement: true
  specificity_boost: true
  example_injection: true
  constraint_clarity: true
  output_formatting: true
\`\`\`

💡 **Ваши команды → Оптимизированные промпты:**

**Вы говорите:** "создай функцию"
**Claude Code отправляет:**
\`\`\`
Создай функцию с следующими требованиями:
- TypeScript типизация
- Обработка ошибок
- JSDoc документация
- Unit тесты
- Примеры использования
Контекст: React проект, текущий файл: \${currentFile}
\`\`\`

**Вы говорите:** "исправь баг"
**Claude Code отправляет:**
\`\`\`
Анализируй код и исправь найденные проблемы:
- Найди root cause проблемы
- Предложи несколько вариантов решения
- Объясни почему возникла проблема
- Добавь тесты для предотвращения регрессии
Код: \${selectedCode}
Ошибка: \${errorMessage}
\`\`\`

📈 **Результат:** Качество ответов улучшено на 40%!`
        },
        {
            id: 9,
            command: 'создай monitoring и analytics',
            hint: 'Monitoring: "создай monitoring и analytics"',
            description: 'Настройка мониторинга проекта',
            response: `📊 Настраиваю comprehensive monitoring и analytics...

🔍 **Real-time мониторинг настроен:**

📈 **Performance Monitoring:**
\`\`\`typescript
// автоматически добавлено в проект
import { Analytics } from './monitoring/analytics';

const analytics = new Analytics({
  performance: true,
  errors: true,
  user_interactions: true,
  core_web_vitals: true
});

// Автоматический трекинг
analytics.track('lesson_completed', {
  lesson_id: 4,
  completion_time: '12:34',
  user_score: 95
});
\`\`\`

🚨 **Error Tracking:**
\`\`\`javascript
// Автоматическое логирование ошибок
window.addEventListener('error', (error) => {
  analytics.trackError({
    message: error.message,
    stack: error.error.stack,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
});
\`\`\`

📱 **User Experience Monitoring:**
- Page load times
- User interaction patterns
- Lesson completion rates
- Code execution success rates
- Terminal usage analytics

📊 **Dashboard создан:**
Real-time метрики доступны в /admin/dashboard

✅ Теперь вы видите как пользователи взаимодействуют с платформой!`
        },
        {
            id: 10,
            command: 'настрой production deployment pipeline',
            hint: 'Production: "настрой production deployment pipeline"',
            description: 'Production-ready деплой',
            response: `🚀 Настраиваю production-ready deployment pipeline...

🏭 **Production Pipeline создан:**

📋 **.claude-production.yml:**
\`\`\`yaml
production_pipeline:
  pre_deploy:
    - security_scan
    - performance_audit
    - accessibility_check
    - seo_optimization
    - bundle_analysis

  deploy_stages:
    1. staging_deploy:
       - run_integration_tests
       - visual_regression_tests
       - load_testing

    2. production_deploy:
       - blue_green_deployment
       - health_checks
       - rollback_preparation

    3. post_deploy:
       - smoke_tests
       - performance_monitoring
       - error_tracking
       - user_notification

  monitoring:
    - uptime_monitoring
    - performance_alerts
    - error_rate_tracking
    - user_satisfaction_metrics
\`\`\`

🔐 **Security мериры:**
✅ Environment variables защищены
✅ API keys encrypted
✅ HTTPS принудительно
✅ CSP headers настроены
✅ Rate limiting активирован

📊 **Production метрики:**
- 99.9% uptime SLA
- < 2s page load time
- < 0.1% error rate
- A+ security grade

🎯 **Zero-downtime deployments** настроены!

💡 Ваш проект готов к enterprise production использованию!`
        },
        {
            id: 11,
            command: 'создай advanced debugging режим',
            hint: 'Debugging: "создай advanced debugging режим"',
            description: 'Продвинутая отладка',
            response: `🐛 Активирую advanced debugging режим...

🔧 **Claude Code Debug Console активирован:**

💻 **Новые команды отладки:**
\`\`\`bash
/debug start           - начать сессию отладки
/debug inspect <var>   - инспектировать переменную
/debug trace <func>    - трассировка функции
/debug performance     - анализ производительности
/debug memory          - анализ утечек памяти
/debug network         - мониторинг сетевых запросов
\`\`\`

🎯 **AI-powered debugging:**
\`\`\`typescript
// Автоматический анализ кода
class AdvancedDebugger {
  analyzeError(error: Error) {
    return {
      rootCause: "State mutation in React component",
      suggestions: [
        "Используй useCallback для функций",
        "Добавь key prop в списки",
        "Проверь зависимости useEffect"
      ],
      fixCode: "// автоматически сгенерированный фикс..."
    };
  }
}
\`\`\`

🔍 **Visual debugging:**
- Component tree visualization
- State flow diagram
- Performance waterfall
- Memory usage graph
- Network requests timeline

⚡ **Real-time suggestions:**
- Автоматическое обнаружение проблем
- Instant код фиксы
- Performance optimization tips
- Best practices recommendations

✅ Debug режим активен! Попробуйте: "/debug inspect myVariable"`
        },
        {
            id: 12,
            command: 'экспортируй проект как template',
            hint: 'Sharing: "экспортируй проект как template"',
            description: 'Создание переиспользуемого шаблона',
            response: `📦 Создаю переиспользуемый template из вашего проекта...

🎯 **Claude Code Template Generator:**

📋 **Template "claude-code-academy" создан:**
\`\`\`yaml
template_name: "claude-code-academy"
version: "2.2.0"
description: "Interactive coding education platform"
author: "Claude Code Team"

features:
  - interactive_terminal
  - progress_tracking
  - responsive_design
  - modular_architecture
  - ai_integration

tech_stack:
  - HTML5
  - CSS3 (Custom Properties)
  - Vanilla JavaScript ES6+
  - Claude Design System
  - Vercel Deployment

customization_options:
  - theme_colors
  - lesson_content
  - branding
  - deployment_target
\`\`\`

🚀 **Template опубликован:**
- GitHub Template Repository: ✅
- NPM Package: ✅
- Claude Code Template Store: ✅
- Documentation: ✅

📋 **Использование template:**
\`\`\`bash
claude-code create-project my-academy \\
  --template claude-code-academy \\
  --theme custom \\
  --deploy vercel
\`\`\`

🌟 **Template включает:**
- Полную архитектуру проекта
- 4 готовых интерактивных урока
- Систему прогресса
- Responsive дизайн
- Deployment конфигурацию

💡 Теперь любой может создать подобную платформу за 5 минут!`
        },
        {
            id: 13,
            command: 'создай сертификат о прохождении',
            hint: 'Achievement: "создай сертификат о прохождении"',
            description: 'Генерация сертификата',
            response: `🏆 Генерирую персональный сертификат о прохождении курса...

📜 **СЕРТИФИКАТ CLAUDE CODE ACADEMY:**

\`\`\`
╔═══════════════════════════════════════════════════════════════╗
║                    🎓 СЕРТИФИКАТ О ПРОХОЖДЕНИИ                ║
║                                                               ║
║                    Claude Code Academy                        ║
║                                                               ║
║    Настоящим подтверждается, что                            ║
║                                                               ║
║                    [ИМЯ ПОЛЬЗОВАТЕЛЯ]                        ║
║                                                               ║
║    успешно прошел/прошла полный курс обучения                ║
║    "От Cursor к Claude Code за 30 минут"                     ║
║                                                               ║
║    Изучено:                                                   ║
║    ✅ Урок 1: Первые команды Claude Code                     ║
║    ✅ Урок 2: Естественные команды                           ║
║    ✅ Урок 3: Работа с проектом                              ║
║    ✅ Урок 4: Продвинутые фичи                               ║
║                                                               ║
║    Результат: 98/100 баллов                                  ║
║    Дата: \${new Date().toLocaleDateString()}                  ║
║                                                               ║
║    Подпись: Claude Code Team 🤖                              ║
╚═══════════════════════════════════════════════════════════════╝
\`\`\`

🎯 **Навыки подтверждены:**
- ✅ Базовые команды Claude Code
- ✅ Естественный язык в программировании
- ✅ Управление проектами с AI
- ✅ Продвинутые техники и автоматизация
- ✅ Production-ready разработка

📄 **Сертификат сохранен:**
- PDF версия: certificate_claude_code.pdf
- PNG изображение: certificate_image.png
- Blockchain verification: ✅
- LinkedIn интеграция: ✅

🌟 **Поздравляем с успешным завершением курса!**`
        },
        {
            id: 14,
            command: 'покажи карьерные возможности',
            hint: 'Career: "покажи карьерные возможности"',
            description: 'Карьерные перспективы',
            response: `💼 Анализирую карьерные возможности после освоения Claude Code...

🚀 **Карьерные треки с Claude Code:**

👨‍💻 **AI-Assisted Developer (+ 40% к зарплате):**
- Full-stack разработка с AI поддержкой
- Rapid prototyping и MVP создание
- Автоматизация рутинных задач
- Code review и оптимизация

🏗️ **AI Solutions Architect (+ 60% к зарплате):**
- Проектирование AI-enhanced приложений
- Integration planning для AI tools
- Team training по AI-assisted development
- Technical leadership в AI projects

🎓 **AI Coding Instructor/Consultant (+ 80% к зарплате):**
- Обучение команд Claude Code
- Создание образовательных программ
- Консалтинг по AI workflow optimization
- Workshop проведение и менторство

🔬 **Prompt Engineer (+ 100% к зарплате):**
- Оптимизация AI промптов для разработки
- Создание AI automation pipelines
- Research & Development в AI coding
- Building custom AI development tools

📊 **Статистика рынка:**
- 89% компаний планируют внедрение AI coding tools
- 156% рост спроса на AI-skilled developers
- \$120,000+ средняя зарплата AI-assisted developer
- 67% разработчиков используют AI ежедневно

🎯 **Следующие шаги:**
1. Создайте portfolio проектов с Claude Code
2. Получите сертификацию GitHub Copilot
3. Изучите prompt engineering
4. Присоединитесь к AI development communities

💡 **Ваши навыки Claude Code - это билет в будущее разработки!**`
        },
        {
            id: 15,
            command: 'завершить курс и получить rewards',
            hint: 'Финал: "завершить курс и получить rewards"',
            description: 'Завершение программы обучения',
            response: `🎉 ПОЗДРАВЛЯЕМ С ЗАВЕРШЕНИЕМ CLAUDE CODE ACADEMY! 🎉

🏆 **ФИНАЛЬНЫЕ ДОСТИЖЕНИЯ:**

✨ **Курс пройден на 100%!**
- ✅ Урок 1: Первые команды (8/8 шагов)
- ✅ Урок 2: Естественные команды (10/10 шагов)
- ✅ Урок 3: Работа с проектом (12/12 шагов)
- ✅ Урок 4: Продвинутые фичи (15/15 шагов)

🎁 **ЭКСКЛЮЗИВНЫЕ НАГРАДЫ:**

🔑 **Claude Code Pro License (1 год бесплатно)**
- Доступ к премиум фичам
- Приоритетная поддержка
- Advanced AI models

📚 **Эксклюзивные материалы:**
- "Claude Code Best Practices" (PDF)
- Video masterclass записи
- Доступ к закрытому Discord сообществу

🤝 **VIP статус:**
- Приглашения на exclusive webinars
- Early access к новым фичам
- Direct line с Claude Code team

🌟 **Специальные возможности:**
- Referral program (за каждого приведенного друга - \$50)
- Beta tester программа для новых фич
- Возможность стать Claude Code Ambassador
- Персональные консультации с AI experts

💎 **Эксклюзивные бонусы:**
- Claude Code merchandise kit
- Персональный LinkedIn badge
- Рекомендательное письмо от Claude Code Team
- Доступ к job board с AI-focused вакансиями

📈 **Ваша статистика:**
- Общее время обучения: 2 часа 47 минут
- Команд выполнено: 45
- Проектов создано: 8
- Навыков освоено: 23
- Рейтинг: 98/100 (Excellent!)

🚀 **Что дальше?**
1. Поделитесь сертификатом в LinkedIn
2. Присоединитесь к Claude Code Community
3. Начните применять навыки в реальных проектах
4. Рекомендуйте курс коллегам

💌 **Персональное сообщение от Claude:**
"Вы прошли невероятный путь от базовых команд до мастерского владения Claude Code! Теперь вы можете создавать проекты в 10x быстрее, используя силу AI. Помните: будущее разработки - это партнерство человека и ИИ. Вы готовы к этому будущему!

Удачи в ваших проектах! 🤖❤️"

🎊 **КУРС УСПЕШНО ЗАВЕРШЕН!**
Добро пожаловать в сообщество Claude Code Masters!

🔗 **Полезные ссылки:**
- Claude Code Documentation: docs.claude.com
- Community Discord: discord.gg/claude-code
- GitHub Repository: github.com/claude-code
- Support: support@claude.com

🎯 **Следующий уровень:** Claude Code Enterprise Masterclass
Приглашение будет отправлено на ваш email в течение 24 часов.

Thank you for being part of the future of coding! 🚀✨`
        }
    ],

    /**
     * Инициализация модуля урока
     */
    init() {
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');
        this.progressFill = document.getElementById('lesson-progress');
        this.progressText = document.getElementById('progress-text');
        this.currentHint = document.getElementById('current-hint');
        this.stepCards = document.querySelectorAll('.step-card');
        this.certificateContainer = document.getElementById('certificate-container');
        this.achievementBadges = document.getElementById('achievement-badges');
        this.celebrationContainer = document.getElementById('celebration-container');

        if (this.terminalInput && this.terminalOutput) {
            this.bindEvents();
            this.loadProgress();
            this.updateUI();
            console.log('Lesson4: Модуль инициализирован');
        } else {
            console.error('Lesson4: Не найдены необходимые DOM элементы');
        }
    },

    /**
     * Привязка обработчиков событий
     */
    bindEvents() {
        // Обработка ввода команд
        this.terminalInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleCommand();
            }
        });

        // Фокус на input при клике на терминал
        this.terminalOutput.parentElement.addEventListener('click', () => {
            this.terminalInput.focus();
        });
    },

    /**
     * Обработка команды пользователя
     */
    handleCommand() {
        const command = this.terminalInput.value.trim();
        if (!command) return;

        // Добавляем команду в терминал
        this.addTerminalLine('⚡ claude', command, 'user');
        this.terminalInput.value = '';

        // Проверяем команду
        this.processCommand(command);
    },

    /**
     * Обработка команды
     */
    processCommand(command) {
        const currentStep = this.lessonSteps[this.currentStepIndex];

        if (!currentStep) {
            this.addTerminalLine('⚡ claude', 'Все шаги урока завершены! 🎉', 'system');
            return;
        }

        // Проверяем соответствие команды (гибкое сравнение)
        if (this.isCommandMatch(command, currentStep.command)) {
            this.executeStep(currentStep);
        } else {
            this.addTerminalLine('⚡ claude', `Попробуйте: ${currentStep.command}`, 'hint');
        }
    },

    /**
     * Проверка соответствия команды
     */
    isCommandMatch(userCommand, expectedCommand) {
        const normalize = (str) => str.toLowerCase().trim().replace(/\s+/g, ' ');
        return normalize(userCommand) === normalize(expectedCommand) ||
               normalize(userCommand).includes(normalize(expectedCommand)) ||
               normalize(expectedCommand).includes(normalize(userCommand));
    },

    /**
     * Выполнение шага урока
     */
    executeStep(step) {
        // Добавляем ответ в терминал
        this.addTerminalLine('', step.response, 'response');

        // Проверяем, является ли это последним шагом
        if (step.id === 15) {
            this.celebrateCompletion();
        }

        // Обновляем прогресс
        this.completedSteps++;
        this.currentStepIndex++;

        // Обновляем UI
        this.updateUI();
        this.updateStepCard(step.id, 'completed');

        // Сохраняем прогресс
        this.saveProgress();

        // Проверяем завершение урока
        if (this.currentStepIndex >= this.totalSteps) {
            this.completeLesson();
        } else {
            // Обновляем подсказку для следующего шага
            this.updateHint();
        }
    },

    /**
     * Celebration для завершения
     */
    celebrateCompletion() {
        // Создаем fireworks
        this.createFireworks();

        // Показываем achievement badges
        this.showAchievementBadges();

        // Показываем сертификат
        this.showCertificate();

        // Добавляем celebration в терминал
        setTimeout(() => {
            this.addTerminalLine('🎊', '🎉 CELEBRATION TIME! 🎉', 'celebration');
            this.addTerminalLine('🎊', 'Финальный шаг выполнен! Получайте награды!', 'celebration');
        }, 500);
    },

    /**
     * Создание фейерверков
     */
    createFireworks() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * 100 + '%';
                firework.style.top = Math.random() * 100 + '%';
                firework.style.background = ['#FFD700', '#FF6B35', '#00ff00'][Math.floor(Math.random() * 3)];
                this.celebrationContainer.appendChild(firework);

                setTimeout(() => {
                    firework.remove();
                }, 2000);
            }, i * 50);
        }

        this.celebrationContainer.style.display = 'block';
    },

    /**
     * Показать achievement badges
     */
    showAchievementBadges() {
        const badges = [
            '🎓 Master Graduate',
            '🚀 AI Developer',
            '⚡ Code Wizard',
            '🏆 Champion',
            '💎 Expert Level'
        ];

        badges.forEach((badge, index) => {
            setTimeout(() => {
                const badgeElement = document.createElement('span');
                badgeElement.className = 'achievement-badge';
                badgeElement.textContent = badge;
                this.achievementBadges.appendChild(badgeElement);
            }, index * 300);
        });

        this.achievementBadges.style.display = 'block';
    },

    /**
     * Показать сертификат
     */
    showCertificate() {
        const certificateHTML = `
            <div class="certificate">
                <h2>🏆 СЕРТИФИКАТ О ПРОХОЖДЕНИИ</h2>
                <p><strong>Настоящим подтверждается, что</strong></p>
                <h3 style="color: #FF6B35; margin: 20px 0;">[Claude Code Student]</h3>
                <p><strong>успешно прошел полный курс обучения</strong></p>
                <p style="font-style: italic; margin: 20px 0;">"Claude Code Academy - От Cursor к Мастерству"</p>

                <div style="margin: 30px 0;">
                    <h4>Изученные навыки:</h4>
                    <p>✅ Базовые команды Claude Code</p>
                    <p>✅ Естественный язык в программировании</p>
                    <p>✅ Управление проектами с AI</p>
                    <p>✅ Продвинутые техники и автоматизация</p>
                    <p>✅ Production-ready разработка</p>
                </div>

                <div style="margin: 30px 0; padding: 20px; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
                    <h4>Результат: <span style="color: #FFD700; font-size: 24px;">98/100 баллов</span></h4>
                    <p>Отлично! Вы в топ 5% студентов!</p>
                </div>

                <p><strong>Дата:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>
                <p><strong>Подпись:</strong> Claude Code Team 🤖</p>
            </div>
        `;

        this.certificateContainer.innerHTML = certificateHTML;
        this.certificateContainer.style.display = 'block';
    },

    /**
     * Добавление строки в терминал
     */
    addTerminalLine(prompt, text, type = 'system') {
        const line = document.createElement('div');
        line.className = 'terminal-line';

        if (prompt) {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = prompt;
            line.appendChild(promptSpan);
        }

        const textSpan = document.createElement('span');
        textSpan.className = `text ${type}`;

        // Поддержка markdown-like форматирования
        textSpan.innerHTML = this.formatResponse(text);
        line.appendChild(textSpan);

        this.terminalOutput.appendChild(line);
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    },

    /**
     * Форматирование ответа с поддержкой markdown
     */
    formatResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="file-path">$1</code>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<div class="git-diff">$2</div>')
            .replace(/^(\+.*$)/gm, '<span class="git-addition">$1</span>')
            .replace(/^(-.*$)/gm, '<span class="git-deletion">$1</span>')
            .replace(/\n/g, '<br>');
    },

    /**
     * Обновление UI
     */
    updateUI() {
        // Обновляем прогресс бар
        const progressPercent = (this.completedSteps / this.totalSteps) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
        this.progressText.textContent = `${this.completedSteps} / ${this.totalSteps} шагов`;

        // Обновляем активный шаг
        this.stepCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentStepIndex) {
                card.classList.add('active');
            }
        });
    },

    /**
     * Обновление карточки шага
     */
    updateStepCard(stepId, status) {
        const card = document.querySelector(`[data-step="${stepId}"]`);
        if (card) {
            card.classList.remove('active');
            card.classList.add(status);

            const statusElement = card.querySelector('.step-status');
            if (statusElement) {
                statusElement.textContent = status === 'completed' ? '✅' : '⏳';
            }
        }
    },

    /**
     * Обновление подсказки
     */
    updateHint() {
        const nextStep = this.lessonSteps[this.currentStepIndex];
        if (nextStep && this.currentHint) {
            this.currentHint.innerHTML = `
                <h3>Шаг ${nextStep.id}: ${nextStep.description}</h3>
                <p>${nextStep.hint}</p>
            `;
        }
    },

    /**
     * Завершение урока
     */
    completeLesson() {
        setTimeout(() => {
            this.addTerminalLine('🎉', 'Поздравляем! Вы завершили урок 4!', 'success');
            this.addTerminalLine('🚀', 'Теперь вы мастер Claude Code!', 'success');

            // Показываем финальную кнопку (если есть)
            const nextLessonContainer = document.getElementById('next-lesson-container');
            if (nextLessonContainer) {
                nextLessonContainer.style.display = 'block';
            }

            // Разблокируем следующий урок
            if (window.Lessons) {
                window.Lessons.unlockLesson(5);
            }
        }, 1000);
    },

    /**
     * Загрузка прогресса из localStorage
     */
    loadProgress() {
        const saved = Utils.storage('lesson4-progress');
        if (saved) {
            this.currentStepIndex = saved.currentStepIndex || 0;
            this.completedSteps = saved.completedSteps || 0;

            // Восстанавливаем состояние карточек
            for (let i = 0; i < this.completedSteps; i++) {
                this.updateStepCard(i + 1, 'completed');
            }

            // Восстанавливаем историю терминала для выполненных шагов
            this.restoreTerminalHistory();

            // Обновляем подсказку для текущего шага
            this.updateHint();
        }
    },

    /**
     * Сохранение прогресса в localStorage
     */
    saveProgress() {
        Utils.storage('lesson4-progress', {
            currentStepIndex: this.currentStepIndex,
            completedSteps: this.completedSteps,
            totalSteps: this.totalSteps,
            lastUpdated: new Date().toISOString()
        });
    },

    /**
     * Сброс прогресса урока
     */
    resetProgress() {
        this.currentStepIndex = 0;
        this.completedSteps = 0;

        // Очищаем localStorage
        Utils.storage('lesson4-progress', null);

        // Сбрасываем UI
        this.stepCards.forEach((card, index) => {
            card.classList.remove('active', 'completed');
            if (index === 0) {
                card.classList.add('active');
            }

            const statusElement = card.querySelector('.step-status');
            if (statusElement) {
                statusElement.textContent = index === 0 ? '⏳' : '⭕';
            }
        });

        // Очищаем терминал
        this.terminalOutput.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">⚡ claude</span>
                <span class="text">Добро пожаловать в продвинутый режим Claude Code!</span>
            </div>
            <div class="terminal-line">
                <span class="prompt">⚡ claude</span>
                <span class="text">Финальный урок: изучаем секретные фичи и автоматизацию!</span>
            </div>
        `;

        this.updateUI();
        this.updateHint();

        console.log('Lesson4: Прогресс сброшен');
    },

    /**
     * Восстановление истории терминала для выполненных шагов
     */
    restoreTerminalHistory() {
        // Если нет выполненных шагов, оставляем начальные сообщения
        if (this.completedSteps === 0) {
            return;
        }

        // Очищаем терминал от начальных сообщений
        this.terminalOutput.innerHTML = '';

        // Добавляем приветственные сообщения
        this.addTerminalLine('⚡ claude', 'Добро пожаловать в продвинутый режим Claude Code!', 'system');
        this.addTerminalLine('⚡ claude', 'Финальный урок: изучаем секретные фичи и автоматизацию!', 'system');

        // Восстанавливаем историю выполненных команд
        for (let i = 0; i < this.completedSteps; i++) {
            const step = this.lessonSteps[i];
            if (step) {
                // Добавляем команду пользователя
                this.addTerminalLine('⚡ claude', step.command, 'user');
                // Добавляем ответ системы
                this.addTerminalLine('', step.response, 'response');
            }
        }

        // Если есть незавершенные шаги, показываем текущий контекст
        if (this.currentStepIndex < this.totalSteps) {
            this.addTerminalLine('⚡ claude', `Продолжаем с шага ${this.currentStepIndex + 1}...`, 'system');
        }
    }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('terminal-input')) {
        Lesson4.init();
    }
});

// Экспорт для глобального доступа
window.Lesson4 = Lesson4;
