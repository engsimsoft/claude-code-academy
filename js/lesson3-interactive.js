/**
 * CLAUDE CODE ACADEMY - LESSON 3 INTERACTIVE MODULE
 * Интерактивная логика третьего урока - "Работа с проектом"
 */

const Lesson3 = {
    // Состояние урока
    currentStepIndex: 0,
    completedSteps: 0,
    totalSteps: 12,

    // DOM элементы
    terminalInput: null,
    terminalOutput: null,
    progressFill: null,
    progressText: null,
    currentHint: null,
    stepCards: null,

    // Шаги урока
    lessonSteps: [
        {
            id: 1,
            command: '@package.json покажи зависимости',
            hint: 'Используйте @ синтаксис: "@package.json покажи зависимости"',
            description: 'Навигация по файлам проекта',
            response: `📁 Анализирую файл @package.json...

📦 Зависимости проекта:

**Production:**
- react: ^18.2.0
- react-dom: ^18.2.0  
- react-router-dom: ^6.8.0
- styled-components: ^5.3.6

**Development:**
- @types/react: ^18.0.0
- @vitejs/plugin-react: ^3.1.0
- typescript: ^4.9.0
- vitest: ^0.28.0

💡 Claude Code понимает структуру проекта через @ синтаксис!
Попробуйте: @src/App.jsx, @README.md, @tsconfig.json`
        },
        {
            id: 2,
            command: '@src/components найди все кнопки',
            hint: 'Команда: "@src/components найди все кнопки"',
            description: 'Поиск компонентов по папкам',
            response: `🔍 Сканирую папку @src/components для кнопок...

📋 Найденные компоненты кнопок:

**@src/components/Button/Button.jsx:**
\`\`\`jsx
export const Button = ({ variant, children, ...props }) => {
  return <button className={\`btn btn-\${variant}\`} {...props}>{children}</button>
}
\`\`\`

**@src/components/ActionButton/ActionButton.jsx:**
\`\`\`jsx
export const ActionButton = ({ icon, label, onClick }) => {
  return <button onClick={onClick}>{icon} {label}</button>
}
\`\`\`

**Также найдено:**
- @src/components/SubmitButton/SubmitButton.tsx
- @src/components/IconButton/IconButton.jsx

💡 Всего 4 компонента кнопок. Нужен рефакторинг для унификации?`
        },
        {
            id: 3,
            command: 'создай единый Button компонент',
            hint: 'Рефакторинг: "создай единый Button компонент"',
            description: 'Унификация компонентов',
            response: `🔧 Создаю унифицированный Button компонент...

📝 @src/components/Button/index.tsx:

\`\`\`tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  children,
  ...props
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size} \${loading ? 'loading' : ''}\`}
      disabled={loading}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {loading ? 'Загрузка...' : children}
    </button>
  );
};
\`\`\`

✅ Унифицированный компонент создан! 
💡 Теперь можно заменить все остальные кнопки.`
        },
        {
            id: 4,
            command: 'замени все старые кнопки на новый компонент',
            hint: 'Рефакторинг: "замени все старые кнопки на новый компонент"',
            description: 'Автоматический рефакторинг',
            response: `🔄 Выполняю автоматический рефакторинг кнопок...

📝 Изменения в файлах:

**@src/pages/Home.jsx:**
\`\`\`diff
- import { ActionButton } from '../components/ActionButton'
+ import { Button } from '../components/Button'

- <ActionButton icon="🚀" label="Начать" onClick={handleStart} />
+ <Button variant="primary" icon="🚀" onClick={handleStart}>Начать</Button>
\`\`\`

**@src/forms/ContactForm.jsx:**
\`\`\`diff
- import { SubmitButton } from '../components/SubmitButton'
+ import { Button } from '../components/Button'

- <SubmitButton loading={isSubmitting}>Отправить</SubmitButton>
+ <Button variant="primary" loading={isSubmitting}>Отправить</Button>
\`\`\`

📊 Результат рефакторинга:
- Заменено 23 использования в 8 файлах
- Удалено 3 устаревших компонента
- Уменьшен bundle size на 12KB

✅ Рефакторинг завершен успешно!`
        },
        {
            id: 5,
            command: 'покажи статус git и что изменилось',
            hint: 'Git команда: "покажи статус git и что изменилось"',
            description: 'Git status и diff',
            response: `📊 Git статус проекта:

🔄 **Измененные файлы:**
\`\`\`
M  src/components/Button/index.tsx (новый файл)
M  src/pages/Home.jsx
M  src/forms/ContactForm.jsx
M  src/components/Header.jsx
D  src/components/ActionButton/ActionButton.jsx (удален)
D  src/components/SubmitButton/SubmitButton.tsx (удален)
D  src/components/IconButton/IconButton.jsx (удален)
\`\`\`

📈 **Статистика изменений:**
- 23 файла изменено
- 156 добавлений (+)
- 89 удалений (-)
- 3 файла удалено

🌿 **Текущая ветка:** feature/button-refactoring
📌 **Последний коммит:** feat: add lesson-2 natural commands

💡 Готово к коммиту? Скажите "создай коммит" для автоматического commit!`
        },
        {
            id: 6,
            command: 'создай коммит с хорошим сообщением',
            hint: 'Git commit: "создай коммит с хорошим сообщением"',
            description: 'Автоматический Git commit',
            response: `📝 Создаю коммит с описательным сообщением...

🔄 Выполняю git операции:

\`\`\`bash
git add .
git commit -m "refactor: унифицировать Button компоненты

- Создан единый Button компонент с TypeScript
- Поддержка variant, size, icon, loading props
- Заменены ActionButton, SubmitButton, IconButton
- Уменьшен bundle size на 12KB
- Улучшена consistency UI

Breaking changes: Изменен API кнопок
Co-authored-by: Claude Code <claude@anthropic.com>"
\`\`\`

✅ **Коммит создан:** \`abc123f\` 

📊 **Статистика коммита:**
- 8 файлов изменено
- +156 -89 строк
- Качественное commit message

💡 Готово к пушу в remote repository!`
        },
        {
            id: 7,
            command: 'проанализируй архитектуру проекта',
            hint: 'Анализ: "проанализируй архитектуру проекта"',
            description: 'Architectural review',
            response: `🏗️ Анализирую архитектуру проекта...

📊 **Структура проекта:**
\`\`\`
src/
├── components/        👍 Хорошо организовано
│   ├── Button/       ✅ Унифицированный компонент
│   ├── Header/       ✅ Переиспользуемый
│   └── Layout/       ✅ Правильная абстракция
├── pages/            👍 Четкое разделение
├── hooks/            ⚠️  Можно добавить custom hooks
├── utils/            👍 Вспомогательные функции
├── styles/           ⚠️  Стоит использовать CSS-in-JS
└── types/            ❌ Отсутствует - нужно добавить
\`\`\`

🔍 **Рекомендации по улучшению:**

1. **TypeScript покрытие:** 73% → 90%+
2. **Custom hooks:** Вынести логику из компонентов
3. **Type definitions:** Создать общие типы
4. **Performance:** Добавить React.memo для тяжелых компонентов
5. **Testing:** Увеличить покрытие тестами

📈 **Текущий tech debt score:** 7.2/10 (хорошо!)`
        },
        {
            id: 8,
            command: 'создай недостающие TypeScript типы',
            hint: 'TypeScript: "создай недостающие TypeScript типы"',
            description: 'Type definitions',
            response: `📝 Создаю TypeScript определения типов...

📁 **@src/types/index.ts:**
\`\`\`typescript
// API Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  steps: LessonStep[];
  progress: number;
  completed: boolean;
}

export interface LessonStep {
  id: number;
  command: string;
  hint: string;
  response: string;
  completed: boolean;
}

// UI Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

// Utility Types
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type Theme = 'light' | 'dark';
\`\`\`

✅ **Создано 8 основных типов**
🔧 **Настроен strict mode в tsconfig.json**
📊 **TypeScript покрытие:** 73% → 94%`
        },
        {
            id: 9,
            command: 'добавь кастомные хуки для логики',
            hint: 'React hooks: "добавь кастомные хуки для логики"',
            description: 'Custom hooks extraction',
            response: `🪝 Создаю кастомные хуки для переиспользования логики...

📁 **@src/hooks/useLesson.ts:**
\`\`\`typescript
export const useLesson = (lessonId: number) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const completeStep = useCallback((stepId: number) => {
    setLesson(prev => ({
      ...prev!,
      steps: prev!.steps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    }));
  }, []);

  const nextStep = () => setCurrentStep(prev => prev + 1);
  
  return { lesson, currentStep, loading, completeStep, nextStep };
};
\`\`\`

📁 **@src/hooks/useTerminal.ts:**
\`\`\`typescript
export const useTerminal = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  
  const executeCommand = useCallback((command: string) => {
    setHistory(prev => [...prev, command]);
    // Command processing logic
  }, []);

  return { output, history, executeCommand };
};
\`\`\`

✅ **Создано 6 кастомных хуков**
🔧 **Вынесена логика из 12 компонентов**
📊 **Переиспользование кода:** +40%`
        },
        {
            id: 10,
            command: 'оптимизируй производительность компонентов',
            hint: 'Performance: "оптимизируй производительность компонентов"',
            description: 'React performance optimization',
            response: `⚡ Оптимизирую производительность React компонентов...

🔧 **Применяю оптимизации:**

**1. React.memo для тяжелых компонентов:**
\`\`\`tsx
export const LessonCard = React.memo(({ lesson, onStart }) => {
  // Component logic
}, (prevProps, nextProps) => 
  prevProps.lesson.id === nextProps.lesson.id &&
  prevProps.lesson.progress === nextProps.lesson.progress
);
\`\`\`

**2. useCallback для функций:**
\`\`\`tsx
const handleCommand = useCallback((command: string) => {
  executeCommand(command);
}, [executeCommand]);
\`\`\`

**3. useMemo для тяжелых вычислений:**
\`\`\`tsx
const filteredLessons = useMemo(() => 
  lessons.filter(lesson => lesson.completed === false),
  [lessons]
);
\`\`\`

**4. Lazy loading компонентов:**
\`\`\`tsx
const LessonModal = lazy(() => import('./LessonModal'));
\`\`\`

📊 **Результаты оптимизации:**
- Время рендера: -60%
- Bundle size: -15%
- FCP (First Contentful Paint): 1.2s → 0.8s
- Lighthouse Score: 94 → 98`
        },
        {
            id: 11,
            command: 'настрой автоматические тесты',
            hint: 'Testing: "настрой автоматические тесты"',
            description: 'Test automation setup',
            response: `🧪 Настраиваю автоматическое тестирование...

📝 **@src/components/Button/Button.test.tsx:**
\`\`\`tsx
describe('Button Component', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

⚙️ **Настроен CI/CD pipeline:**
\`\`\`yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run type-check
\`\`\`

📊 **Test coverage:** 87%
✅ **CI/CD готов к автоматическому тестированию**`
        },
        {
            id: 12,
            command: 'создай план развития проекта',
            hint: 'Финальная команда: "создай план развития проекта"',
            description: 'Project roadmap planning',
            response: `🗺️ Создаю стратегический план развития проекта...

📋 **ROADMAP Claude Code Academy:**

**🎯 Phase 3 (Текущая) - Advanced Features:**
- ✅ Lesson 1-3 готовы
- 🔄 Lesson 4: "Продвинутые фичи" (в разработке)
- 🔄 Интеграция с реальным Claude Code API

**🚀 Phase 4 - Platform Expansion:**
- 📱 PWA (Progressive Web App)
- 🎨 Advanced UI/UX improvements
- 👥 User accounts & progress tracking
- 🏆 Certificates & achievements

**🌟 Phase 5 - Community & Scale:**
- 📚 15+ дополнительных уроков
- 🌍 Мультиязычность (EN, ES, FR)
- 🤝 Community features (форум, Q&A)
- 📊 Analytics & learning insights

**🔧 Technical Roadmap:**
- 🔄 Migration to Next.js 14
- 🗄️ Database integration (Supabase)
- 🔐 Authentication (Auth0)
- ☁️ Serverless architecture

**📈 Business Goals:**
- 🎯 10,000+ активных пользователей
- ⭐ 95%+ satisfaction rate
- 🚀 Integration partnerships
- 💼 Enterprise solutions

✅ **План готов к реализации!**`
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

        if (this.terminalInput && this.terminalOutput) {
            this.bindEvents();
            this.loadProgress();
            this.updateUI();
            console.log('Lesson3: Модуль инициализирован');
        } else {
            console.error('Lesson3: Не найдены необходимые DOM элементы');
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
        this.addTerminalLine('➜ project', command, 'user');
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
            this.addTerminalLine('➜ project', 'Все шаги урока завершены! 🎉', 'system');
            return;
        }

        // Проверяем соответствие команды (гибкое сравнение)
        if (this.isCommandMatch(command, currentStep.command)) {
            this.executeStep(currentStep);
        } else {
            this.addTerminalLine('➜ project', `Попробуйте: ${currentStep.command}`, 'hint');
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
            this.addTerminalLine('🎉', 'Поздравляем! Вы завершили урок 3!', 'success');
            this.addTerminalLine('🚀', 'Теперь вы умеете работать с проектами в Claude Code!', 'success');
            
            // Показываем кнопку следующего урока
            const nextLessonContainer = document.getElementById('next-lesson-container');
            if (nextLessonContainer) {
                nextLessonContainer.style.display = 'block';
            }

            // Разблокируем следующий урок
            if (window.Lessons) {
                window.Lessons.unlockLesson(4);
            }
        }, 1000);
    },

    /**
     * Загрузка прогресса из localStorage
     */
    loadProgress() {
        const saved = Utils.storage('lesson3-progress');
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
        Utils.storage('lesson3-progress', {
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
        Utils.storage('lesson3-progress', null);
        
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
                <span class="prompt">➜ project</span>
                <span class="text">Добро пожаловать в продвинутый режим Claude Code!</span>
            </div>
            <div class="terminal-line">
                <span class="prompt">➜ project</span>
                <span class="text">Здесь вы изучите работу с файлами, Git и архитектурой проекта.</span>
            </div>
        `;
        
        this.updateUI();
        this.updateHint();
        
        console.log('Lesson3: Прогресс сброшен');
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
        this.addTerminalLine('➜ project', 'Добро пожаловать в продвинутый режим Claude Code!', 'system');
        this.addTerminalLine('➜ project', 'Здесь вы изучите работу с файлами, Git и архитектурой проекта.', 'system');
        
        // Восстанавливаем историю выполненных команд
        for (let i = 0; i < this.completedSteps; i++) {
            const step = this.lessonSteps[i];
            if (step) {
                // Добавляем команду пользователя
                this.addTerminalLine('➜ project', step.command, 'user');
                // Добавляем ответ системы
                this.addTerminalLine('', step.response, 'response');
            }
        }
        
        // Если есть незавершенные шаги, показываем текущий контекст
        if (this.currentStepIndex < this.totalSteps) {
            this.addTerminalLine('➜ project', `Продолжаем с шага ${this.currentStepIndex + 1}...`, 'system');
        }
    }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('terminal-input')) {
        Lesson3.init();
    }
});

// Экспорт для глобального доступа
window.Lesson3 = Lesson3;
