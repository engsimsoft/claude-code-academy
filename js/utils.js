/**
 * CLAUDE CODE ACADEMY - UTILITY FUNCTIONS
 * Вспомогательные функции для работы с DOM, анимациями и событиями
 */

/**
 * Debounce функция для ограничения частоты вызовов
 * @param {Function} func - Функция для debounce
 * @param {number} wait - Задержка в миллисекундах
 * @returns {Function} - Debounced функция
 */
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

/**
 * Throttle функция для ограничения частоты вызовов
 * @param {Function} func - Функция для throttle
 * @param {number} limit - Ограничение в миллисекундах
 * @returns {Function} - Throttled функция
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Проверка видимости элемента в viewport
 * @param {Element} element - DOM элемент
 * @returns {boolean} - Виден ли элемент
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Плавная прокрутка к элементу
 * @param {Element} element - Целевой элемент
 * @param {Object} options - Опции прокрутки
 */
function scrollToElement(element, options = {}) {
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  element.scrollIntoView({ ...defaultOptions, ...options });
}

/**
 * Получение значения CSS переменной
 * @param {string} variableName - Имя переменной (без --)
 * @returns {string} - Значение переменной
 */
function getCSSVariable(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${variableName}`).trim();
}

/**
 * Установка значения CSS переменной
 * @param {string} variableName - Имя переменной (без --)
 * @param {string} value - Новое значение
 */
function setCSSVariable(variableName, value) {
  document.documentElement.style.setProperty(`--${variableName}`, value);
}

/**
 * Добавление класса с анимацией
 * @param {Element} element - DOM элемент
 * @param {string} className - Имя класса
 * @param {number} delay - Задержка в мс
 */
function addClassWithAnimation(element, className, delay = 0) {
  setTimeout(() => {
    element.classList.add(className);
  }, delay);
}

/**
 * Удаление класса с анимацией
 * @param {Element} element - DOM элемент
 * @param {string} className - Имя класса
 * @param {number} delay - Задержка в мс
 */
function removeClassWithAnimation(element, className, delay = 0) {
  setTimeout(() => {
    element.classList.remove(className);
  }, delay);
}

/**
 * Создание DocumentFragment для множественных DOM операций
 * @param {Array} elements - Массив элементов для добавления
 * @returns {DocumentFragment} - Fragment с элементами
 */
function createFragment(elements) {
  const fragment = document.createDocumentFragment();
  elements.forEach(element => {
    fragment.appendChild(element);
  });
  return fragment;
}

/**
 * Event delegation helper
 * @param {string} selector - CSS селектор
 * @param {Function} handler - Обработчик события
 * @returns {Function} - Функция для добавления к элементу
 */
function createDelegatedHandler(selector, handler) {
  return function(event) {
    const target = event.target.closest(selector);
    if (target) {
      handler.call(target, event);
    }
  };
}

/**
 * Локальное хранилище с fallback
 * @param {string} key - Ключ
 * @param {*} value - Значение (если не указано, то получение)
 * @returns {*} - Значение или null
 */
function storage(key, value) {
  try {
    if (value === undefined) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    }
  } catch (error) {
    console.warn('LocalStorage недоступен:', error);
    return null;
  }
}

/**
 * Проверка поддержки Web APIs
 * @returns {Object} - Объект с поддержкой различных API
 */
function checkBrowserSupport() {
  return {
    intersectionObserver: 'IntersectionObserver' in window,
    localStorage: 'localStorage' in window,
    serviceWorker: 'serviceWorker' in navigator,
    webAnimations: 'animate' in document.createElement('div'),
    cssGrid: CSS.supports('display', 'grid'),
    cssCustomProperties: CSS.supports('--custom-property', 'value')
  };
}

// Экспорт функций для использования в других модулях
window.Utils = {
  debounce,
  throttle,
  isElementInViewport,
  scrollToElement,
  getCSSVariable,
  setCSSVariable,
  addClassWithAnimation,
  removeClassWithAnimation,
  createFragment,
  createDelegatedHandler,
  storage,
  checkBrowserSupport
};