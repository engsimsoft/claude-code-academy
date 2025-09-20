/**
 * CLAUDE CODE ACADEMY - TERMINAL DEMO MODULE
 * Демо терминала
 * - Typing animation cycle
 * - Command examples
 * - Auto-restart loop
 */

/**
 * Модуль демонстрации терминала
 */
const TerminalDemo = {
  // Приватные переменные
  _typingElement: null,
  _commands: null,
  _currentCommandIndex: 0,
  _currentCharIndex: 0,
  _isTyping: false,
  _typingSpeed: 100,
  _pauseBetweenCommands: 2000,

  /**
   * Инициализация модуля терминала
   */
  init() {
    this._typingElement = document.querySelector('.typing-animation');
    this._commands = [
      'добавь тесты',
      '/files',
      'оптимизируй код',
      'исправь баги',
      'создай компонент',
      'запушь изменения'
    ];

    if (this._typingElement) {
      this.startTypingAnimation();
      console.log('TerminalDemo: Модуль инициализирован');
    } else {
      console.warn('TerminalDemo: Элемент .typing-animation не найден');
    }
  },

  /**
   * Запуск анимации печати
   */
  startTypingAnimation() {
    if (this._isTyping) return;

    this._isTyping = true;
    this.typeCommand();
  },

  /**
   * Остановка анимации печати
   */
  stopTypingAnimation() {
    this._isTyping = false;
    if (this._typingElement) {
      this._typingElement.textContent = '';
    }
  },

  /**
   * Анимация печати команды
   */
  typeCommand() {
    if (!this._isTyping || !this._typingElement) return;

    const currentCommand = this._commands[this._currentCommandIndex];

    if (this._currentCharIndex < currentCommand.length) {
      // Добавление следующего символа
      const nextChar = currentCommand.charAt(this._currentCharIndex);
      this._typingElement.textContent += nextChar;
      this._currentCharIndex++;

      // Продолжение печати
      setTimeout(() => this.typeCommand(), this._typingSpeed);
    } else {
      // Команда напечатана полностью
      this.finishCommand();
    }
  },

  /**
   * Завершение печати команды
   */
  finishCommand() {
    setTimeout(() => {
      this.eraseCommand();
    }, this._pauseBetweenCommands);
  },

  /**
   * Анимация стирания команды
   */
  eraseCommand() {
    if (!this._isTyping || !this._typingElement) return;

    const currentText = this._typingElement.textContent;

    if (currentText.length > 0) {
      // Удаление последнего символа
      this._typingElement.textContent = currentText.slice(0, -1);
      setTimeout(() => this.eraseCommand(), this._typingSpeed * 0.5);
    } else {
      // Команда стерта полностью
      this.nextCommand();
    }
  },

  /**
   * Переход к следующей команде
   */
  nextCommand() {
    this._currentCharIndex = 0;
    this._currentCommandIndex = (this._currentCommandIndex + 1) % this._commands.length;

    // Небольшая пауза перед следующей командой
    setTimeout(() => this.typeCommand(), 500);
  },

  /**
   * Добавление новой команды в цикл
   * @param {string} command - Новая команда
   */
  addCommand(command) {
    if (command && typeof command === 'string') {
      this._commands.push(command.trim());
    }
  },

  /**
   * Удаление команды из цикла
   * @param {string} command - Команда для удаления
   */
  removeCommand(command) {
    const index = this._commands.indexOf(command);
    if (index > -1) {
      this._commands.splice(index, 1);
    }
  },

  /**
   * Изменение скорости печати
   * @param {number} speed - Скорость в мс
   */
  setTypingSpeed(speed) {
    if (speed > 0) {
      this._typingSpeed = speed;
    }
  },

  /**
   * Изменение паузы между командами
   * @param {number} pause - Пауза в мс
   */
  setPauseBetweenCommands(pause) {
    if (pause >= 0) {
      this._pauseBetweenCommands = pause;
    }
  },

  /**
   * Получение текущей команды
   * @returns {string} - Текущая команда
   */
  getCurrentCommand() {
    return this._commands[this._currentCommandIndex] || '';
  },

  /**
   * Получение всех команд
   * @returns {Array} - Массив команд
   */
  getAllCommands() {
    return [...this._commands];
  },

  /**
   * Сброс анимации
   */
  reset() {
    this.stopTypingAnimation();
    this._currentCommandIndex = 0;
    this._currentCharIndex = 0;

    if (this._typingElement) {
      this._typingElement.textContent = '';
    }

    setTimeout(() => this.startTypingAnimation(), 1000);
  },

  /**
   * Пауза анимации
   */
  pause() {
    this._isTyping = false;
  },

  /**
   * Возобновление анимации
   */
  resume() {
    if (!this._isTyping) {
      this._isTyping = true;
      this.typeCommand();
    }
  },

  /**
   * Проверка состояния анимации
   * @returns {boolean} - Активна ли анимация
   */
  isActive() {
    return this._isTyping;
  }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  TerminalDemo.init();
});

// Экспорт для использования в других модулях
window.TerminalDemo = TerminalDemo;