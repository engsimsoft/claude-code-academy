/**
 * CLAUDE CODE ACADEMY - LESSONS MODULE
 * Интерактивность lesson cards
 * - Click handlers для карточек
 * - Progress bar animations
 * - State management уроков
 */

/**
 * Модуль управления уроками
 */
const Lessons = {
  // Приватные переменные
  _lessonCards: null,
  _progressData: null,

  /**
   * Инициализация модуля уроков
   */
  init() {
    this._lessonCards = document.querySelectorAll('.lesson-card');
    this.loadProgressData();
    this.bindEvents();
    this.updateLessonLocks();

    if (this._lessonCards.length > 0) {
      console.log('Lessons: Модуль инициализирован, найдено карточек:', this._lessonCards.length);
    } else {
      console.warn('Lessons: Не найдены карточки уроков');
    }
  },

  /**
   * Загрузка данных прогресса из localStorage
   */
  loadProgressData() {
    // Синхронизировать с данными из уроков
    const lesson1Progress = Utils.storage('lesson1-progress') || { currentStepIndex: 0, completedSteps: 0 };

    this._progressData = Utils.storage('claude-lessons-progress') || {
      lesson1: {
        progress: lesson1Progress.completedSteps === 8 ? 100 : Math.round((lesson1Progress.completedSteps / 8) * 100),
        completed: lesson1Progress.completedSteps === 8
      },
      lesson2: { progress: 0, completed: false },
      lesson3: { progress: 0, completed: false },
      lesson4: { progress: 0, completed: false }
    };

    this.updateAllProgressBars();
    this.updateLessonLocks();
  },

  /**
   * Сохранение данных прогресса в localStorage
   */
  saveProgressData() {
    Utils.storage('claude-lessons-progress', this._progressData);
  },

  /**
   * Привязка обработчиков событий
   */
  bindEvents() {
    // Event delegation для карточек уроков
    document.addEventListener('click', Utils.createDelegatedHandler('.lesson-card', (event) => {
      this.handleLessonCardClick(event);
    }));

    // Обработка клавиатурной навигации
    document.addEventListener('keydown', (event) => {
      if (event.target.classList.contains('lesson-card')) {
        this.handleLessonCardKeydown(event);
      }
    });
  },

  /**
   * Обработка клика по карточке урока
   * @param {Event} event - Событие клика
   */
  handleLessonCardClick(event) {
    const card = event.currentTarget;
    const lessonNumber = this.getLessonNumber(card);

    if (lessonNumber) {
      this.incrementProgress(lessonNumber);
      this.animateProgressBar(card);

      // Добавление визуальной обратной связи
      this.addClickFeedback(card);
    }
  },

  /**
   * Обработка клавиатурных событий для карточек
   * @param {Event} event - Клавиатурное событие
   */
  handleLessonCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleLessonCardClick(event);
    }
  },

  /**
   * Получение номера урока из карточки
   * @param {Element} card - Карточка урока
   * @returns {number|null} - Номер урока
   */
  getLessonNumber(card) {
    const numberElement = card.querySelector('.lesson-number');
    if (numberElement) {
      return parseInt(numberElement.textContent);
    }
    return null;
  },

  /**
   * Увеличение прогресса урока
   * @param {number} lessonNumber - Номер урока
   */
  incrementProgress(lessonNumber) {
    const lessonKey = `lesson${lessonNumber}`;
    const currentProgress = this._progressData[lessonKey].progress;

    if (currentProgress < 100) {
      const newProgress = Math.min(currentProgress + 25, 100);
      this._progressData[lessonKey].progress = newProgress;

      if (newProgress === 100) {
        this._progressData[lessonKey].completed = true;
        this.handleLessonCompletion(lessonNumber);
      }

      this.saveProgressData();
    }
  },

  /**
   * Обработка завершения урока
   * @param {number} lessonNumber - Номер урока
   */
  handleLessonCompletion(lessonNumber) {
    console.log(`Урок ${lessonNumber} завершен!`);

    // Показать поздравление
    this.showCompletionMessage(lessonNumber);

    // Разблокировать следующий урок
    if (lessonNumber < 4) {
      this.unlockNextLesson(lessonNumber + 1);
    }

    // Обновить прогресс в localStorage
    this.saveProgressData();
  },

  /**
   * Показать сообщение о завершении урока
   * @param {number} lessonNumber - Номер урока
   */
  showCompletionMessage(lessonNumber) {
    // Создание toast уведомления
    const toast = document.createElement('div');
    toast.className = 'completion-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">🎉</span>
        <span>Урок ${lessonNumber} завершен!</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Анимация появления
    Utils.addClassWithAnimation(toast, 'show', 100);

    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  },

  /**
   * Разблокировка следующего урока
   * @param {number} nextLessonNumber - Номер следующего урока
   */
  unlockNextLesson(nextLessonNumber) {
    console.log(`Lessons: Попытка разблокировки урока ${nextLessonNumber}`);

    const nextCard = document.querySelector(`[data-lesson="${nextLessonNumber}"]`);
    console.log('Lessons: Найдена карточка:', nextCard);

    if (nextCard) {
      console.log('Lessons: Разблокируем урок', nextLessonNumber);

      // Удаляем класс locked, добавляем unlocked
      nextCard.classList.remove('locked');
      nextCard.classList.add('unlocked');
      nextCard.removeAttribute('aria-disabled');
      console.log('Lessons: Классы обновлены');

      // Удалить значок замка
      const lockIcon = nextCard.querySelector('.lesson-lock');
      if (lockIcon) {
        lockIcon.remove();
        console.log('Lessons: Значок замка удален');
      }

      // Добавить ссылку для разблокированного урока
      if (!nextCard.parentNode.classList.contains('lesson-card-link')) {
        console.log('Lessons: Оборачиваем в ссылку');
        const lessonLink = document.createElement('a');
        lessonLink.href = `lesson-${nextLessonNumber}.html`;
        lessonLink.className = 'lesson-card-link';
        lessonLink.style.display = 'block';
        lessonLink.style.textDecoration = 'none';
        lessonLink.style.color = 'inherit';

        nextCard.parentNode.replaceChild(lessonLink, nextCard);
        lessonLink.appendChild(nextCard);
        console.log('Lessons: Урок успешно разблокирован');
      } else {
        console.log('Lessons: Карточка уже обернута в ссылку');
      }
    } else {
      console.error(`Lessons: Карточка урока ${nextLessonNumber} не найдена`);
    }
  },

  /**
   * Обновление состояния блокировки уроков
   */
  updateLessonLocks() {
    console.log('Lessons: Обновление состояния блокировки уроков');
    const lessonCards = document.querySelectorAll('.lesson-card');
    console.log('Lessons: Найдено карточек:', lessonCards.length);

    lessonCards.forEach((card, index) => {
      const lessonNumber = index + 1;
      const lessonData = this._progressData[`lesson${lessonNumber}`];
      console.log(`Lessons: Урок ${lessonNumber}, данные:`, lessonData);

      // Все уроки теперь разблокированы
      card.classList.remove('locked');
      card.classList.add('unlocked');
      card.removeAttribute('aria-disabled');
      console.log(`Lessons: Урок ${lessonNumber} разблокирован`);

      // Удалить значок замка если есть
      const lockIcon = card.querySelector('.lesson-lock');
      if (lockIcon) {
        lockIcon.remove();
        console.log('Lessons: Значок замка удален');
      }

      // Убедимся, что карточка обернута в ссылку
      if (!card.parentNode.classList.contains('lesson-card-link')) {
        console.log(`Lessons: Оборачиваем урок ${lessonNumber} в ссылку`);
        const lessonLink = document.createElement('a');
        lessonLink.href = `lesson-${lessonNumber}.html`;
        lessonLink.className = 'lesson-card-link';
        lessonLink.style.display = 'block';
        lessonLink.style.textDecoration = 'none';
        lessonLink.style.color = 'inherit';

        card.parentNode.replaceChild(lessonLink, card);
        lessonLink.appendChild(card);
      }

      // Обновить текст прогресса
      const progressText = card.querySelector('.progress-text');
      if (progressText) {
        if (lessonData && lessonData.completed) {
          progressText.textContent = 'Завершено';
        } else if (lessonData && lessonData.progress > 0) {
          progressText.textContent = `${lessonData.progress}% завершено`;
        } else {
          progressText.textContent = 'Доступно';
        }
      }
    });
  },

  /**
   * Анимация progress bar
   * @param {Element} card - Карточка урока
   */
  animateProgressBar(card) {
    const progressFill = card.querySelector('.progress-fill');
    const progressText = card.querySelector('.progress-text');
    const lessonNumber = this.getLessonNumber(card);

    if (progressFill && lessonNumber) {
      const newProgress = this._progressData[`lesson${lessonNumber}`].progress;

      // Анимация progress bar
      progressFill.style.width = `${newProgress}%`;

      // Обновление текста
      if (newProgress === 100) {
        progressText.textContent = 'Завершено';
      } else {
        progressText.textContent = `${newProgress}% завершено`;
      }
    }
  },

  /**
   * Обновление всех progress bars
   */
  updateAllProgressBars() {
    this._lessonCards.forEach(card => {
      this.animateProgressBar(card);
    });

    // Обновить прогресс первого урока на основе данных из урока
    const lesson1Progress = Utils.storage('lesson1-progress');
    if (lesson1Progress) {
      const progressPercent = lesson1Progress.completedSteps === 8 ? 100 : Math.round((lesson1Progress.completedSteps / 8) * 100);
      const progressFill = document.getElementById('lesson1-progress');
      const progressText = document.getElementById('lesson1-text');

      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }

      if (progressText) {
        if (progressPercent === 100) {
          progressText.textContent = 'Завершено';
        } else if (progressPercent > 0) {
          progressText.textContent = `${progressPercent}% завершено`;
        } else {
          progressText.textContent = 'Не начато';
        }
      }
    }
  },

  /**
   * Добавление визуальной обратной связи при клике
   * @param {Element} card - Карточка урока
   */
  addClickFeedback(card) {
    card.classList.add('clicked');

    setTimeout(() => {
      card.classList.remove('clicked');
    }, 200);
  },

  /**
   * Получение статистики уроков
   * @returns {Object} - Статистика
   */
  getLessonsStats() {
    const totalLessons = Object.keys(this._progressData).length;
    const completedLessons = Object.values(this._progressData).filter(lesson => lesson.completed).length;
    const totalProgress = Object.values(this._progressData).reduce((sum, lesson) => sum + lesson.progress, 0);
    const averageProgress = Math.round(totalProgress / totalLessons);

    return {
      totalLessons,
      completedLessons,
      averageProgress,
      completionRate: Math.round((completedLessons / totalLessons) * 100)
    };
  },

  /**
   * Сброс прогресса (для тестирования)
   */
  resetProgress() {
    this._progressData = {
      lesson1: { progress: 100, completed: true },
      lesson2: { progress: 75, completed: false },
      lesson3: { progress: 40, completed: false },
      lesson4: { progress: 0, completed: false }
    };
    this.saveProgressData();
    this.updateAllProgressBars();
  }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  Lessons.init();
});

// Экспорт для использования в других модулях
window.Lessons = Lessons;
