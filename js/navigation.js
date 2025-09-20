/**
 * CLAUDE CODE ACADEMY - NAVIGATION MODULE
 * Навигация и smooth scroll
 * - Smooth scroll между секциями
 * - Auto-hide header при скролле
 * - Active section highlighting
 */

/**
 * Модуль навигации
 */
const Navigation = {
  // Приватные переменные
  _lastScrollY: 0,
  _header: null,
  _navLinks: null,

  /**
   * Инициализация модуля навигации
   */
  init() {
    this._header = document.querySelector('.header');
    this._navLinks = document.querySelectorAll('a[href^="#"]');

    if (!this._header || !this._navLinks.length) {
      console.warn('Navigation: Не найдены необходимые элементы');
      return;
    }

    this.bindEvents();
    this.setupScrollSpy();
    console.log('Navigation: Модуль инициализирован');
  },

  /**
   * Привязка обработчиков событий
   */
  bindEvents() {
    // Smooth scroll для навигационных ссылок
    this._navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Auto-hide header при скролле
    window.addEventListener('scroll', () => this.handleScroll());

    // Обработка изменения размера окна
    window.addEventListener('resize', Utils.debounce(() => this.handleResize(), 250));
  },

  /**
   * Обработка клика по навигационной ссылке
   * @param {Event} event - Событие клика
   */
  handleNavClick(event) {
    event.preventDefault();

    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Плавная прокрутка к секции
      Utils.scrollToElement(targetElement, {
        behavior: 'smooth',
        block: 'start'
      });

      // Обновление активной ссылки
      this.updateActiveLink(targetId);

      // Закрытие мобильного меню (если есть)
      this.closeMobileMenu();
    }
  },

  /**
   * Обработка скролла для auto-hide header
   */
  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this._lastScrollY && currentScrollY > 100) {
      // Скролл вниз - скрываем header
      this._header.classList.add('hidden');
    } else {
      // Скролл вверх - показываем header
      this._header.classList.remove('hidden');
    }

    this._lastScrollY = currentScrollY;

    // Обновление активной секции при скролле
    this.updateActiveSection();
  },

  /**
   * Обработка изменения размера окна
   */
  handleResize() {
    // Пересчет позиций секций при изменении размера
    this.updateActiveSection();
  },

  /**
   * Настройка scroll spy для выделения активной секции
   */
  setupScrollSpy() {
    // Создание IntersectionObserver для отслеживания видимости секций
    if (Utils.checkBrowserSupport().intersectionObserver) {
      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.updateActiveLink(`#${sectionId}`);
          }
        });
      }, observerOptions);

      // Наблюдение за всеми секциями
      document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
      });
    }
  },

  /**
   * Обновление активной секции при скролле (fallback для старых браузеров)
   */
  updateActiveSection() {
    if (Utils.checkBrowserSupport().intersectionObserver) return;

    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.id;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.updateActiveLink(`#${sectionId}`);
      }
    });
  },

  /**
   * Обновление активной навигационной ссылки
   * @param {string} activeHref - href активной секции
   */
  updateActiveLink(activeHref) {
    this._navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      }
    });
  },

  /**
   * Закрытие мобильного меню (заглушка для будущей реализации)
   */
  closeMobileMenu() {
    // Здесь будет логика закрытия мобильного меню
    // когда оно будет реализовано
  },

  /**
   * Прокрутка к секции программно
   * @param {string} sectionId - ID секции
   */
  scrollToSection(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      Utils.scrollToElement(targetElement, {
        behavior: 'smooth',
        block: 'start'
      });
      this.updateActiveLink(sectionId);
    }
  },

  /**
   * Получение текущей активной секции
   * @returns {string} - ID активной секции
   */
  getCurrentSection() {
    const activeLink = document.querySelector('.nav a.active');
    return activeLink ? activeLink.getAttribute('href') : null;
  }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});

// Экспорт для использования в других модулях
window.Navigation = Navigation;