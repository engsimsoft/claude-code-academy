/**
 * CLAUDE CODE ACADEMY - MAIN MODULE
 * App initialization
 * - DOMContentLoaded handlers
 * - Module initialization
 * - Error handling
 */

/**
 * Главный модуль приложения
 */
const App = {
  // Приватные переменные
  _isInitialized: false,
  _modules: [],
  _errorHandler: null,

  /**
   * Инициализация приложения
   */
  init() {
    if (this._isInitialized) {
      console.warn('App: Приложение уже инициализировано');
      return;
    }

    try {
      console.log('🚀 Claude Code Academy: Инициализация приложения...');

      // Настройка глобального обработчика ошибок
      this.setupErrorHandling();

      // Проверка поддержки браузера
      this.checkBrowserSupport();

      // Инициализация модулей
      this.initializeModules();

      // Настройка производительности
      this.setupPerformanceMonitoring();

      this._isInitialized = true;
      console.log('✅ Claude Code Academy: Приложение успешно инициализировано');

    } catch (error) {
      console.error('❌ Claude Code Academy: Ошибка инициализации:', error);
      this.handleCriticalError(error);
    }
  },

  /**
   * Настройка обработки ошибок
   */
  setupErrorHandling() {
    // Глобальный обработчик JavaScript ошибок
    window.addEventListener('error', (event) => {
      console.error('JavaScript Error:', event.error);
      this.logError('JavaScript Error', event.error);
    });

    // Обработчик необработанных Promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      this.logError('Unhandled Promise Rejection', event.reason);
      event.preventDefault();
    });

    // Обработчик ошибок загрузки ресурсов
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        console.error('Resource loading error:', event.target);
        this.logError('Resource loading error', {
          target: event.target,
          src: event.target.src || event.target.href
        });
      }
    }, true);
  },

  /**
   * Проверка поддержки браузера
   */
  checkBrowserSupport() {
    const support = Utils.checkBrowserSupport();

    if (!support.localStorage) {
      console.warn('⚠️ LocalStorage не поддерживается - прогресс уроков не будет сохраняться');
    }

    if (!support.intersectionObserver) {
      console.warn('⚠️ IntersectionObserver не поддерживается - некоторые анимации могут не работать');
    }

    if (!support.cssGrid) {
      console.warn('⚠️ CSS Grid не поддерживается - layout может отображаться некорректно');
    }
  },

  /**
   * Инициализация всех модулей
   */
  initializeModules() {
    console.log('📦 Инициализация модулей...');

    // Модули инициализируются автоматически через DOMContentLoaded
    // в каждом модуле, но здесь мы можем добавить дополнительную логику

    this._modules = [
      { name: 'Utils', status: 'ready' },
      { name: 'Navigation', status: 'ready' },
      { name: 'Lessons', status: 'ready' },
      { name: 'TerminalDemo', status: 'ready' }
    ];

    // Проверка готовности модулей
    this.checkModulesReady();
  },

  /**
   * Проверка готовности модулей
   */
  checkModulesReady() {
    setTimeout(() => {
      this._modules.forEach(module => {
        const moduleObj = window[module.name];
        if (moduleObj && typeof moduleObj.init === 'function') {
          module.status = 'initialized';
        } else {
          module.status = 'error';
          console.warn(`⚠️ Модуль ${module.name} не инициализирован`);
        }
      });

      console.log('📊 Статус модулей:', this._modules);
    }, 100);
  },

  /**
   * Настройка мониторинга производительности
   */
  setupPerformanceMonitoring() {
    // Отслеживание времени загрузки
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`⏱️ Время загрузки страницы: ${loadTime}ms`);

        // Отправка метрик (в будущем можно интегрировать с аналитикой)
        this.trackPerformanceMetric('pageLoadTime', loadTime);
      });
    }

    // Отслеживание Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`🎨 LCP: ${lastEntry.startTime}ms`);
          this.trackPerformanceMetric('lcp', lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('PerformanceObserver не поддерживается');
      }
    }
  },

  /**
   * Отслеживание метрик производительности
   * @param {string} metric - Название метрики
   * @param {number} value - Значение метрики
   */
  trackPerformanceMetric(metric, value) {
    // В будущем здесь можно отправлять метрики в систему аналитики
    const metrics = Utils.storage('performance-metrics') || {};
    metrics[metric] = {
      value: value,
      timestamp: Date.now()
    };
    Utils.storage('performance-metrics', metrics);
  },

  /**
   * Логирование ошибок
   * @param {string} type - Тип ошибки
   * @param {Error|Object} error - Объект ошибки
   */
  logError(type, error) {
    const errorLog = {
      type: type,
      message: error.message || error,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Сохранение в localStorage для отладки
    const errors = Utils.storage('error-logs') || [];
    errors.push(errorLog);

    // Ограничение количества сохраненных ошибок
    if (errors.length > 10) {
      errors.shift();
    }

    Utils.storage('error-logs', errors);

    // В будущем можно отправлять ошибки на сервер
  },

  /**
   * Обработка критических ошибок
   * @param {Error} error - Критическая ошибка
   */
  handleCriticalError(error) {
    console.error('🚨 Критическая ошибка приложения:', error);

    // Показать пользователю fallback UI
    this.showErrorFallback();

    // Логирование критической ошибки
    this.logError('Critical App Error', error);
  },

  /**
   * Показать fallback UI при критической ошибке
   */
  showErrorFallback() {
    const fallbackHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #F7F5F3;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">
        <div style="text-align: center; padding: 2rem;">
          <h1 style="color: #FF6B35; margin-bottom: 1rem;">🚨 Ошибка загрузки</h1>
          <p style="color: #2D1B0E; margin-bottom: 2rem;">
            Не удалось загрузить Claude Code Academy
          </p>
          <button onclick="location.reload()"
            style="
              background: #1a1a1a;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
            ">
            Обновить страницу
          </button>
        </div>
      </div>
    `;

    document.body.innerHTML = fallbackHTML;
  },

  /**
   * Получение информации о приложении
   * @returns {Object} - Информация о приложении
   */
  getAppInfo() {
    return {
      version: '1.0.0',
      initialized: this._isInitialized,
      modules: this._modules,
      browserSupport: Utils.checkBrowserSupport(),
      performanceMetrics: Utils.storage('performance-metrics') || {}
    };
  },

  /**
   * Сброс приложения (для тестирования)
   */
  reset() {
    Utils.storage('claude-lessons-progress', null);
    Utils.storage('performance-metrics', null);
    Utils.storage('error-logs', null);

    console.log('🔄 Приложение сброшено');
    location.reload();
  }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Экспорт для использования в других модулях
window.App = App;